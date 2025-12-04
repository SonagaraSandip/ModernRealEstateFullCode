import React from "react";
import { useParams, Link } from "react-router-dom";
import Data from "../data/BlogsData";
import BgCover from "../assets/Blog/blog-banner.webp";
import { ImQuotesLeft } from "react-icons/im";
import { Share2 } from "lucide-react";

const BlogDetailsPage = () => {
  const { blogId } = useParams();

  // Convert title into slug
  const generateSlug = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  //find blog by blogid === title
  const blog = Data.find((item) => generateSlug(item.title) === blogId);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        style={{ backgroundImage: `url(${BgCover})` }}
        className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[450px] bg-cover bg-center text-white"
      >
        <div className="absolute inset-0 bg-black/20 md:bg-black/10"></div>
        {/* Content inside hero */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Back to home */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 w-fit text-white hover:text-teal-300 transition-all text-sm sm:text-base"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center text-sm sm:text-base">
              ←
            </div>
            Back to Home
          </Link>

          {/* Category + Date */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mt-3 sm:mt-4 md:mt-6 text-white text-xs sm:text-sm">
            <span className="bg-gray-800/90 px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
              Featured
            </span>

            <span className="hidden sm:inline">
              <strong>Category:</strong> realestate
            </span>
            <span className="sm:hidden bg-gray-800/70 px-2 py-1 rounded text-xs">
              realestate
            </span>

            <span className="hidden sm:inline">
              <strong>Date:</strong> May 25, 2023
            </span>
            <span className="sm:hidden bg-gray-800/70 px-2 py-1 rounded text-xs">
              May 25, 2023
            </span>
          </div>

          {/* Blog Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold w-full lg:w-1/2 text-white mt-3 sm:mt-4 md:mt-6 max-w-3xl">
            {blog?.title}
          </h1>
          <p className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 w-full lg:w-1/2 line-clamp-3 sm:line-clamp-4 text-xs sm:text-sm md:text-base">
            {blog?.des1}
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-4 sm:py-6 md:py-8 bg-white">
        <div className="flex flex-col gap-4 sm:gap-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 md:gap-8 lg:gap-12 font-serif">
            <h1 className="font-bold text-base sm:text-lg">WorkDo</h1>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 md:gap-8">
              <h1 className="font-bold text-sm sm:text-base md:text-lg">
                Category:{" "}
                <span className="text-gray-500 font-normal text-sm sm:text-base">realestate</span>
              </h1>
              
              <h1 className="font-bold text-sm sm:text-base md:text-lg">
                Date:{" "}
                <span className="text-gray-500 font-normal text-sm sm:text-base">May 25, 2025</span>
              </h1>
            </div>
            
            <button className="flex items-center gap-1 sm:gap-2 border rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
              <Share2 size={14} sm:size={16} />
              Share
            </button>
          </div>
          
          {/* Blog Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-4">
            {blog?.title}
          </h1>
          
          {/* Blog Content */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
            {/* Main Content */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 font-normal w-full lg:w-[70%]">
              <img
                src={blog?.image}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg"
                alt={blog?.title}
              />
              
              <p className="text-gray-700 text-sm sm:text-base md:text-lg text-justify leading-relaxed">
                {blog?.des1}
              </p>
              
              <p className="text-gray-900 text-base sm:text-lg md:text-xl text-justify font-semibold leading-relaxed">
                {blog?.des2}
              </p>
              
              <p className="text-gray-700 text-sm sm:text-base md:text-lg text-justify leading-relaxed">
                {blog?.des3}
              </p>
              
              {/* Quote Section */}
              <div className="flex gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
                <ImQuotesLeft className="text-gray-400 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0" />
                <p className="text-black text-base sm:text-lg md:text-xl font-serif text-justify italic leading-relaxed">
                  {blog?.quata}
                </p>
              </div>
              
              {/* Tags */}
              <div className="mt-4 sm:mt-6">
                <h1 className="font-bold text-sm sm:text-base md:text-lg">
                  Tags:{" "}
                  <span className="text-gray-500 font-normal text-sm sm:text-base md:text-lg">News</span>
                </h1>
              </div>
            </div>
            
            {/* Sidebar - Related Blogs */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 font-normal w-full lg:w-[30%] mt-6 lg:mt-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
                Related Blogs
              </h1>
              
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
                {Data.slice(2, 4).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-0 overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <Link
                        to={`/blogs/realestate/${generateSlug(item.title)}`}
                      >
                        <img
                          src={item.image}
                          className="w-full h-40 sm:h-48 md:h-52 object-cover rounded-t-xl hover:scale-105 transition-transform duration-300"
                          alt={item.title}
                        />
                      </Link>

                      {/* Category Badge */}
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#ffdaba] text-black font-medium text-xs px-2 sm:px-3 py-1 rounded-full">
                        realestate
                      </span>
                    </div>

                    {/* Text Area */}
                    <div className="p-3 sm:p-4 md:p-5">
                      <p className="text-xs text-gray-500 mb-2">
                        25 May 2023 | WorkDo
                      </p>

                      <h3 className="text-base sm:text-lg font-bold text-black font-serif leading-tight line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-sm sm:text-base mt-2 line-clamp-3">
                        {item.des1}
                      </p>

                      <Link
                        to={`/blogs/realestate/${generateSlug(item.title)}`}
                      >
                        <button className="mt-3 sm:mt-4 px-4 sm:px-5 py-1.5 sm:py-2 bg-black text-white rounded-full hover:bg-gray-900 text-xs sm:text-sm transition-colors duration-300">
                          Show full details →
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;