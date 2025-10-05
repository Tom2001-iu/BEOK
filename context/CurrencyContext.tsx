import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import type { Currency } from '../types';

// In a real app, these rates would be fetched from an API
const CONVERSION_RATES = {
  INR: 1,
  USD: 1 / 83.5, // 1 USD = 83.5 INR
  EUR: 1 / 90.5, // 1 EUR = 90.5 INR
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
};

const CURRENCIES: Currency[] = ['INR', 'USD', 'EUR'];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInInr: number) => string;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const savedCurrency = localStorage.getItem('beok-currency') as Currency;
      return CURRENCIES.includes(savedCurrency) ? savedCurrency : 'INR';
    } catch (error) {
      console.error("Could not read currency from localStorage", error);
      return 'INR';
    }
  });

  useEffect(() => {
    localStorage.setItem('beok-currency', currency);
  }, [currency]);

  const setCurrency = (newCurrency: Currency) => {
    if (CURRENCIES.includes(newCurrency)) {
      setCurrencyState(newCurrency);
    }
  };

  const formatPrice = useCallback((priceInInr: number) => {
    const rate = CONVERSION_RATES[currency];
    const convertedPrice = priceInInr * rate;
    const symbol = CURRENCY_SYMBOLS[currency];
    
    return `${symbol}${convertedPrice.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, [currency]);

  const value = {
    currency,
    setCurrency,
    formatPrice,
    currencies: CURRENCIES,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};