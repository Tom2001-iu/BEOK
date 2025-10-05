
import React from 'react';
import { BRAND_NAME } from '../constants';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif">Privacy Policy</h1>
          <p className="text-lg text-brand-gray mt-4">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 text-brand-gray leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">1. Introduction</h2>
            <p>
              Welcome to {BRAND_NAME}. We are committed to protecting the privacy and security of our clients. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website. By using our site, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">2. Information We Collect</h2>
            <p>
              We may collect personal identification information in various ways, including, but not limited to, when you visit our site, register, place an order, or subscribe to our newsletter. The information we may collect includes:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li><strong>Personal Data:</strong> Name, email address, mailing address, phone number.</li>
              <li><strong>Financial Data:</strong> Payment method details (e.g., credit card numbers), which are processed securely by our payment gateway and not stored by us.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, operating system, and other details about the device you use to access our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">3. How We Use Your Information</h2>
            <p>
              Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Create and manage your account.</li>
              <li>Process your transactions and send you related information, including purchase confirmations and invoices.</li>
              <li>Improve our website and offerings.</li>
              <li>Communicate with you about products, services, offers, and events.</li>
              <li>Prevent fraudulent transactions and monitor against theft.</li>
            </ul>
          </section>

           <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">4. Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You may also opt-out of receiving marketing communications from us at any time by following the unsubscribe link in our emails or by contacting us directly.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">6. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact our Client Services team at <a href="mailto:care@beok.com" className="underline text-brand-dark">care@beok.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
