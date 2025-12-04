import React, { useState } from "react";

const Footer = () => {
  const [openTab, setOpenTab] = useState(null);

  const toggleTab = (tab) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  return (
    <footer className="bg-[#172229] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Newsletter */}
        <div className="mb-10">
          <h3 className="text-white text-lg font-semibold mb-4">
            Subscribe newsletter and get -20% off
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Discover the perfect family haven in our spacious suburban residences.
            Thoughtfully designed homes created for your family’s comfort.
          </p>
        </div>

        {/* MOBILE – Accordion */}
        <div className="lg:hidden space-y-4">

          {/* SHOP TAB */}
          <div className="border-b border-gray-700 pb-2">
            <button
              onClick={() => toggleTab("shop")}
              className="flex justify-between items-center w-full py-2 text-lg text-white"
            >
              Shop
              <span>{openTab === "shop" ? "−" : "+"}</span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openTab === "shop" ? "max-h-60" : "max-h-0"
              }`}
            >
              <ul className="pl-2 text-gray-300 space-y-2 py-2">
                <li><a href="#" className="hover:text-teal-400">Search</a></li>
                <li><a href="/collections" className="hover:text-teal-400">All Collections</a></li>
                <li><a href="/collections/bestseller" className="hover:text-teal-400">All Products</a></li>
                <li><a href="/cart" className="hover:text-teal-400">My Cart</a></li>
              </ul>
            </div>
          </div>

          {/* ACCOUNT TAB */}
          <div className="border-b border-gray-700 pb-2">
            <button
              onClick={() => toggleTab("account")}
              className="flex justify-between items-center w-full py-2 text-lg text-white"
            >
              Account
              <span>{openTab === "account" ? "−" : "+"}</span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openTab === "account" ? "max-h-72" : "max-h-0"
              }`}
            >
              <ul className="pl-2 text-gray-300 space-y-2 py-2">
                <li><a href="/pages/about" className="hover:text-teal-400">About Us</a></li>
                <li><a href="/pages/contact" className="hover:text-teal-400">Contact With Us</a></li>
                <li><a href="/pages/faq" className="hover:text-teal-400">FAQ</a></li>
                <li><a href="/pages/privacy" className="hover:text-teal-400">Privacy Policy</a></li>
                <li><a href="/pages/shipping-delivery" className="hover:text-teal-400">Shipping & Delivery</a></li>
                <li><a href="/pages/terms-conditions" className="hover:text-teal-400">Terms & Conditions</a></li>
                <li><a href="/pages/wishlist" className="hover:text-teal-400">Wishlist</a></li>
              </ul>
            </div>
          </div>

          {/* SHARE TAB */}
          <div className="border-b border-gray-700 pb-2">
            <button
              onClick={() => toggleTab("share")}
              className="flex justify-between items-center w-full py-2 text-lg text-white"
            >
              Share
              <span>{openTab === "share" ? "−" : "+"}</span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openTab === "share" ? "max-h-40" : "max-h-0"
              }`}
            >
              <ul className="pl-2 text-gray-300 space-y-2 py-2">
                <li><a href="#" className="hover:text-teal-400">YouTube</a></li>
                <li><a href="#" className="hover:text-teal-400">Facebook</a></li>
                <li><a href="#" className="hover:text-teal-400">Instagram</a></li>
                <li><a href="#" className="hover:text-teal-400">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* DESKTOP – Always Open */}
        <div className="hidden lg:grid grid-cols-4 gap-10 mt-10">
          <div />
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Shop:</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-teal-400">Search</a></li>
              <li><a href="/collections" className="hover:text-teal-400">All Collections</a></li>
              <li><a href="/collections/bestseller" className="hover:text-teal-400">All Products</a></li>
              <li><a href="/cart" className="hover:text-teal-400">My Cart</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Account:</h3>
            <ul className="space-y-2">
              <li><a href="/pages/about" className="hover:text-teal-400">About Us</a></li>
              <li><a href="/pages/contact" className="hover:text-teal-400">Contact With Us</a></li>
              <li><a href="/pages/faq" className="hover:text-teal-400">FAQ</a></li>
              <li><a href="/pages/privacy" className="hover:text-teal-400">Privacy Policy</a></li>
              <li><a href="/pages/shipping-delivery" className="hover:text-teal-400">Shipping & Delivery</a></li>
              <li><a href="/pages/terms-conditions" className="hover:text-teal-400">Terms & Conditions</a></li>
              <li><a href="/pages/wishlist" className="hover:text-teal-400">Wishlist</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Share:</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-teal-400">YouTube</a></li>
              <li><a href="#" className="hover:text-teal-400">Facebook</a></li>
              <li><a href="#" className="hover:text-teal-400">Instagram</a></li>
              <li><a href="#" className="hover:text-teal-400">Twitter</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025, Modernrealestate — Powered by WorkDo.io
          </p>

          <div className="flex gap-2">
            <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-bold">VISA</span>
            <span className="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold">EXPRESS</span>
            <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-bold">AMEX</span>
            <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-bold">PAYPAL</span>
            <span className="bg-white text-blue-400 px-2 py-1 rounded text-xs font-bold">UPI</span>
            <span className="bg-white text-orange-600 px-2 py-1 rounded text-xs font-bold">DISCOVER</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
