
import React from 'react';
import { BRAND_NAME } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-brand-gray">Our Philosophy</p>
          <h1 className="text-5xl md:text-6xl font-serif mt-4 mb-6">Redefining Modern Luxury</h1>
          <p className="text-lg text-brand-gray leading-relaxed">
            {BRAND_NAME}, an acronym for "Beauty in Essence, Originality in Kind," was founded not merely as a brand, but as a testament to the art of dressing. We believe that true style transcends trends; it is a form of self-expression rooted in confidence, quality, and a quiet appreciation for the exquisite. Our purpose is to create pieces that are not just garments, but trusted companions on life's journey.
          </p>
        </div>
        
        <div className="my-20">
            <img src="https://picsum.photos/id/145/1200/600" alt="Artisanal craftsmanship" className="w-full h-auto object-cover max-h-[500px]"/>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div>
                <h3 className="font-serif text-3xl mb-4">The Art of Creation</h3>
                <p className="text-brand-gray leading-relaxed">
                    Our design process is a deliberate meditation on form, function, and feeling. Each collection begins with a narrative, brought to life through sketches that honor the human silhouette. We partner with heritage mills and pioneering artisans who share our obsession with detail. From the subtle drape of a silk blouse to the precise tailoring of a wool coat, every element is considered, every stitch placed with intention. This meticulous approach ensures that each {BRAND_NAME} piece is a masterpiece of understated elegance and longevity.
                </p>
            </div>
            <div>
                <h3 className="font-serif text-3xl mb-4">A Commitment to Consciousness</h3>
                <p className="text-brand-gray leading-relaxed">
                    Luxury, in its truest form, is responsible. We are dedicated to a path of mindful creation, prioritizing ethical sourcing and sustainable practices. We choose materials not only for their superior quality but also for their environmental integrity. By creating seasonless designs meant to be cherished for a lifetime, we champion a philosophy of "buy less, choose well," moving away from the ephemeral and toward the enduring. Our vision is to build a legacy of beauty that respects both people and the planet.
                </p>
            </div>
        </div>
        
        <div className="mt-20 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif mb-4">An Invitation</h2>
            <p className="text-brand-gray leading-relaxed">
                We invite you to explore a world where fashion is an experience, not a commodity. A world where quality is paramount, and style is a personal signature. Discover the quiet confidence that comes from wearing something truly exceptional. Welcome to the world of {BRAND_NAME}.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
