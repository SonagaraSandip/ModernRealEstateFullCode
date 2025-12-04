import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LocateFixed, MoveRight, Heart, RefreshCcw, Eye } from "lucide-react";

const PropertyCardFlex = ({ property }) => {
  const defaultSize = property.size_sqft?.[0];
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const currentImage =
    property.images_by_size?.[selectedSize] || property.image;

  useEffect(() => {
    // Check if the property is in the wishlist
    const checkWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsInWishlist(false);
        return;
      }
      try {
        // FIX: Use the specific CHECK API endpoint
        const res = await fetch(
          `http://localhost:5000/api/wishlist/check/${property.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          // Data structure is { inWishlist: boolean }
          setIsInWishlist(Boolean(data.inWishlist));
        }
      } catch (error) {
        console.error("Failed to check wishlist status:", error);
        setIsInWishlist(false);
      }
    };
    checkWishlist();
  }, [property.id]);

  //add to cart
  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property_id: property.id,
          size: selectedSize,
          quantity: 1,
        }),
      });
      if (res.ok) {
        alert("Property added to cart successfully.");
      }
      const data = await res.json();
      console.log(data);
      alert(data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An unexpected error occurred.");
    }
  };

  const GenerateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required.");
      return;
    }

    try {
      if (!isInWishlist) {
        //add
        const res = await fetch(`http://localhost:5000/api/wishlist`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ property_id: property.id }),
        });
        if (res.ok) {
          setIsInWishlist(true);
        }
      } else {
        //remove
        const res = await fetch(
          `http://localhost:5000/api/wishlist/${property.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          setIsInWishlist(false);
        }
      }
    } catch (error) {
      console.error("Error modifying wishlist:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex bg-[#ffe7d9] rounded-2xl text-[#172229] shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-[700px] mx-auto h-[200px]">
      <div className="relative w-1/2 h-[200px] rounded-xl overflow-hidden group">
        <Link to={`/products/${GenerateSlug(property.title)}`}>
          <img
            src={`http://localhost:5000/uploads/${currentImage}`}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          />
        </Link>

        {/* hover actions */}
        <div className="absolute top-2 left-2 flex flex-col opacity-0 group-hover:opacity-100 gap-2 transition-opacity  ">
          <button
            onClick={handleWishlist}
            className="bg-black/70 p-1 rounded-lg hover:bg-black/90 text-white"
          >
            {isInWishlist ? (
              <Heart fill="red" size={16} />
            ) : (
              <Heart size={16} />
            )}
          </button>
          <button className="bg-black/70 p-1 rounded-lg hover:bg-black/90 text-white">
            <RefreshCcw size={16} />
          </button>
          <button className="bg-black/70 p-1 rounded-lg hover:bg-black/90 text-white">
            <Eye size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col p-3 px-6">
        <div className="flex items-center gap-1 mb-1">
          <LocateFixed size={14} />
          <p className="text-sm font-serif truncate">{property.type}</p>
        </div>
        <h2 className="text-md font-bold mb-2">{property.title}</h2>
        {/* size button */}
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full mb-2 p-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none"
        >
          {property.size_sqft.map((size, index) => (
            <option key={index} value={size}>
              {size} sq ft
            </option>
          ))}
        </select>
        {/* price */}
        <div className="text-green-600 font-semibold text-md mb-2">
          ₨. ₹{property.price}
        </div>
        {/* add to cart */}
        <button
          onClick={addToCart}
          className="flex items-center self-start gap-1 px-4 py-2 rounded-full text-sm border transition-colors duration-300 bg-[#172229] text-white hover:bg-[#ffe7d9] hover:text-black border-black"
        >
          <span>Add to Cart</span>
          <MoveRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PropertyCardFlex;
