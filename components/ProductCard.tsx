
import React from 'react';
import type { Product } from '../types';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { formatPrice } = useCurrency();

  const handleQuickViewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  }
  
  return (
    <div className="group block overflow-hidden relative">
      <Link to={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
        <div className="relative h-[450px] sm:h-[550px]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
          />
          <img
            src={product.images[1] || product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
        <div className="relative pt-4 text-center">
          <h3 className="text-lg font-serif text-brand-dark group-hover:underline group-hover:underline-offset-4">
            {product.name}
          </h3>
          <p className="mt-2 text-md tracking-wide text-brand-gray">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
      <div className="absolute inset-x-0 bottom-24 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
        <button
            onClick={handleQuickViewClick}
            className="bg-white text-brand-dark px-6 py-3 text-sm uppercase tracking-wider font-semibold shadow-md hover:bg-brand-light transition-colors"
        >
            Quick View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
