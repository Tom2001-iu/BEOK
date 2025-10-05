import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import type { Currency } from '../types';

const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency, currencies } = useCurrency();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value as Currency);
  };

  return (
    <div>
      <label htmlFor="currency-switcher" className="sr-only">Select Currency</label>
      <select
        id="currency-switcher"
        value={currency}
        onChange={handleChange}
        className="bg-transparent text-sm text-brand-dark focus:outline-none focus:ring-0 border-none"
        aria-label="Currency Selector"
      >
        {currencies.map((curr) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySwitcher;