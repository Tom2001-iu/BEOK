
import React from 'react';
import { BRAND_NAME } from '../constants';

const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif">Shipping & Returns</h1>
          <p className="text-lg text-brand-gray mt-4">Our commitment to a seamless luxury experience extends to our shipping and returns process.</p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-serif text-brand-dark mb-6 border-b pb-4">Shipping Policy</h2>
            <div className="space-y-4 text-brand-gray leading-relaxed">
              <h3 className="text-xl font-semibold text-brand-dark">Domestic Shipping (India)</h3>
              <p>
                {BRAND_NAME} is pleased to offer complimentary standard shipping on all orders within India. Orders are typically processed within 1-2 business days. Once dispatched, please allow 3-5 business days for delivery to metropolitan areas and 5-7 business days for other locations. An expedited shipping option is available at checkout for an additional fee.
              </p>
               <h3 className="text-xl font-semibold text-brand-dark mt-6">International Shipping</h3>
              <p>
                We ship to most destinations worldwide. International shipping costs and delivery times are calculated at checkout based on your location. Please note that {BRAND_NAME} is not responsible for any customs duties, taxes, or import fees that may be levied upon arrival in your country. These charges are the responsibility of the recipient.
              </p>
               <h3 className="text-xl font-semibold text-brand-dark mt-6">Order Tracking</h3>
              <p>
                A shipping confirmation email with your tracking number will be sent as soon as your order has been dispatched. You can track your order's journey via the link provided.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-brand-dark mb-6 border-b pb-4">Returns & Exchanges</h2>
            <div className="space-y-4 text-brand-gray leading-relaxed">
              <h3 className="text-xl font-semibold text-brand-dark">Our Promise</h3>
              <p>
                We hope you are delighted with your purchase. If for any reason you are not completely satisfied, we are happy to offer a return or exchange within 14 days of receipt.
              </p>
               <h3 className="text-xl font-semibold text-brand-dark mt-6">Conditions for Return</h3>
              <p>
                To be eligible for a return, items must be in their original, unused, and saleable condition, with all original tags and packaging intact. Please note that limited edition items, personalized goods, and items marked as 'final sale' are not eligible for return.
              </p>
               <h3 className="text-xl font-semibold text-brand-dark mt-6">How to Initiate a Return</h3>
              <p>
                1. Please contact our Client Services team at <a href="mailto:care@beok.com" className="underline text-brand-dark">care@beok.com</a> to request a Return Authorization (RA) number.
                <br />
                2. Once your return is approved, we will provide you with instructions and a pre-paid return shipping label for domestic orders.
                <br />
                3. Upon receipt and inspection of the returned item, your refund will be processed to the original payment method within 5-7 business days.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
