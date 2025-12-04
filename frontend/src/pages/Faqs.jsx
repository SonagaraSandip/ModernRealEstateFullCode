import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Faqs = () => {
  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState(null);

  // Toggle function for accordion
  const toggleItem = (index) => {
    if (openItems === index) {
      setOpenItems(null); //close if click same
    } else {
      setOpenItems(index);
    }
  };

  // FAQ data - you can customize this
  const faqData = [
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
    {
      question: "How to setup a page with custom fields?",
      answer:
        "To setup a page with custom fields, navigate to your dashboard, select 'Pages', then click 'Add New'. In the page editor, you'll find a 'Custom Fields' section where you can add various field types including text, images, dates, and more. Configure each field according to your needs and save your changes.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#172229]">
      {/* Header Section */}
      <div className="px-6 py-8 md:px-12 lg:px-24">
        {/* Back to Home Button */}
        <Link
          to="/"
          className="flex items-center gap-3 w-fit text-white hover:text-teal-400 transition-colors group mb-12"
        >
          <div className="w-10 h-10 rounded-full border-2 border-white group-hover:border-teal-400 flex items-center justify-center transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </div>
          <span className="text-lg font-medium">Back to Home</span>
        </Link>

        {/* FAQ Title & Description */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Faq
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed">
            People will always seek help and advice. They are unwilling to pick
            up the phone, walk into a store, or wait hours (even minutes) for
            that information or insight to become accessible.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 px-6 py-16 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          About shop
        </h2>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 text-gray-600 transition-transform duration-300 ${
                    openItems === index ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openItems === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 pt-2  text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
