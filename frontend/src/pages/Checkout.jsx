import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch cart from API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;

        const data = await res.json();
        setCart(data.cart || []);
      } catch (err) {
        console.log("Cart fetch failed", err);
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.28);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16">

      {/* HEADER */}
      <div className="
        flex justify-between items-center 
        border-b border-gray-300 p-4 shadow-sm 
        px-4 sm:px-8 md:px-20 lg:px-32
      ">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Modernrealestate WorkDo
        </h1>
        <Link to="/collections/bestseller">
          <ShoppingBag size={26} className="text-blue-800" />
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div className="
        flex flex-col lg:flex-row 
        gap-10 
        max-w-6xl mx-auto 
        w-full px-4 sm:px-6 md:px-10 lg:px-0 
        mt-10
      ">

        {/* LEFT FORM PANEL */}
        <div className="flex-1 max-w-2xl mx-auto w-full">

          {/* CONTACT */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <input
              type="email"
              placeholder="Email or mobile phone number"
              className="w-full border p-3 rounded-md mb-3"
            />
            <label className="flex gap-2 text-sm">
              <input type="checkbox" /> Email me with news & offers
            </label>
          </div>

          {/* DELIVERY */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Delivery</h2>

            <select className="w-full border p-3 rounded-md mb-3">
              <option>India</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                placeholder="First name (optional)"
                className="border p-3 rounded-md"
              />
              <input placeholder="Last name" className="border p-3 rounded-md" />
            </div>

            <input
              placeholder="Address"
              className="w-full border p-3 rounded-md mt-3"
            />
            <input
              placeholder="Apartment, suite (optional)"
              className="w-full border p-3 rounded-md mt-3"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <input placeholder="City" className="border p-3 rounded-md" />
              <select className="border p-3 rounded-md">
                <option>Gujarat</option>
              </select>
              <input placeholder="PIN Code" className="border p-3 rounded-md" />
            </div>

            <label className="flex gap-2 text-sm mt-3">
              <input type="checkbox" /> Save information for next time
            </label>
          </div>

          {/* SHIPPING */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Shipping method</h2>
            <div className="border p-4 text-sm text-gray-600 rounded-md">
              Enter address to view shipping options
            </div>
          </div>

          {/* PAYMENT */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Payment</h2>
            <p className="text-gray-500 text-sm mb-3">Secure & encrypted.</p>

            <div className="border rounded-lg p-4 space-y-3">

              <select className="w-full border p-3 rounded-md">
                <option>Credit / Debit Card</option>
              </select>

              <input
                placeholder="Card Number"
                className="w-full border p-3 rounded-md"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="MM/YY" className="border p-3 rounded-md" />
                <input placeholder="CVV" className="border p-3 rounded-md" />
              </div>

              <input
                placeholder="Card Holder Name"
                className="w-full border p-3 rounded-md"
              />

              <label className="flex gap-2 text-sm pt-1">
                <input type="checkbox" defaultChecked /> Billing address same as
                shipping
              </label>
            </div>

            <button
              className="
                w-full bg-blue-600 hover:bg-blue-700 
                text-white font-semibold py-3 rounded-lg mt-6 text-lg
              "
            >
              Pay now
            </button>
          </div>
        </div>

        {/* RIGHT SUMMARY — LIVE CART */}
        <div
          className="
            w-full lg:w-[42%] 
            bg-gray-50 rounded-xl p-6 
            border shadow-sm 
            mx-auto
          "
        >
          {loading && <p>Loading cart...</p>}

          {cart.map((item) => (
            <div key={item.cart_id} className="flex gap-4 mb-5 border-b pb-4">
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                className="w-16 h-16 rounded-md object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.size} sq ft</p>
              </div>

              <p className="font-semibold">
                ₹ {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}

          <div className="flex justify-between text-lg mb-1">
            <span>Subtotal</span>
            <span>₹ {subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Estimated tax (18%)</span>
            <span>₹ {tax.toLocaleString()}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>₹ {total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
