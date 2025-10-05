
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, className, ...props }) => {
  const baseStyles = 'px-8 py-3 text-sm uppercase tracking-widest font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-brand-dark text-white hover:bg-gray-800 focus:ring-brand-dark',
    secondary: 'bg-white text-brand-dark hover:bg-brand-light focus:ring-brand-dark',
    outline: 'bg-transparent border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white focus:ring-brand-dark',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
