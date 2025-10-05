
import React, { useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import type { Product } from '../types';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const searchQuery = useMemo(() => new URLSearchParams(location.search).get('q') || '', [location.search]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercasedQuery) ||
      product.description.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          {searchQuery ? (
            <>
              <h1 className="text-4xl font-serif">Search Results for "{searchQuery}"</h1>
              <p className="text-brand-gray mt-2">{filteredProducts.length} items found</p>
            </>
          ) : (
            <h1 className="text-4xl font-serif">Please enter a search term</h1>
          )}
        </div>

        {searchQuery && (
          <main>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onQuickView={handleOpenQuickView} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl font-serif">No Products Found</h2>
                <p className="text-brand-gray mt-2 max-w-sm mx-auto">
                  We couldn't find any products matching your search for "{searchQuery}". Try a different search term.
                </p>
                <Link to="/" className="mt-6 inline-block">
                  <button className="text-brand-dark font-semibold uppercase tracking-wider border-b-2 border-brand-dark pb-1">
                    Return to Shop
                  </button>
                </Link>
              </div>
            )}
          </main>
        )}
      </div>
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={handleCloseQuickView} />
      )}
    </>
  );
};

export default SearchResultsPage;