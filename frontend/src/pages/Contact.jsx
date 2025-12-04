import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-[#172229]">
      {/* Back to Home Button */}
      <div className="px-6 py-8 md:px-12 lg:px-24">
        <Link
          to={"/"}
          className="flex items-center gap-3 w-fit text-white hover:text-teal-400 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-white group-hover:border-teal-400 flex items-center justify-center transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="text-lg font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact Info */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact with us
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              With that in mind, we strive to deliver accurate, trustworthy, and
              engaging content to our users. Our team of experts, researchers,
              and writers work tirelessly to curate high-quality articles,
              guides, and resources that cover various domains such as
              technology, science, health, business, and more.
            </p>

            {/* Contact Details */}
            <div className="space-y-8 bg-white/5 p-8 rounded-lg">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  CALL US
                </h3>
                <p className="text-2xl font-semibold">+48 0021-32-12</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  EMAIL:
                </h3>
                <p className="text-xl">shop@company.com</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  ADDRESS:
                </h3>
                <p className="text-xl leading-relaxed">
                  1093 Marigold Lane,
                  <br />
                  Coral Way, Miami,
                  <br />
                  Florida, 33169
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-lg border border-white/10">
            <h2 className="text-white text-3xl font-bold mb-8">Contact form</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-white text-sm mb-2"
                  >
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-white text-sm mb-2"
                  >
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white text-sm mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="shop@company.com"
                    required
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-white text-sm mb-2"
                  >
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-white text-sm mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="How Can We Help?"
                  rows="6"
                  className="w-full px-4 py-3 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-slate-200 hover:bg-slate-700 text-black hover:text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Send Message
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
