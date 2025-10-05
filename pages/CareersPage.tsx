
import React from 'react';
import { BRAND_NAME } from '../constants';
import Button from '../components/Button';

const CareersPage: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-brand-gray">Join Our Team</p>
          <h1 className="text-5xl md:text-6xl font-serif mt-4 mb-6">Craft the Future of Luxury</h1>
          <p className="text-lg text-brand-gray leading-relaxed">
            At {BRAND_NAME}, we are more than a brand; we are a collective of artisans, dreamers, and innovators dedicated to the pursuit of excellence. We believe that our team is the heart of our artistry, and we are always seeking passionate individuals who share our commitment to craftsmanship, quality, and timeless design.
          </p>
        </div>

        <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <h3 className="font-serif text-3xl mb-4">A Culture of Inspiration</h3>
                <p className="text-brand-gray leading-relaxed mb-4">
                    Our culture is built on a foundation of collaboration, respect, and a shared passion for beauty. We foster an environment where creativity is nurtured, and every voice is valued. We encourage our team members to challenge conventions, to innovate, and to grow both personally and professionally.
                </p>
                <p className="text-brand-gray leading-relaxed">
                    Joining {BRAND_NAME} means becoming part of a legacy—a story of dedication to creating objects of lasting value and meaning.
                </p>
            </div>
            <div className="order-1 md:order-2">
                <img src="https://picsum.photos/id/1074/800/600" alt="Collaborative team environment" className="w-full h-auto object-cover"/>
            </div>
        </div>

        <div className="max-w-4xl mx-auto bg-brand-light p-8 md:p-12 border text-center">
            <h2 className="text-4xl font-serif mb-6">Current Opportunities</h2>
            <p className="text-brand-gray leading-relaxed mb-8">
                We are currently seeking talented individuals to join us in our journey. While we may not have specific roles listed at all times, we are always open to connecting with exceptional talent. If you believe your skills and passion align with the world of {BRAND_NAME}, we invite you to get in touch.
            </p>
            <a href="mailto:careers@beok.com">
                <Button variant="primary">Submit Your Portfolio</Button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
