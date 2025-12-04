/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo/Logo.webp";
import { ChevronDown, User, ShoppingCart, Heart, Trash2, Menu, X } from "lucide-react";
import INR from "../assets/flag/inr.svg";
import USD from "../assets/flag/usd.svg";
import AUD from "../assets/flag/aud.svg";
import CAN from "../assets/flag/cad.svg";
import ApartmentImage from "../assets/logo/4.webp";
import BestSeller from "../assets/Navbar/bestseller.webp";
import FarmVilla from "../assets/Navbar/farmvilla.webp";
import Property from "../assets/Navbar/properties.webp";
import RoyalHouse from "../assets/Navbar/royalhouse.webp";
import { useEffect } from "react";

const apartmentMenu = {
  farmVilla: [
    "Wheelwright Cottage House D-55",
    "Town Place Apartments E-62",
    "Meadow View D-205",
    "Luxury Landing E-87",
    "Heavenly Homes B-64",
    "Heart and Soul Apartments D-604",
    "Green Gardens A-72",
    "Family Villas C-92",
  ],
  luxuryProperties: [
    "Town Place Walkups A-404",
    "Town Place Apartments E-62",
    "The White House J-54",
    "Tannery Gardens House B-32",
    "Noble Park B-106",
    "MiniPalais D-703",
    "Heart and Soul Apartments D-604",
    "Family Villas C-92",
    "East Side Living",
  ],
  royalHouse: [
    "Wheelwright Cottage House D-55",
    "Town Place Walkups A-404",
    "The White House J-54",
    "The Never-Ending Story C-52",
    "Tannery Gardens House B-32",
    "MiniPalais D-703",
    "Meadow View D-205",
    "Heavenly Homes B-64",
    "Heart and Soul Apartments D-604",
  ],
};

const Collection = [
  {
    image: BestSeller,
    name: "Best Sellers",
    link: "bestseller",
  },
  {
    image: FarmVilla,
    name: "Farm Villa",
    link: "farm-villa",
  },
  {
    image: Property,
    name: "Properties",
    link: "properties",
  },
  {
    image: RoyalHouse,
    name: "Royal House",
    link: "royal-house",
  },
];

const Pages = [
  {
    name: "About Us",
    link: "about",
  },
  {
    name: "Contact with Us",
    link: "contact",
  },
  {
    name: "Faq",
    link: "faq",
  },
  {
    name: "Privacy Policy",
    link: "privacy",
  },
  {
    name: "Shipping & Delivery",
    link: "shipping-delivery",
  },
  {
    name: "Terms & Conditions",
    link: "terms-conditions",
  },
  {
    name: "Wishlist",
    link: "wishlist",
  },
];

const Blog = [
  {
    name: "Blog Page",
    link: "/blogs/realestate",
  },
  {
    name: "Artical Page",
    link: "/blogs/realestate/dream-house-diaries-points-over-penthouses",
  },
];

const currency = [
  {
    name: " INR ₹",
    image: INR,
  },
  {
    name: "USD $",
    image: USD,
  },
  {
    name: "AUD $",
    image: AUD,
  },
  {
    name: "CAN $",
    image: CAN,
  },
];

