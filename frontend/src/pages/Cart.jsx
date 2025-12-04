import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setCart(data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  // Update qty
  const updateQty = async (cart_id, qty) => {
    if (qty < 1) return;

    try {
      await fetch(`http://localhost:5000/api/cart/quantity/${cart_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: qty }),
      });

      setCart((prev) =>
        prev.map((item) =>
          item.cart_id === cart_id ? { ...item, quantity: qty } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Update size
  const updateSize = async (cart_id, size) => {
    try {
      await fetch(`http://localhost:5000/api/cart/size/${cart_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ size }),
      });

      setCart((prev) =>
        prev.map((i) => (i.cart_id === cart_id ? { ...i, size } : i))
      );
    } catch (error) {
      console.error("Error updating size:", error);
    }
  };

  // Remove
  const removeItem = async (id) => {
    if (!window.confirm("Remove this item from cart?")) return;
    
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(cart.filter((i) => i.cart_id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!token) {
    return (
      <div className="min-h-screen bg-white text-black px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6"
          >
            <ArrowLeft size={20} />
            <span>Continue shopping</span>
          </Link>
          
          <div className="text-center py-16">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Sign in to view your cart</p>
            <Link
              to="/account/login"
              className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 bg-white z-10 border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/collections" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            <span className="text-sm">Shop</span>
          </Link>
          <h1 className="text-lg font-semibold">Your Cart</h1>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>
        {cart.length > 0 && (
          <p className="text-xs text-gray-500 text-center mt-1">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </p>
        )}
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8">
        {/* Desktop Back Button & Title */}
        <div className="hidden lg:block mb-6">
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft size={20} />
            <span>Continue shopping</span>
          </Link>
          <h1 className="text-3xl font-semibold mt-4">Your cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some properties to get started</p>
            <Link
              to="/collections"
              className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* LEFT — CART ITEMS */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {cart.map((item) => (
                <div
                  key={item.cart_id}
                  className="border rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.title}
                        className="w-full sm:w-32 md:w-36 h-40 sm:h-32 md:h-36 object-cover rounded-lg"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-base sm:text-lg font-semibold line-clamp-2">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{item.type}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.cart_id)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>

                      {/* Size Selector */}
                      <div className="mt-3 sm:mt-4">
                        <label className="text-sm text-gray-500 mb-1 block">Size:</label>
                        <select
                          className="w-full sm:w-auto border px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                          value={item.size}
                          onChange={(e) => updateSize(item.cart_id, e.target.value)}
                        >
                          {item.size_sqft.map((size) => (
                            <option key={size} value={size}>
                              {size} sq ft
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quantity & Price Row */}
                      <div className="flex items-center justify-between mt-4 sm:mt-6">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3 border px-3 py-2 rounded-full">
                            <button 
                              onClick={() => updateQty(item.cart_id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded-full"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : ""} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQty(item.cart_id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded-full"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          {/* Price per item (mobile only) */}
                          <div className="sm:hidden text-sm">
                            <span className="text-gray-500">Price: </span>
                            <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Total Price */}
                        <div className="text-right">
                          <p className="text-sm text-gray-500 hidden sm:block">Price: ₹{item.price.toLocaleString()}</p>
                          <p className="text-lg font-semibold mt-1">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — CHECKOUT BOX */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-gray-50 border rounded-xl p-5 sm:p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Order Summary
                </h3>

                {/* Order Note */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    placeholder="Any special instructions for your order..."
                    className="border w-full h-24 p-3 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black resize-none"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                {/* Order Summary */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({cart.length})</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Taxes and shipping calculated at checkout
                    </p>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="block w-full bg-black text-white text-center py-3.5 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors mt-6"
                >
                  Proceed to checkout
                </Link>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Free shipping • 30-day return policy • Secure checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Bar (when cart has items) */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
          <div className="px-4 py-3">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm text-gray-600">Total ({cart.length} items)</p>
                <p className="text-xl font-semibold">₹{subtotal.toLocaleString()}</p>
              </div>
              <Link
                to="/checkout"
                className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for mobile bottom bar */}
      {cart.length > 0 && <div className="h-20 lg:h-0"></div>}
    </div>
  );
};

export default Cart;