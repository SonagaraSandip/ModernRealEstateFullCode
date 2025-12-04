import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Privacy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-md md:text-lg max-w-3xl leading-relaxed">
            We value the diverse perspectives and experiences of our users, and
            we encourage collaboration and community engagement. Our platform
            provides opportunities for users to contribute their knowledge,
            share their opinions
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 px-6 py-16 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Privacy Policy
        </h2>

        {/* FAQ Grid */}
        <div className="flex flex-col gap-6 ">
          <h1 className="font-serif text-md font-semibold">
            When you visit the Site, we automatically collect certain
            information about your device, including information about your web
            browser, IP address, time zone, and some of the cookies that are
            installed on your device. Additionally, as you browse the Site, we
            collect information about the individual web pages or products that
            you view, what websites or search terms referred you to the Site,
            and information about how you interact with the Site. We refer to
            this automatically-collected information as “Device Information”.
          </h1>
          <p>
            Additionally when you make a purchase or attempt to make a purchase
            through the Site, we collect certain information from you, including
            your name, billing address, shipping address, payment information,
            email address, and phone number. We refer to this information as
            “Order Information”.When we talk about “Personal Information” in
            this Privacy Policy, we are talking both about Device Information
            and Order Information.
          </p>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6">
          How do we use your personal information?
        </h2>
        <p className="mt-4">
          We use the Order Information that we collect generally to fulfill any
          orders placed through the Site (including processing your payment
          information, arranging for shipping, and providing you with invoices
          and/or order confirmations). Additionally, we use this Order
          Information to:
        </p>
        <div className="flex flex-col gap-2 mt-4 ml-12">
          <li>Communicate with you.</li>
          <li>Screen our orders for potential risk or fraud.</li>
          <li>When in line with the preferences you have shared with us.</li>
          <li>
            provide you with information or advertising relating to our products
            or services.
          </li>
        </div>
        <p className="mt-4">
          We use the Device Information that we collect to help us screen for
          potential risk and fraud (in particular, your IP address), and more
          generally to improve and optimize our Site (for example, by generating
          analytics about how our customers browse and interact with the Site,
          and to assess the success of our marketing and advertising campaigns).
        </p>
      </div>
    </div>
  );
};

export default Privacy;
