import { useCallback } from 'react';
import type { RazorpayOptions } from '../types';
import { BRAND_NAME } from '../constants';

const useRazorpay = () => {
  const openRazorpay = useCallback((amount: number, onPaymentSuccess: (paymentId: string) => void, onPaymentError: () => void) => {
    // Using the LIVE key as requested. In a real-world scenario, this should come from a secure environment variable.
    const razorpayKey = 'rzp_live_RMwIkyULpkLkwP';

    const options: RazorpayOptions = {
      key: razorpayKey,
      amount: amount * 100, // Amount is in currency subunits. For INR, 1 INR = 100 paise.
      currency: 'INR',
      name: BRAND_NAME,
      description: 'Order Payment',
      image: 'https://picsum.photos/id/48/200/200', // BEOK Logo placeholder
      handler: (response) => {
        // The handler is passed as a callback for better integration with React components.
        onPaymentSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: 'BEOK Customer',
        email: 'customer@beok.com',
        contact: '9999999999',
      },
      notes: {
        address: 'BEOK Corporate Office',
      },
      theme: {
        color: '#000000',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function () {
      console.error('Payment failed');
      // Failsafe: Ensure body scrolling is restored if the modal is closed on payment failure.
      document.body.style.overflow = 'unset';
      onPaymentError();
    });
    paymentObject.open();
  }, []);

  return { openRazorpay };
};

export default useRazorpay;