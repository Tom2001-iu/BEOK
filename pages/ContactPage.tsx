
import React from 'react';
import Button from '../components/Button';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif">Contact Us</h1>
        <p className="text-lg text-brand-gray mt-4 max-w-2xl mx-auto">
          We are dedicated to providing you with a seamless and luxurious experience. Whether you have a question about our collections, require assistance with an order, or wish to share your thoughts, our client services team is here to assist you with the utmost care and attention.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-serif mb-2">Client Services</h3>
            <p className="text-brand-gray">Available Monday - Friday, 9 AM to 6 PM IST.</p>
            <a href="mailto:care@beok.com" className="text-brand-dark underline">care@beok.com</a>
          </div>
          <div>
            <h3 className="text-xl font-serif mb-2">Corporate Office</h3>
            <p className="text-brand-gray">123 Luxury Avenue,</p>
            <p className="text-brand-gray">Fashion City, 110001</p>
          </div>
          <div>
            <h3 className="text-xl font-serif mb-2">Press Inquiries</h3>
            <p className="text-brand-gray">For press and media inquiries, please contact:</p>
            <a href="mailto:press@beok.com" className="text-brand-dark underline">press@beok.com</a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-dark mb-1">Full Name</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-dark" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-1">Email Address</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-dark" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-brand-dark mb-1">Subject</label>
              <input type="text" id="subject" name="subject" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-dark" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-dark mb-1">Message</label>
              <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-dark"></textarea>
            </div>
            <div>
              <Button type="submit" variant="primary">Send Message</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;