import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import First from "../assets/collection/1.webp";
import Second from "../assets/collection/2.webp";
import Third from "../assets/collection/3.webp";
import Fourth from "../assets/collection/4.jpg";

const Collections = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      const res = await fetch("http://localhost:5000/api/properties/count");
      const data = await res.json();

      if (!res.ok) return;

      let formatted = {};
      let total = 0;

      data.count.forEach((c) => {
        formatted[c.type] = c.count;
        total += c.count;
      });

      formatted.bestseller = total;
      setCount(formatted);
    };

    fetchCounts();
  }, []);

  const collections = [
    {
      id: "bestseller",
      title: "Bestseller",
      type: "bestseller",
      image: First,
    },
    {
      id: "farm-villa",
      title: "Farm Villa",
      type: "villa",
      image: Second,
    },
    {
      id: "properties",
      title: "Properties",
      type: "Properties",
      image: Third,
    },
    {
      id: "royal-house",
      title: "Royal House",
      type: "royalhouse",
      image: Fourth,
    },
  ];

  const handleCardClick = (collectionId) => {
    navigate(`/collections/${collectionId}`);
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] py-10 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-center text-4xl sm:text-5xl font-semibold mb-12 sm:mb-16 text-[#13343b] tracking-tight">
          Collections
        </h1>

        {/* Responsive Grid */}
        <div
          className="
          grid
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-8 
          sm:gap-10
        "
        >
          {collections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => handleCardClick(collection.id)}
              className="cursor-pointer transition-transform duration-300 hover:-translate-y-2 group"
            >
              {/* Image Container */}
              <div className="relative w-full pb-[70%] sm:pb-[75%] rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div className="text-center mt-5 sm:mt-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-[#13343b]">
                  {collection.title}
                </h2>

                <span
                  className="
                  inline-block 
                  bg-[#13343b] 
                  text-[#fcfcf9] 
                  px-5 py-1.5 
                  sm:py-2 
                  rounded-full 
                  text-sm 
                  sm:text-base 
                  font-medium
                "
                >
                  {count[collection.type] !== undefined
                    ? `${count[collection.type]} Items`
                    : "Loading..."}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
