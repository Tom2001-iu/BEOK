import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import Button from './Button';
import ImageZoomer from './ImageZoomer';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to finish before calling parent's onClose
    setTimeout(onClose, 300); 
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
        handleClose();
    }, 1500); // Close modal after showing 'Added!'
  };
  
  return (
    <div 
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>
      <div 
        className={`relative w-full max-w-4xl m-4 bg-white shadow-2xl transition-all duration-300 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-brand-gray hover:text-brand-dark z-10"
          aria-label="Close quick view"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Image */}
        <div className="h-full max-h-[500px] md:max-h-full">
          <ImageZoomer src={product.images[0]} alt={product.name} />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h2 id="quick-view-title" className="text-3xl font-serif mb-2">{product.name}</h2>
          <p className="text-xl font-sans font-medium mb-4">{formatPrice(product.price)}</p>
          <div className="flex-grow overflow-y-auto max-h-28 mb-4">
            <p className="text-brand-gray leading-relaxed text-sm">{product.description}</p>
          </div>
          
          {/* Size Selector */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Size: {selectedSize}</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border text-sm transition-colors ${selectedSize === size ? 'bg-brand-dark text-white' : 'hover:bg-brand-light'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Color Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Color: {selectedColor}</label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border text-sm transition-colors ${selectedColor === color ? 'bg-brand-dark text-white' : 'hover:bg-brand-light'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex border items-center">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-12 text-xl">-</button>
              <span className="w-12 h-12 text-center leading-[3rem]">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-12 text-xl">+</button>
            </div>
            <Button onClick={handleAddToCart} fullWidth variant="primary" disabled={isAdded}>
              {isAdded ? 'Added!' : 'Add to Cart'}
            </Button>
          </div>
          
          <Link to={`/product/${product.id}`} className="text-center text-sm text-brand-dark hover:underline mt-auto">
            View Full Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
