import React from "react";
import { Link } from "react-router-dom";
import Img1 from "../assets/Blog/abt-1.webp";
import Img2 from "../assets/Blog/abt-2.webp";

const About = () => {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="px-6 md:px-12 lg:px-24 py-10 bg-[#172229] text-white">
        <Link
          to="/"
          className="flex items-center gap-3 text-white hover:text-teal-300 transition-all mt-4 mb-6"
        >
          <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
            ←
          </div>
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-4">About us</h1>
        <p className="text-gray-300 max-w-3xl text-lg">
          At AboutUs, we are a dynamic and innovative company committed to
          providing comprehensive information and valuable insights on a wide
          range of topics.
        </p>
      </div>

      {/* Section 1 */}
      <div className="max-w-7xl mx-auto py-16 ">
        <h2 className="text-3xl font-bold mb-8">Be clear and concise</h2>

        <div className="grid md:grid-cols-2 gap-10 text-gray-700 leading-relaxed">
          <p>
            At Modern Real Estate, we are dedicated to redefining the real
            estate experience by combining cutting-edge technology, exceptional
            service, and a forward-thinking approach. Our team of seasoned
            professionals is passionate about helping clients find their dream
            homes or investment properties.
          </p>

          <p>
            With years of industry experience and a deep understanding of the
            modern real estate landscape, our team of experts is well-equipped
            to guide you through the complexities of buying, selling, or
            investing in properties. From market analysis and property valuation
            to negotiating deals and navigating legal processes.
          </p>
        </div>
      </div>

      {/* Section 2 – Large Title + Image */}
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-3xl font-bold mb-10 text-center">
          The world needs to move fast to make a meaning against climate change.
        </h2>
      </div>

      {/* Section 3 – Image Left + Text Right */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 py-10">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Make it inviting and engaging
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We provide comprehensive support at every stage. Our in-depth
            knowledge of local markets and trends ensures that you make informed
            decisions that align with your goals and aspirations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            At Modern Real Estate, we prioritize our clients' needs above all
            else. We believe in building strong and lasting relationships by
            providing personalized attention and tailor-made solutions.
          </p>
        </div>

        <img
          src={Img1}
          alt="About Section"
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      {/* Section 4 – Image Left + Text Right */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center py-10">
        <img
          src={Img2}
          alt="About Section"
          className="w-full rounded-xl shadow-lg"
        />

        <div className="flex flex-col">
          <h2 className="text-3xl font-bold font-serif mb-4">
            Keep it short and sweet
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Whether you are a first-time homebuyer, a seasoned investor, or
            looking to sell your property, we are committed to delivering an
            exceptional experience that is centered around you.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Embracing the digital age, we harness the power of cutting-edge
            technology to enhance and streamline your real estate journey.
          </p>
        </div>
      </div>

      {/* About our services */}
      <div className="max-w-7xl mx-auto text-center py-20 ">
        <h2 className="text-3xl font-bold">About our services</h2>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          Our mission is to empower individuals with knowledge and facilitate
          meaningful connections through our platform. We understand the
          importance of reliable and up-to-date information in today’s
          fast-paced world.
        </p>

        {/* Service Boxes */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {/* Fast Delivery */}
          <div className="border border-black  p-6 shadow-sm">
            <h3 className="font-bold text-xl mb-2">Fast delivery</h3>
            <p className="text-gray-600 text-md text-justify">
              The specific delivery time will vary depending on the shipping address and the selected delivery option. Customers can track their order online to see the estimated delivery date.
            </p>
          </div>

          {/* Many Offers */}
          <div className="border border-black p-6 shadow-sm">
            <h3 className="font-bold text-xl mb-2">Many offers</h3>
            <p className="text-gray-600 text-md text-justify">
             CMS also offers a variety of training and technical assistance to help providers and state agencies meet their responsibilities under Medicare, Medicaid, and SCHIP.
            </p>
          </div>

          {/* 24/7 Support */}
          <div className="border border-black p-6 shadow-sm">
            <h3 className="font-bold text-xl mb-2">24/7 support</h3>
            <p className="text-gray-600 text-md text-justify">
              CMS Service support is available 24 hours a day, 7 days a week. You can reach them by phone, email, or chat. Here are the contact information for CMS Service support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
