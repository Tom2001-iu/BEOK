
import React from 'react';
import { BRAND_NAME } from '../constants';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif">Terms of Service</h1>
          <p className="text-lg text-brand-gray mt-4">Please read these terms carefully before using our services.</p>
        </div>

        <div className="space-y-8 text-brand-gray leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and others who wish to access or use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">2. Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are and will remain the exclusive property of {BRAND_NAME} and its licensors. The brand, logos, and service marks displayed on the site are the property of {BRAND_NAME}. You are not permitted to use these marks without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">3. Product Information and Orders</h2>
            <p>
              We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the site. However, we do not guarantee that they will be accurate, complete, reliable, or error-free. All products are subject to availability, and we reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.
            </p>
          </section>

           <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">4. User Accounts</h2>
            <p>
              If you create an account on our website, you are responsible for maintaining the security of your account and for all activities that occur under the account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall {BRAND_NAME}, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">6. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
