import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";

const Wishlist = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setItems([]);
        return;
      }

      const res = await fetch("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

        if (!res.ok) {
      // Token expired / invalid
      console.warn("Unauthorized - clearing wishlist");
      setItems([]);
      return;
    }

      const data = await res.json();
      setItems(data.wishlist);
    };

    fetchWishlist();
  }, []);

  const GenerateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const removeItem = async (property_id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to remove items");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/wishlist/${property_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to remove item");
      }

      // remove locally
      setItems((prev) => prev.filter((item) => item.id !== property_id));
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to remove item");
    }
  };

  return (
    <div className="min-h-screen bg-[#172229]">
      {/* Header Section */}
      <div className="px-6 py-8 md:px-12 lg:px-24">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-3  w-fit text-white hover:text-teal-400 transition-colors group mb-12"
        >
          <div className="w-10 h-10 rounded-full border-2  border-white group-hover:border-teal-400 flex items-center justify-center transition-colors">
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
          <h1 className="text-5xl font-bold text-white mb-6">My Wishlist</h1>
          <p className="text-gray-300 text-md md:text-lg max-w-3xl leading-relaxed">
            All the products you love in one place. Review, explore, and shop
            your favorites anytime.
          </p>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="bg-gray-50 px-6 py-16 md:px-12 lg:px-24 min-h-[60vh]">
        {/* Empty State */}
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={50} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl text-gray-700 font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Start exploring and add products you love.
            </p>
            <Link
              to="/products"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-12">
              Saved Items
            </h2>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto gap-8">
              {items.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
                >
                  {/* Image */}
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    className="w-full h-56 object-cover"
                  />

                  {/* Content */}
                  <div className="p-4 text-gray-900">
                    <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm row-span-2 text-gray-500 mb-3 ">
                      {p.description}
                    </p>
                    <p className="text-md  text-black font-semibold mb-3">
                      Rs. {p.price}
                    </p>

                    <div className="flex justify-between items-center">
                      <Link
                        to={`/products/${GenerateSlug(p.title)}`}
                        className="text-teal-600 font-semibold hover:text-teal-800"
                      >
                        View Details →
                      </Link>

                      <button
                        onClick={() => removeItem(p.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
