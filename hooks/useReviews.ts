import { useCallback } from 'react';
import type { Review } from '../types';

const REVIEWS_STORAGE_KEY = 'beok-reviews';

export const useReviews = () => {
  const getReviewsForProduct = useCallback((productId: string): Review[] => {
    try {
      const allReviewsJson = localStorage.getItem(REVIEWS_STORAGE_KEY);
      const allReviews: Review[] = allReviewsJson ? JSON.parse(allReviewsJson) : [];
      return allReviews
        .filter(r => r.productId === productId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error("Failed to fetch reviews from localStorage", error);
      return [];
    }
  }, []);

  const addReview = useCallback(async (reviewData: Omit<Review, 'id' | 'date'>): Promise<Review> => {
    try {
      const allReviewsJson = localStorage.getItem(REVIEWS_STORAGE_KEY);
      const allReviews: Review[] = allReviewsJson ? JSON.parse(allReviewsJson) : [];
      
      const newReview: Review = {
        ...reviewData,
        id: `${new Date().toISOString()}-${Math.random()}`, // Simple unique ID
        date: new Date().toISOString(),
      };

      const updatedReviews = [...allReviews, newReview];
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));
      
      return Promise.resolve(newReview);
    } catch (error) {
      console.error("Failed to add review to localStorage", error);
      return Promise.reject(error);
    }
  }, []);

  return { getReviewsForProduct, addReview };
};
