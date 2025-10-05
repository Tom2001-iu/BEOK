
import React, { useState, useEffect } from 'react';
import Button from './Button';

const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem('newsletterPopupShown');
    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setIsVisible(true);
        sessionStorage.setItem('newsletterPopupShown', 'true');
      }, 5000); // 5-second delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300); // Match duration of fade-out animation
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the email submission here
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000); // Show success message for 2 seconds before closing
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
      ></div>
      <div
        className={`relative w-full max-w-md m-4 bg-white p-8 text-center shadow-2xl transition-all duration-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-brand-gray hover:text-brand-dark"
          aria-label="Close newsletter popup"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {isSubmitted ? (
            <div>
                <h2 className="text-2xl font-serif mb-2">Thank You!</h2>
                <p className="text-brand-gray">You've been added to our list. Welcome to the world of BEOK.</p>
            </div>
        ) : (
            <>
                <h2 className="text-2xl font-serif mb-2">Join The Inner Circle</h2>
                <p className="text-brand-gray mb-6">
                    Subscribe for exclusive previews, new arrivals, and insider-only events.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-brand-dark"
                />
                <Button type="submit" variant="primary" fullWidth>
                    Subscribe
                </Button>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
