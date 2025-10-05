
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-6"
      >
        <span className="text-lg font-serif">{question}</span>
        <span className="text-2xl font-thin">{isOpen ? '-' : '+'}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="pb-6 text-brand-gray">
          <p dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      </div>
    </div>
  );
};

const faqs = [
  {
    question: "How can I track my order?",
    answer: "Once your order has been dispatched, you will receive an email confirmation containing your tracking number. You can use this number on the courier's website to track the progress of your delivery."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 14 days of receipt, provided the item is in its original, unused condition with all tags attached. To initiate a return, please visit our Shipping & Returns page or contact Client Services."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we are pleased to offer international shipping to most countries. Shipping costs and delivery times vary by destination and will be calculated at checkout. Please note that international orders may be subject to customs duties and taxes."
  },
  {
    question: "How should I care for my BEOK garments?",
    answer: "Each piece comes with specific care instructions on its label. Generally, we recommend professional dry cleaning for our tailored items and delicate fabrics. For leather goods, we suggest using a specialized leather conditioner. For more detailed advice, please contact us."
  },
  {
    question: "Can I amend or cancel my order after it has been placed?",
    answer: "If you wish to amend or cancel your order, please contact our Client Services team as soon as possible. While we cannot guarantee changes can be made once an order is processed, we will do our utmost to assist you."
  },
  {
    question: "Is my personal information kept private?",
    answer: "Absolutely. We are committed to protecting your privacy. All information you provide is kept secure and confidential and will not be shared with third parties. For more details, please review our <a href='#/privacy-policy' class='underline'>Privacy Policy</a>."
  }
];

const FAQPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif">Frequently Asked Questions</h1>
        <p className="text-lg text-brand-gray mt-4">Find answers to your questions below.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
