import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 h-[48vh] bg-white">
      <h1 className="text-9xl font-serif text-gray-900">404</h1>
      <Link to="/collections/bestseller">
        <button className="bg-[#0e1a1f] text-white px-6 py-2 rounded-full hover:opacity-90 transition">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default Error;
