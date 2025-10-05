
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  const [heroText, setHeroText] = useState('Timeless Elegance');
  const [textOpacity, setTextOpacity] = useState('opacity-100');

  useEffect(() => {
    const changeText = () => {
      setTextOpacity('opacity-0'); // Fade out
      setTimeout(() => {
        setHeroText(prevText => 
          prevText === 'Timeless Elegance' ? 'RISE BEYOND' : 'Timeless Elegance'
        );
        setTextOpacity('opacity-100'); // Fade in
      }, 500); // Corresponds to transition duration
    };

    const intervalId = setInterval(changeText, 4000); // Change text every 4 seconds

    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <div className="space-y-16 lg:space-y-24">
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white bg-black">
          <img 
            src="https://picsum.photos/id/15/1800/1200" 
            alt="Luxury fashion model" 
            className="absolute inset-0 w-full h-full object-cover opacity-60" 
          />
          <div className="relative z-10 p-4">
            <h1 className={`text-5xl md:text-7xl font-display font-bold tracking-wider transition-opacity duration-500 ${textOpacity}`}>
              {heroText}
            </h1>
            <p className="mt-4 max-w-lg mx-auto text-lg text-gray-200">
              Discover the new collection from BEOK, where classic style meets contemporary design.
            </p>
            <Link to="/products">
              <Button variant="outline" className="mt-8 border-white text-white hover:bg-white hover:text-black">
                Shop Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Men's & Women's Categories Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Men's Category */}
            <Link to="/category/men" className="relative h-[600px] group overflow-hidden block">
              <img 
                src="https://picsum.photos/id/68/1000/1500"
                alt="Men's Collection"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-4">
                <h2 className="text-4xl font-display font-bold tracking-wider">MEN'S</h2>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <span className="inline-block bg-white text-brand-dark px-6 py-3 text-sm uppercase tracking-wider font-semibold shadow-md">
                      Shop Collection
                    </span>
                </div>
              </div>
            </Link>

            {/* Women's Category */}
            <Link to="/category/women" className="relative h-[600px] group overflow-hidden block">
              <img 
                src="https://picsum.photos/id/1027/1000/1500"
                alt="Women's Collection"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-4">
                <h2 className="text-4xl font-display font-bold tracking-wider">WOMEN'S</h2>
                 <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block bg-white text-brand-dark px-6 py-3 text-sm uppercase tracking-wider font-semibold shadow-md">
                      Shop Collection
                    </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-serif mb-4">The Art of Craft</h2>
            <p className="text-brand-gray mb-6">
              At BEOK, every stitch tells a story of dedication. We source the world's finest materials to create pieces that are not just worn, but experienced. Our commitment is to timeless design and unparalleled quality.
            </p>
            <Link to="/about">
              <Button variant="primary">Our Story</Button>
            </Link>
          </div>
          <div className="order-1 lg:order-2 h-96">
            <img src="https://picsum.photos/id/119/800/600" alt="Craftsmanship" className="w-full h-full object-cover"/>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
