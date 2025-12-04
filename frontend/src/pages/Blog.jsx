import React, { useState } from "react";
import { Link } from "react-router-dom";
import Data from "../data/BlogsData";

const Blog = () => {
  const [page, setPage] = useState(1);

  const blogsPerPage = 4;
  const startIndex = (page - 1) * blogsPerPage;
  const lastIndex = startIndex + blogsPerPage;

  const currentBlogs = Data.slice(startIndex, lastIndex);
  const generateSlug = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="min-h-screen bg-[#172229]">
      {/* Header */}
      <div className="px-6 py-8 md:px-12 lg:px-24">
        <Link
          to="/"
          className="flex items-center gap-3  self-start text-white hover:text-teal-400 transition-all mt-12 mb-6"
        >
          <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
            ←
          </div>
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-6">realestate</h1>
        <p className="text-gray-300 max-w-3xl text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      {/* Blog cards section */}
      <div className="bg-white px-6 md:px-12 lg:px-24 py-16">
        <p className="text-gray-600">ALL BLOGS</p>
        <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-10">
          Realestate
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentBlogs.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-black shadow-sm hover:shadow-lg transition p-0 overflow-hidden"
            >
              {/* image section */}
              <div className="relative overflow-hidden">
                <Link to={`/blogs/realestate/${generateSlug(item.title)}`}>
                  <img
                    src={item.image}
                    className="w-full h-52 object-cover rounded-t-xl"
                  />
                </Link>

                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-[#ffdaba] text-black font-medium text-xs px-3 py-1 rounded-full">
                  realestate
                </span>
              </div>

              {/* text area */}
              <div className="p-5">
                <p className="text-xs text-gray-500 mb-2">
                  25 May 2023 | WorkDo
                </p>

                <h3 className="text-lg font-bold text-black font-serif leading-tight line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-900  mt-2 line-clamp-4">{item.des1}</p>

                <Link to={`/blogs/realestate/${generateSlug(item.title)}`}>
                  <button className="mt-4 px-5 py-2  bg-black text-white rounded-full hover:bg-gray-900 text-sm">
                    Show full details →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-3 mt-10">
          <button
            onClick={() => setPage(1)}
            className={`px-4 py-2 border rounded-full  ${
              page === 1
                ? "bg-black text-white"
                : "bg-white text-black border-black"
            }`}
          >
            1
          </button>
          <button
            onClick={() => setPage(2)}
            className={`px-4 py-2 border rounded-full  ${
              page === 2
                ? "bg-black text-white"
                : "bg-white text-black border-black hover:bg-gray-600 hover:text-white"
            }`}
          >
            2
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