const Navbar = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currency[0]);
  const [isInrOpen, setIsInrOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [menuTimer, setMenuTimer] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubtotal] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);

  // get user info from local storage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleMenuEnter = (menuName) => {
    if (menuTimer) {
      clearTimeout(menuTimer);
      setMenuTimer(null);
    }
    setOpenMenu(menuName);
  };

  const handleMenuLeave = () => {
    const timer = setTimeout(() => {
      setOpenMenu(null);
    }, 500);
    setMenuTimer(timer);
  };

  useEffect(() => {
    fetchCart();
  }, [localStorage.getItem("token")]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // user not logged in
      setCart([]);
      setSubtotal(0);
      return;
    }

    const res = await fetch("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      // if 401 or failed
      setCart([]);
      setSubtotal(0);
      return;
    }

    const data = await res.json();
    setCart(data.cart);
    setSubtotal(
      data.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
  };

  const updateQty = async (cart_id, qty) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/cart/quantity/${cart_id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart_id, quantity: qty }), // 🔥 must send like this
    });

    fetchCart(); // refresh
  };

  const removeItem = async (cart_id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/cart/${cart_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const toggleMobileSubMenu = (menu) => {
    setMobileSubMenu(mobileSubMenu === menu ? null : menu);
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white-500">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link to={`/`}>
          <img src={Logo} alt="logo" className="h-8" />
        </Link>
        <button
          onClick={() => setCartOpen(true)}
          className="text-white relative"
        >
          <ShoppingCart size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="hidden lg:flex items-center justify-between border-b border-white-500 max-w-7xl mx-auto py-5 text-white px-4 lg:px-0">
        {/* left side */}
        <div className="flex gap-6 items-center text-white">
          {/* apartment */}
          <div
            onMouseEnter={() => handleMenuEnter("apartment")}
            onMouseLeave={handleMenuLeave}
            className="flex items-center gap-1 cursor-pointer"
          >
            <h1 className="text-white text-sm">Apartment</h1>
            <ChevronDown size={16} className="mt-1" />
          </div>
          {/* collection */}
          <div
            onMouseEnter={() => handleMenuEnter("collection")}
            onMouseLeave={handleMenuLeave}
            className="flex items-center justify-center gap-1 cursor-pointer  "
          >
            <Link to={`/collections`} className="text-white text-sm">
              Collection
            </Link>
            <span>
              <ChevronDown size={16} />
            </span>
          </div>
          {/* page */}
          <div
            onMouseEnter={() => handleMenuEnter("page")}
            onMouseLeave={handleMenuLeave}
            className="flex items-center justify-center gap-1 cursor-pointer"
          >
            <h1 className="text-white text-sm">Page</h1>
            <span>
              <ChevronDown size={16} />
            </span>
          </div>
          {/* blog */}
          <div
            onMouseEnter={() => handleMenuEnter("blog")}
            onMouseLeave={handleMenuLeave}
            className="flex items-center justify-center gap-1 cursor-pointer"
          >
            <h1 className="text-white text-sm">Blog</h1>
            <span>
              <ChevronDown size={16} />
            </span>
          </div>
        </div>
        {/* logo */}
        <Link to={`/`}>
          <img src={Logo} alt="logo" className="h-10 items-center" />
        </Link>

        {/* right side */}
        <div className="flex gap-4">
          <button className="hidden lg:flex items-center gap-1 border rounded-full px-4">
            <h1 className="text-white text-sm">English</h1>
            <ChevronDown size={16} />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsInrOpen(!isInrOpen)}
              className="hidden lg:flex items-center gap-1 border rounded-full px-4 py-2"
            >
              {/*  Now shows the selected currency */}
              <img
                src={selectedCurrency.image}
                alt={selectedCurrency.name}
                className="w-4 h-4 "
              />
              <h1 className="text-white text-sm">{selectedCurrency.name}</h1>
              <ChevronDown size={16} />
            </button>

            {/* Currency Dropdown */}
            {isInrOpen && (
              <div className="absolute top-full right-0 mt-2 rounded-lg bg-white py-2 px-4 text-sm z-50">
                {currency.map((item) => (
                  <button
                    key={item.name}
                    className="flex items-center gap-2 my-1 w-24 max-w-full text-left text-black hover:bg-gray-100 p-2 rounded"
                    onClick={() => {
                      setSelectedCurrency(item);
                      setIsInrOpen(false);
                    }}
                  >
                    <img src={item.image} alt={item.name} className="w-4 h-4" />
                    <h1 className="text-lg font-semibold">{item.name}</h1>
                  </button>
                ))}
              </div>
            )}
            {isInrOpen && (
              <div
                onClick={() => setIsInrOpen(false)}
                className="fixed inset-0 "
              ></div>
            )}
          </div>
          {/* User account */}
          <div className="relative">
            <button
              onClick={() => setOpenUser(!openUser)}
              className="border rounded-full p-2 flex items-center gap-2"
            >
              <User />{" "}
              {isLoggedIn && (
                <span className="hidden lg:inline text-sm font-semibold text-white ">
                  Hi {storedUser?.name || "User"}
                </span>
              )}
            </button>
            {/*  User Dropdown */}
            {openUser && (
              <div className="absolute top-full right-0 mt-2 font-serif rounded-lg bg-white text-black py-2 px-4 text-sm z-50 w-40">
                {isLoggedIn ? (
                  <>
                    <p className="text-gray-800 mb-2 font-semibold text-base">
                      {storedUser.name}
                    </p>
                    <p className="text-gray-500 text-sm mb-2 truncate">
                      {storedUser.email}
                    </p>
                    <hr className="mb-2" />
                    {/* Show admin dashboard if admin */}
                    {role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setOpenUser(false)}
                        className="block w-full text-left mb-2 text-green-700 hover:text-green-900"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/account/profile"
                      onClick={() => setOpenUser(false)}
                      className="block w-full text-left mb-2 text-gray-700 hover:text-black"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                      }}
                      className="block w-full text-left text-gray-700 hover:text-red-600"
                    >
                      Logout
                    </button>
                    <Link
                      to={"/pages/wishlist"}
                      onClick={() => setOpenUser(false)}
                      className="text-md mt-2 hover:text-gray-600 block w-full text-left"
                    >
                      Wishlist
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/account/register`}
                      onClick={() => setOpenUser(false)}
                      className="text-lg hover:text-gray-600 block w-full text-left"
                    >
                      Register
                    </Link>
                    <Link
                      to={`/account/login`}
                      onClick={() => setOpenUser(false)}
                      className="text-lg mt-1 hover:text-gray-600 block w-full text-left"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            )}
            {openUser && (
              <div
                onClick={() => setOpenUser(false)}
                className="fixed inset-0 cursor-pointer"
              ></div>
            )}
          </div>
          {/* Cart */}

          <button
            onClick={() => setCartOpen(true)}
            className="hidden lg:flex items-center border rounded-full px-4 gap-1"
          >
            <h3 className="text-sm font-serif">My Cart :</h3>
            <span className="text-sm">₹ {subTotal.toLocaleString()}</span>
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black text-white h-screen fixed top-0 left-0 w-3/4 z-50 pt-16 overflow-y-auto">
          <div className="px-4 py-6">
            {/* User Info */}
            {isLoggedIn ? (
              <div className="mb-6 pb-4 border-b border-gray-700">
                <p className="text-lg font-semibold">{storedUser.name}</p>
                <p className="text-gray-400 text-sm truncate">{storedUser.email}</p>
                <div className="flex gap-3 mt-3">
                  <Link
                    to="/account/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm bg-gray-800 px-3 py-1 rounded"
                  >
                    Profile
                  </Link>
                  {role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm bg-green-800 px-3 py-1 rounded"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                    className="text-sm bg-red-800 px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-6 pb-4 border-b border-gray-700">
                <div className="flex gap-3">
                  <Link
                    to={`/account/login`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center bg-gray-800 py-2 rounded"
                  >
                    Login
                  </Link>
                  <Link
                    to={`/account/register`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center bg-gray-800 py-2 rounded"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}

            {/* Mobile Navigation Items */}
            <div className="space-y-1">
              {/* Apartment */}
              <div className="border-b border-gray-700">
                <button
                  onClick={() => toggleMobileSubMenu("apartment")}
                  className="flex justify-between items-center w-full py-3 text-left"
                >
                  <span className="text-lg">Apartment</span>
                  <ChevronDown className={`transition-transform ${mobileSubMenu === "apartment" ? "rotate-180" : ""}`} />
                </button>
                {mobileSubMenu === "apartment" && (
                  <div className="pb-4 pl-4 space-y-3">
                    {/* Farm Villa */}
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Farm Villa</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {apartmentMenu.farmVilla.slice(0, 4).map((item) => (
                          <a key={item} href="#" className="text-gray-400 hover:text-white text-sm">
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                    {/* Luxury Properties */}
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Luxury Properties</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {apartmentMenu.luxuryProperties.slice(0, 4).map((item) => (
                          <a key={item} href="#" className="text-gray-400 hover:text-white text-sm">
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                    {/* Luxury Properties */}
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Luxury Properties</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {apartmentMenu.royalHouse.slice(0, 4).map((item) => (
                          <a key={item} href="#" className="text-gray-400 hover:text-white text-sm">
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Collection */}
              <div className="border-b border-gray-700">
                <button
                  onClick={() => toggleMobileSubMenu("collection")}
                  className="flex justify-between items-center w-full py-3 text-left"
                >
                  <span className="text-lg">Collection</span>
                  <ChevronDown className={`transition-transform ${mobileSubMenu === "collection" ? "rotate-180" : ""}`} />
                </button>
                {mobileSubMenu === "collection" && (
                  <div className="pb-4 pl-4">
                    <div className="grid grid-cols-2 gap-3">
                      {Collection.map((item) => (
                        <Link
                          to={`/collections/${item.link}`}
                          key={item.name}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-center"
                        >
                          <img src={item.image} alt={item.name} className="rounded-lg w-full h-24 object-cover" />
                          <span className="text-sm mt-1 block">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Page */}
              <div className="border-b border-gray-700">
                <button
                  onClick={() => toggleMobileSubMenu("page")}
                  className="flex justify-between items-center w-full py-3 text-left"
                >
                  <span className="text-lg">Page</span>
                  <ChevronDown className={`transition-transform ${mobileSubMenu === "page" ? "rotate-180" : ""}`} />
                </button>
                {mobileSubMenu === "page" && (
                  <div className="pb-4 pl-4 space-y-2">
                    {Pages.map((item) => (
                      <Link
                        key={item.name}
                        to={`/pages/${item.link}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-400 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Blog */}
              <div className="border-b border-gray-700">
                <button
                  onClick={() => toggleMobileSubMenu("blog")}
                  className="flex justify-between items-center w-full py-3 text-left"
                >
                  <span className="text-lg">Blog</span>
                  <ChevronDown className={`transition-transform ${mobileSubMenu === "blog" ? "rotate-180" : ""}`} />
                </button>
                {mobileSubMenu === "blog" && (
                  <div className="pb-4 pl-4 space-y-2">
                    {Blog.map((item) => (
                      <Link
                        key={item.name}
                        to={item.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-400 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency Selector */}
              <div className="border-b border-gray-700 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg">Currency</span>
                  <div className="flex items-center gap-2">
                    <img src={selectedCurrency.image} alt={selectedCurrency.name} className="w-5 h-5" />
                    <span>{selectedCurrency.name}</span>
                    <ChevronDown onClick={() => setIsInrOpen(!isInrOpen)} className="cursor-pointer" />
                  </div>
                </div>
                {isInrOpen && (
                  <div className="mt-3 pl-4 space-y-2">
                    {currency.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          setSelectedCurrency(item);
                          setIsInrOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left"
                      >
                        <img src={item.image} alt={item.name} className="w-5 h-5" />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/pages/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-3 border-b border-gray-700"
              >
                <Heart size={18} />
                <span>Wishlist</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Dropdown Menus */}
      {/* Apartment mega menu */}
      {openMenu === "apartment" && (
        <div
          className="absolute top-full left-0 right-0 bg-white shadow-lg z-40 text-black hidden lg:block"
          onMouseEnter={() => handleMenuEnter("apartment")}
          onMouseLeave={handleMenuLeave}
        >
          <div className="max-w-7xl mx-auto py-4">
            <div className="flex justify-between gap-16">
              {/* Farm villa */}
              <div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">
                  Farm Villa
                </h3>
                <ul className="space-y-2">
                  {apartmentMenu.farmVilla.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-md text-gray-600 hover:text-black"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Luxury property */}
              <div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">
                  Luxury Properties
                </h3>
                <ul className="space-y-2">
                  {apartmentMenu.luxuryProperties.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-md text-gray-600 hover:text-black"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Royal house */}
              <div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">
                  Royal House
                </h3>
                <ul className="space-y-2">
                  {apartmentMenu.royalHouse.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-md text-gray-600 hover:text-black"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Image Column */}
              <div className="w-64 h-auto">
                <img
                  src={ApartmentImage}
                  alt="Featured Apartment"
                  className="rounded-lg object-cover w-96 h-60"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* collection menu */}
      {openMenu === "collection" && (
        <div
          onMouseEnter={() => handleMenuEnter("collection")}
          onMouseLeave={handleMenuLeave}
          className="absolute top-full left-0 right-0 bg-white shadow-lg z-40 text-black hidden lg:block"
        >
          <div className="max-w-7xl mx-auto py-4">
            <div className="flex justify-between gap-8">
              {Collection.map((item) => (
                <Link
                  to={`/collections/${item.link}`}
                  key={item}
                  className="flex flex-col"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-xl"
                  />
                  <h1 className="text-md mt-1 text-center">{item.name}</h1>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div
          className={`fixed top-0 right-0 w-full sm:w-[400px] bg-white text-black h-screen text-sm shadow-xl transition-transform duration-500 z-[999] ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setCartOpen(false)}
            className="absolute right-4 sm:right-8 top-3 text-xl "
          >
            {" "}
            X
          </button>
          <div className="p-4 pt-8">
            <h2 className="text-2xl font-bold mb-4">My Cart</h2>

            {!isLoggedIn && (
              <p className="text-red-400 text-xs">Login to view cart</p>
            )}

            {/* Cart items */}
            <div className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-2">
              {cart.length === 0 && (
                <p className="text-gray-800 text-center py-10 text-xl">
                  No items in cart
                </p>
              )}

              {cart.map((item) => (
                <div
                  key={item.cart_id}
                  className="border border-black p-3 rounded-xl flex gap-3 items-center"
                >
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 gap-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-md text-gray-700 mt-2">
                      Size: {item.size} sq ft
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center justify-between w-28 gap-2 border border-gray-800 px-2 rounded-full  mt-2">
                      <button
                        onClick={() =>
                          updateQty(item.cart_id, item.quantity - 1)
                        }
                        className="px-2 text-lg"
                      >
                        −
                      </button>

                      <span className="font-medium">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQty(item.cart_id, item.quantity + 1)
                        }
                        className="px-2 text-lg"
                      >
                        +
                      </button>
                    </div>

                    <p className="mt-1 font-bold text-green-700">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  {/* Delete */}
                  <button
                    onClick={() => removeItem(item.cart_id)}
                    className="text-red-500 text-md"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total ({cart.length} items)</span>
                <span>₹{subTotal.toLocaleString()}</span>
              </div>

              <Link to="/cart">
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-zinc-800"
                >
                  View Full Cart
                </button>
              </Link>

              <Link to="/checkout">
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full mt-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-[998]"
        ></div>
      )}

      {/* Page menu */}
      {openMenu === "page" && (
        <div
          onMouseEnter={() => handleMenuEnter("page")}
          onMouseLeave={handleMenuLeave}
          className="absolute top-full left-72 bg-white shadow-lg rounded-md z-40 text-black hidden lg:block"
        >
          <div className="flex flex-col gap-1 p-2 cursor-pointer ">
            {Pages.map((item) => (
              <Link to={`/pages/${item.link}`} key={item}>
                <h1 className="text-md mt-1 hover:bg-zinc-200 hover:rounded-md hover:p-1">
                  {item.name}
                </h1>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* blog menu */}
      {openMenu === "blog" && (
        <div
          onMouseEnter={() => handleMenuEnter("blog")}
          onMouseLeave={handleMenuLeave}
          className="absolute top-full left-96 bg-white shadow-lg rounded-md z-40 text-black hidden lg:block"
        >
          <div className="flex flex-col gap-1 p-2 cursor-pointer ">
            {Blog.map((item) => (
              <Link to={`${item.link}`} key={item}>
                <h1 className="text-md mt-1 hover:bg-zinc-200 hover:rounded-md hover:p-1">
                  {item.name}
                </h1>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}
    </div>
  );
};

export default Navbar;