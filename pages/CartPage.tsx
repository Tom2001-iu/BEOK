
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import Button from '../components/Button';
import useRazorpay from '../hooks/useRazorpay';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
  const { formatPrice } = useCurrency();
  const { openRazorpay } = useRazorpay();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.18; // Example 18% tax
  const total = subtotal + taxes;

  const handleCheckout = () => {
    if (!currentUser) {
      // Redirect to login page if user is not authenticated
      // Pass the current location to redirect back after login
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    // The amount passed to Razorpay must be in the base currency (INR)
    openRazorpay(
      total,
      (paymentId) => {
        // Navigate to the confirmation page with order details
        navigate('/order-confirmation', {
          replace: true, // Replace cart page in history
          state: {
            paymentId,
            orderItems: cartItems,
            orderTotal: total,
          },
        });
        clearCart();
        // Failsafe: Manually reset body overflow before navigating away,
        // as the Razorpay modal might not clean up in time.
        document.body.style.overflow = 'unset';
      },
      () => {
        alert('Payment Failed. Please try again or contact support.');
        // Also ensure scrolling is restored on payment failure.
        document.body.style.overflow = 'unset';
      }
    );
  };
  
  if (cartCount === 0) {
    return (
      <div className="container mx-auto text-center py-20 px-4">
        <h1 className="text-4xl font-serif mb-4">Your Bag is Empty</h1>
        <p className="text-brand-gray mb-8">Looks like you haven't added anything to your bag yet.</p>
        <Link to="/">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-center mb-12">Shopping Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 p-4 border-b">
                <img src={item.images[0]} alt={item.name} className="w-24 h-32 object-cover"/>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg">{item.name}</h3>
                    <p className="text-sm text-brand-gray">Size: {item.selectedSize}</p>
                    <p className="text-sm text-brand-gray">Color: {item.selectedColor}</p>
                    <p className="text-sm text-brand-gray">{formatPrice(item.price)}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)} className="text-left text-sm text-red-500 hover:underline">Remove</button>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  <div className="flex border items-center">
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)} className="w-8 h-8 text-lg">-</button>
                    <span className="w-8 h-8 text-center leading-8">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)} className="w-8 h-8 text-lg">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-brand-light p-6 h-fit border">
          <h2 className="text-2xl font-serif mb-6">Order Summary</h2>
          <div className="space-y-4 text-brand-gray">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (18%)</span>
              <span>{formatPrice(taxes)}</span>
            </div>
             <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr/>
            <div className="flex justify-between text-brand-dark font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Button onClick={handleCheckout} fullWidth className="mt-8">Proceed to Checkout</Button>
        </div>

      </div>
    </div>
  );
};

export default CartPage;