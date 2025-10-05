export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'men' | 'women' | 'accessories' | 'limited' | 'kids';
  images: string[];
  sizes: string[];
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: { razorpay_payment_id: string }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    address?: string;
  };
  theme?: {
    color?: string;
  };
}

export interface User {
  name: string;
  email: string;
}

export type Currency = 'INR' | 'USD' | 'EUR';

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string; // ISO string format
}

// This makes the Razorpay constructor available on the window object
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: () => void) => void;
    };
  }
}
