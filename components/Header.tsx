
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { BRAND_NAME, NAV_LINKS } from '../constants';
import CurrencySwitcher from './CurrencySwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { cartCount } = useCart();
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Close menus and search on navigation
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // useEffect on location change will handle closing menus and resetting state
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">

          {/* Desktop Search Overlay */}
          <div className={`absolute inset-0 z-20 flex items-center bg-white/95 backdrop-blur-md transition-opacity duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full h-12 bg-transparent border-b border-brand-dark focus:outline-none text-lg"
                />
                <button type="submit" className="p-2 -ml-10" aria-label="Submit search">
                    <SearchIcon />
                </button>
                <button type="button" onClick={() => setIsSearchOpen(false)} className="p-2 ml-2" aria-label="Close search">
                    <CloseIcon />
                </button>
            </form>
          </div>

          {/* Regular Header Content - fades out when search is active */}
          <div className={`w-full flex items-center justify-between transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 -ml-2">
                  <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
              </div>

              {/* Logo */}
              <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0">
                <Link to="/" className="text-3xl font-serif font-bold tracking-widest text-brand-dark">
                  {BRAND_NAME}
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex lg:items-center lg:space-x-8">
                {NAV_LINKS.map(link => (
                  <NavLink 
                    key={link.name} 
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) => 
                      `relative text-sm uppercase tracking-wider transition-colors duration-300 hover:text-brand-dark after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:bg-brand-dark after:transition-transform after:duration-300 after:scale-x-0 after:origin-left hover:after:scale-x-100 ${
                        isActive ? 'text-brand-dark after:scale-x-100' : 'text-brand-gray'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {/* Icons & Auth */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden sm:block">
                  <CurrencySwitcher />
                </div>
                <button onClick={() => setIsSearchOpen(true)} className="p-2 hidden sm:block" aria-label="Open search bar">
                  <SearchIcon />
                </button>
                
                <Link to={currentUser ? "/account" : "/login"} className="p-2 hidden sm:block" aria-label="My account">
                  <UserIcon />
                </Link>

                <Link to="/cart" className="p-2 relative" aria-label={`Shopping cart with ${cartCount} items`}>
                  <CartIcon />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 block w-4 h-4 text-xs font-bold text-white bg-brand-dark rounded-full text-center leading-4">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-lg animate-slide-in-left">
          <nav className="flex flex-col p-4 space-y-4">
            {NAV_LINKS.map(link => (
              <NavLink key={link.name} to={link.path} end={link.path === '/'} className="text-lg uppercase tracking-wider text-brand-dark">
                {link.name}
              </NavLink>
            ))}
            <hr />
            {currentUser ? (
              <Link to="/account" className="text-lg uppercase tracking-wider text-brand-dark">My Account</Link>
            ) : (
              <>
                <Link to="/login" className="text-lg uppercase tracking-wider text-brand-dark">Login</Link>
                <Link to="/signup" className="text-lg uppercase tracking-wider text-brand-dark">Sign Up</Link>
              </>
            )}
            <hr />
             <div className="flex items-center justify-between">
                <span className="text-lg uppercase tracking-wider text-brand-dark">Currency</span>
                <CurrencySwitcher />
             </div>
            <hr />
            <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-dark"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1" aria-label="Search">
                        <SearchIcon />
                    </button>
                </div>
            </form>
          </nav>
        </div>
      )}
    </header>
  );
};

const SearchIcon = () => (
  <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);
const CartIcon = () => (
  <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
);
const UserIcon = () => (
    <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);
const CloseIcon = () => (
    <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

export default Header;