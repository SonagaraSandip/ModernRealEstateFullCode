import React from "react";
import { Link } from "react-router-dom";

const ShippingDelivery = () => {
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

        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Shipping & Delivery
          </h1>
          <p className="text-gray-300 text-md md:text-lg max-w-3xl leading-relaxed">
            We aim to provide a smooth and transparent shopping experience. Read
            the details below to understand our shipping, delivery, and return
            processes.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="bg-gray-50 px-6 py-16 md:px-12 lg:px-24 text-gray-900">
        {/* Section: Shipping & Delivery */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Shipping & Delivery Policy
        </h2>

        <p className="mb-4">
          Our policy lasts <strong>30 days</strong>. If 30 days have gone by since
          your purchase, we unfortunately cannot offer a refund or exchange.
        </p>

        <p className="mb-4">
          To be eligible for a return, your item must be unused and in its
          original condition, including the original packaging.
        </p>

        <p className="mb-4">
          Certain goods are exempt from being returned—such as perishable items,
          flowers, magazines, and hazardous or flammable materials.
        </p>

        <p className="font-semibold mt-6 mb-2">Non-returnable items include:</p>
        <ul className="list-disc ml-8 mb-4 space-y-1">
          <li>Gift cards</li>
          <li>Downloadable software products</li>
          <li>Health and personal care items</li>
        </ul>

        <p className="mb-4">
          A receipt or proof of purchase is required to complete any return.
        </p>

        <p className="mb-4">
          Items damaged or missing parts for reasons not due to our error are not
          eligible for a refund.
        </p>

        <p className="mb-4">
          Items returned after 30 days of delivery cannot be accepted.
        </p>

        {/* Refunds */}
        <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-4">
          Refunds (If Applicable)
        </h2>

        <p className="mb-4">
          Once we receive and inspect your return, we will notify you via email
          regarding approval or rejection.
        </p>

        <p className="mb-4">
          If approved, your refund will automatically be processed to your
          original method of payment within a specified number of days.
        </p>

        <p className="mb-4">
          If your refund is delayed, check your bank or card provider, as
          processing times may vary.
        </p>

        <p className="mb-6">
          If the issue persists, please contact us at{" "}
          <span className="font-semibold">themeseupport@shopify.com</span>.
        </p>

        <p className="font-semibold mb-2">Sale items:</p>
        <p className="mb-6">Only regular-priced items are eligible for refunds. Sale items cannot be refunded.</p>

        {/* Exchanges */}
        <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-4">
          Exchanges (If Applicable)
        </h2>

        <p className="mb-4">
          Items are replaced only if defective or damaged. To request an exchange,
          email us and send the item to:
        </p>

        <p className="font-semibold mb-6">
          150 Elgin Street, Ottawa ON K2P1L4, Canada
        </p>

        {/* Gifts */}
        <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-4">Gifts</h2>

        <p className="mb-4">
          If the item was marked as a gift and shipped directly to you, you will
          receive a gift credit for the value of your return.
        </p>

        <p className="mb-6">
          If the gift giver sent it to themselves first and then gave it to you,
          we will send the refund to the gift giver.
        </p>

        {/* Shipping Returns */}
        <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-4">Return Shipping</h2>

        <p className="mb-4">To return your product, ship it to:</p>

        <p className="font-semibold mb-4">
          150 Elgin Street, Ottawa ON K2P1L4, Canada
        </p>

        <p className="mb-4">
          Customers are responsible for paying return shipping costs. These costs
          are non-refundable.
        </p>

        <p className="mb-4">
          Depending on your location, the time required for exchanged items to
          reach you may vary.
        </p>

        <p className="mb-4">
          For returns over $75, we recommend using a trackable shipping service or
          purchasing insurance, as we cannot guarantee receipt of your returned
          item.
        </p>
      </div>
    </div>
  );
};

export default ShippingDelivery;
