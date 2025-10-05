
import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCurrency } from '../context/CurrencyContext';
import QuickViewModal from '../components/QuickViewModal';
import type { Product } from '../types';

const ProductsPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { formatPrice } = useCurrency();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categoryProducts = useMemo(() => {
    if (!categoryName) return products;
    return products.filter(p => p.category === categoryName.toLowerCase());
  }, [categoryName]);

  const maxPrice = useMemo(() => {
    if (categoryProducts.length === 0) return 300000;
    // Round up to the nearest 1000 for a cleaner slider
    return Math.ceil(Math.max(...categoryProducts.map(p => p.price)) / 1000) * 1000;
  }, [categoryProducts]);

  // Filter states
  const [price, setPrice] = useState(maxPrice);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Reset filters when category or maxPrice changes
  useEffect(() => {
    setPrice(maxPrice);
    setSelectedColors([]);
    setSelectedSizes([]);
  }, [categoryName, maxPrice]);

  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    categoryProducts.forEach(p => p.colors.forEach(c => colors.add(c)));
    return Array.from(colors);
  }, [categoryProducts]);

  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    categoryProducts.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    // Custom sort for clothing sizes
    const order = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];
    return Array.from(sizes).sort((a, b) => {
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);
        if (indexA > -1 && indexB > -1) return indexA - indexB;
        if (indexA > -1) return -1;
        if (indexB > -1) return 1;
        return a.localeCompare(b, undefined, { numeric: true });
    });
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter(p => p.price <= price)
      .filter(p => selectedColors.length === 0 || p.colors.some(c => selectedColors.includes(c)))
      .filter(p => selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s)));
  }, [price, selectedColors, selectedSizes, categoryProducts]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setPrice(maxPrice);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  const title = categoryName ? categoryName.replace('-', ' ') : 'All Products';

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif capitalize">{title}</h1>
          <p className="text-brand-gray mt-2">{filteredProducts.length} items</p>
        </div>

        <div className="flex">
          {/* Filters */}
          <aside className="w-1/4 pr-8 hidden lg:block">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-lg font-semibold uppercase tracking-wider">Filter By</h3>
              {(price < maxPrice || selectedColors.length > 0 || selectedSizes.length > 0) && (
                <button onClick={clearFilters} className="text-sm text-brand-gray hover:underline">Clear All</button>
              )}
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="font-semibold mb-3">Price</h4>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={price}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-dark"
                />
                <p className="text-sm text-brand-gray mt-2 text-right">Up to {formatPrice(price)}</p>
              </div>
              {availableColors.length > 0 && (
                  <div>
                      <h4 className="font-semibold mb-3">Color</h4>
                      <div className="flex flex-wrap gap-3">
                          {availableColors.map(color => (
                          <button
                              key={color}
                              onClick={() => handleColorToggle(color)}
                              className={`px-4 py-2 border text-sm transition-colors ${selectedColors.includes(color) ? 'bg-brand-dark text-white border-brand-dark' : 'hover:bg-brand-light'}`}
                          >
                              {color}
                          </button>
                          ))}
                      </div>
                  </div>
              )}
              {availableSizes.length > 0 && (
                  <div>
                      <h4 className="font-semibold mb-3">Size</h4>
                      <div className="flex flex-wrap gap-2">
                          {availableSizes.map(size => (
                          <button
                              key={size}
                              onClick={() => handleSizeToggle(size)}
                              className={`w-10 h-10 border text-sm transition-colors ${selectedSizes.includes(size) ? 'bg-brand-dark text-white border-brand-dark' : 'hover:bg-brand-light'}`}
                          >
                              {size}
                          </button>
                          ))}
                      </div>
                  </div>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <main className="w-full lg:w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onQuickView={handleOpenQuickView} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl font-serif">No Products Found</h2>
                <p className="text-brand-gray mt-2 max-w-sm mx-auto">Your search and filter combination did not return any results. Try clearing the filters to see all available items.</p>
                <button onClick={clearFilters} className="mt-6 text-brand-dark font-semibold uppercase tracking-wider border-b-2 border-brand-dark pb-1">
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={handleCloseQuickView} />
      )}
    </>
  );
};

export default ProductsPage;
