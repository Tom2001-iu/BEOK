
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import Button from '../components/Button';
import type { CartItem } from '../types';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { formatPrice } = useCurrency();

  const { paymentId, orderItems, orderTotal } = location.state || {};

  useEffect(() => {
    // If state is missing, redirect to home page. This prevents direct access.
    if (!paymentId || !orderItems || !orderTotal) {
      navigate('/', { replace: true });
    }
    // Set a title for the page
    document.title = "Order Confirmed | BEOK";

    // Cleanup title on unmount
    return () => {
      document.title = "BEOK | Luxury Fashion";
    }
  }, [paymentId, orderItems, orderTotal, navigate]);

  // Render nothing until redirect is complete if state is invalid
  if (!paymentId || !orderItems || !orderTotal) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="text-4xl md:text-5xl font-serif mt-6 mb-4">
          Thank you, {currentUser?.name}!
        </h1>
        <p className="text-lg text-brand-gray mb-8 max-w-2xl mx-auto">
          Your order has been successfully placed. A confirmation email with your order details has been sent to{' '}
          <span className="font-semibold text-brand-dark">{currentUser?.email}</span>.
        </p>

        <div className="bg-brand-light border p-6 md:p-8 my-8 text-left">
          <h2 className="text-2xl font-serif mb-6 border-b pb-4">Order Summary</h2>
          <div className="mb-6">
            <p className="text-sm text-brand-gray">Payment ID</p>
            <p className="font-mono text-brand-dark text-sm md:text-base break-all">{paymentId}</p>
          </div>

          <div className="space-y-4 mb-6">
            {orderItems.map((item: CartItem) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 items-center border-b pb-4 last:border-b-0">
                <img src={item.images[0]} alt={item.name} className="w-20 h-24 object-cover" />
                <div className="flex-grow">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-brand-gray">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                  <p className="text-sm text-brand-gray">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-right">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between text-lg font-bold text-brand-dark">
            <span>Total Paid</span>
            <span>{formatPrice(orderTotal)}</span>
          </div>
        </div>

        <Link to="/">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
