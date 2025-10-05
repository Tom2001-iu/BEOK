import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../hooks/useReviews';
import StarRating from '../components/StarRating';
import type { Review } from '../types';
import ImageZoomer from '../components/ImageZoomer';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const product = products.find(p => p.id === productId);

  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const location = useLocation();
  const { currentUser } = useAuth();
  const { getReviewsForProduct, addReview } = useReviews();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    if (productId) {
      const productReviews = getReviewsForProduct(productId);
      setReviews(productReviews);
    }
  }, [productId, getReviewsForProduct]);


  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-2xl font-serif">Product not found</h2>
        <Link to="/" className="text-brand-dark underline mt-4 inline-block">Return to shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0) {
      setReviewError('Please select a rating.');
      return;
    }
    if (!newComment.trim()) {
      setReviewError('Please enter a comment.');
      return;
    }
    if (!currentUser || !productId) {
      setReviewError('You must be logged in to submit a review.');
      return;
    }

    try {
      const newReview = await addReview({
        productId: productId,
        author: currentUser.name,
        rating: newRating,
        comment: newComment.trim(),
      });
      setReviews(prevReviews => [newReview, ...prevReviews]);
      setNewRating(0);
      setNewComment('');
      setReviewError('');
    } catch (err) {
      setReviewError('Failed to submit review. Please try again.');
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 justify-center">
              {product.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={`w-20 h-24 object-cover cursor-pointer border-2 ${selectedImage === img ? 'border-brand-dark' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <div className="flex-1 max-h-[700px]">
              <ImageZoomer src={selectedImage} alt={product.name} />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:py-8">
            <p className="uppercase text-sm tracking-widest text-brand-gray">{product.category}</p>
            <h1 className="text-4xl font-serif my-3">{product.name}</h1>
            <p className="text-2xl font-sans font-medium mb-6">{formatPrice(product.price)}</p>
            <p className="text-brand-gray leading-relaxed mb-8">{product.description}</p>
            
            {/* Size Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Size: {selectedSize}</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border transition-colors ${selectedSize === size ? 'bg-brand-dark text-white' : 'hover:bg-brand-light'}`}
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
                    className={`px-4 py-2 border transition-colors ${selectedColor === color ? 'bg-brand-dark text-white' : 'hover:bg-brand-light'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex border items-center">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-12 text-xl">-</button>
                <span className="w-12 h-12 text-center leading-[3rem]">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-12 text-xl">+</button>
              </div>
              <Button onClick={handleAddToCart} fullWidth variant="primary">
                {isAdded ? 'Added!' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t">
        <h2 className="text-3xl font-serif mb-8">Customer Reviews</h2>
        
        {/* Review Form */}
        <div className="mb-12 max-w-2xl">
          {currentUser ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <h3 className="text-xl font-serif">Leave a Review</h3>
              <div>
                <label className="block text-sm font-semibold mb-2">Your Rating</label>
                <StarRating rating={newRating} setRating={setNewRating} size="w-6 h-6" />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-semibold mb-2">Your Comment</label>
                <textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-dark"
                  placeholder="Share your thoughts about this product..."
                />
              </div>
              {reviewError && <p className="text-red-500 text-sm">{reviewError}</p>}
              <Button type="submit" variant="primary">Submit Review</Button>
            </form>
          ) : (
            <p className="text-brand-gray">
              Please <Link to="/login" state={{ from: location }} className="text-brand-dark underline font-semibold">log in</Link> to leave a review.
            </p>
          )}
        </div>

        {/* Reviews List */}
        <div className="space-y-8 max-w-2xl">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center mb-2">
                  <StarRating rating={review.rating} />
                  <p className="ml-4 font-bold text-brand-dark">{review.author}</p>
                </div>
                <p className="text-sm text-brand-gray mb-2">
                  {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-brand-gray leading-relaxed">{review.comment}</p>
              </div>
            ))
          ) : (
             <div className="text-center py-8 bg-brand-light border">
                <p className="text-brand-gray">No reviews yet. Be the first to share your thoughts!</p>
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
