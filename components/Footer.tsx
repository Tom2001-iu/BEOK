import React from 'react';
import { BRAND_NAME } from '../constants';
import { useAuth } from '../context/AuthContext';

const Footer: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <footer className="bg-brand-dark text-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Newsletter */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-serif tracking-wider mb-4">Stay in the Know</h3>
            <p className="text-sm text-brand-gray mb-4">Subscribe for exclusive previews, new arrivals, and insider-only events.</p>
            <form className="flex">
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 bg-transparent border border-brand-gray text-white focus:outline-none focus:border-white transition-colors" />
              <button type="submit" className="px-6 py-2 bg-white text-brand-dark font-semibold uppercase tracking-wider hover:bg-brand-light transition-colors">
                Subscribe
              </button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-serif tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#/about" className="text-brand-gray hover:text-white transition-colors">About BEOK</a></li>
              <li><a href="#/contact" className="text-brand-gray hover:text-white transition-colors">Contact Us</a></li>
              {currentUser && <li><a href="#/account" className="text-brand-gray hover:text-white transition-colors">My Account</a></li>}
              <li><a href="#/careers" className="text-brand-gray hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-brand-gray hover:text-white transition-colors">Store Locator</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-serif tracking-wider mb-4">Assistance</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#/shipping-returns" className="text-brand-gray hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#/faq" className="text-brand-gray hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#/privacy-policy" className="text-brand-gray hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#/terms-of-service" className="text-brand-gray hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-brand-gray">&copy; {new Date().getFullYear()} {BRAND_NAME}. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-brand-gray hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-brand-gray hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-brand-gray hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;