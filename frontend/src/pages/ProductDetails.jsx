import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MoveLeft,
  MoveRight,
  LocateFixed,
  RefreshCcw,
  Heart,
  Share2,
  Scissors,
  Minus,
  Plus,
  CheckCheck,
  User,
} from "lucide-react";
import PropertyCardFlex from "../components/PropertyCardFlex";
import ShopPro from "../assets/homepage/shop-pro.webp";
import { fetchProperties } from "../api/propertyApi";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ProductDetails = () => {
  const { productId } = useParams();
  const [property, setProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  //state for review
  const [writeReview, setWriteReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [titleCharCount, setTitleCharCount] = useState(100);
  const [reviewTitle, setReviewTitle] = useState("");
  const [commentCharCount, setCommentCharCount] = useState(5000);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [review, setReview] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [currentIndexOfFlexCard, setCurrentIndexOfFlexCard] = useState(0);

  const [filter, setFilter] = useState("most-recent");

  const slugify = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // FETCH PROPERTY
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        const found = data.properties.find(
          (p) => slugify(p.title) === productId
        );
        if (found) {
          setProperty(found);
          setSelectedSize(found.size_sqft[0]); // default first size
        }
      });
  }, [productId]);

  //fetxh property for images section
  useEffect(() => {
    fetchProperties().then((data) => {
      // You can use the fetched data here if needed
      setProperties(data);
    });
  }, []);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property_id: property.id,
          size: selectedSize,
          quantity: quantity,
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

  //function of wishlist
  const toggleWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required.");
      return;
    }

    if (!isInWishlist) {
      // Add to wishlist
      const res = await fetch("http://localhost:5000/api/wishlist", {
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
  };

  // FUNCTION OF REVIEWAS
  //update title char count
  useEffect(() => {
    setTitleCharCount(100 - reviewTitle.length);
  }, [reviewTitle]);

  const handleTitleChange = (e) => {
    setReviewTitle(e.target.value);
  };

  //update comment char count
  useEffect(() => {
    setCommentCharCount(5000 - comment.length);
  }, [comment]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  //handle image upload
  const handleImageupload = (e) => {
    const files = Array.from(e.target.files);

    //limit to uplaod max 5 image
    if (images.length + files.length > 5) {
      alert("you can only upload up to 5 images");
      return;
    }

    const newImage = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImage]);
  };

  //handle remove image
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  //handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  //add sorting function
  const sortReviews = (review, filterType) => {
    switch (filterType) {
      case "highest-rating":
        return [...review].sort((a, b) => b.rating - a.rating);
      case "lowest-rating":
        return [...review].sort((a, b) => a.rating - b.rating);
      case "most-helpful":
        return [...review].sort((a, b) => b.helpful - a.helpful);
      case "piture-first":
        return [...review].sort((a, b) => b.images.length - a.images.length);
      case "picture-only":
        return [...review].filter((r) => r.images.length > 0);
      case "most-recent":
      default:
        return review.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };

  //handle submit review
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating before submitting the review");
      return;
    }
    const newReview = {
      name: name,
      date: new Date().toDateString(),
      rating: rating,
      title: reviewTitle,
      comment: comment,
    };

    const updatedReview = [...review, newReview];
    setReview(updatedReview);

    //saved in localstorage
    localStorage.setItem("reviews", JSON.stringify(updatedReview));

    setSubmitted(true); //show submmited message
    setWriteReview(false); //close write review
    setName("");
    setRating(0);
    setReviewTitle("");
    setComment("");
    setImages([]);
  };

  //get sorted review
  const sortedReviews = sortReviews(review, filter);

  //cehck property is in wislist if not
  useEffect(() => {
    if (!property || !property.id) return;
    const checkWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsInWishlist(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/api/wishlist/check/${property.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setIsInWishlist(Boolean(data.inWishlist));
        }
      } catch (err) {
        console.error("Failed to check wishlist status:", err);
        setIsInWishlist(false);
      }
    };

    checkWishlist();
  });

  if (!property) {
    return <div>Loading...</div>;
  }

  const currentImage =
    property.images_by_size?.[selectedSize] || property.image;

  return (
    <div className="min-h-screen text-white px-4 sm:px-6 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* LEFT SECTION */}
        <div>
          {/* Back button + Wishlist */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <Link
              to="/collections"
              className="flex items-center gap-2 text-white hover:underline text-sm sm:text-base"
            >
              <ArrowLeft size={20} /> Back to category
            </Link>

            <button
              onClick={toggleWishlist}
              className="flex items-center gap-2 text-white hover:underline"
            >
              {isInWishlist ? (
                <Heart fill="red" size={16} />
              ) : (
                <Heart size={16} />
              )}
            </button>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {property.title}
          </h1>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
            {property.description}
          </p>

          {/* SIZE SELECTOR */}
          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg mb-2 font-semibold">
              Size: {selectedSize} sq ft
            </p>

            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {property.size_sqft.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm ${
                    selectedSize === size
                      ? "bg-white text-black"
                      : "border-gray-400 hover:bg-white hover:text-black"
                  }`}
                >
                  {size} sq ft
                </button>
              ))}
            </div>
          </div>

          {/* Sizing Guide + Share */}
          <div className="flex items-center gap-4 sm:gap-6 text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
            <button className="flex items-center gap-2 hover:text-white">
              <Scissors size={16} className="sm:w-4 sm:h-4" /> See Sizing Guide
            </button>

            <button className="flex items-center gap-2 hover:text-white">
              <Share2 size={16} className="sm:w-4 sm:h-4" /> Share
            </button>
          </div>

          {/* PRICE + QUANTITY */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
            {/* Quantity */}
            <div className="flex items-center gap-4 bg-transparent border px-4 py-2 rounded-full w-fit sm:w-auto">
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Minus size={18} />
              </button>
              <span className="font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <Plus size={18} />
              </button>
            </div>

            {/* Price */}
            <p className="text-xl sm:text-2xl font-semibold text-green-400">
              Rs. {property.price.toLocaleString()}
            </p>
          </div>

          {/* ADD TO CART / BUY NOW */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              onClick={addToCart}
              className="flex-1 py-3 sm:py-4 text-black bg-[#ffe7d9] rounded-full font-semibold hover:bg-white transition text-sm sm:text-base"
            >
              Add to Cart →
            </button>

            <button className="flex-1 py-3 sm:py-4 border border-white rounded-full font-semibold hover:bg-white hover:text-black transition text-sm sm:text-base">
              Buy it now
            </button>
          </div>
        </div>

        {/* RIGHT SECTION — IMAGE */}
        <div className="flex flex-col items-center order-first lg:order-last">
          <img
            src={`http://localhost:5000/uploads/${currentImage}`}
            className="rounded-xl w-full h-64 sm:h-80 md:h-96 lg:h-[420px] object-cover shadow-lg"
          />

          {/* Slider Dots */}
          <div className="flex gap-3 mt-4">
            {property.size_sqft.map((size, i) => (
              <button
                key={i}
                onClick={() => setSelectedSize(size)}
                className={`w-3 h-3 rounded-full ${
                  selectedSize === size ? "bg-white" : "bg-gray-500"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
      {/* images sections */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4 mt-12 sm:mt-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-6 sm:mb-8 px-4 sm:px-0">
          Recently Viewed Products
        </h2>
        <div className="flex overflow-x-auto gap-4 sm:gap-8 px-4 sm:px-0 pb-4">
          {properties.slice(0, 4).map((prop) => (
            <div
              key={prop.id}
              className="flex flex-col w-64 sm:w-full min-w-[250px] sm:min-w-0 items-center gap-2 border-2 border-white rounded-xl hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                key={prop.id}
                src={`http://localhost:5000/uploads/${prop.image}`}
                alt={prop.title}
                className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-xl"
              />
              <p className="text-base sm:text-xl truncate pl-2 font-semibold self-start font-serif">
                {prop.title}
              </p>
              <p className="text-base sm:text-xl font-mono pl-2 self-start">
                Rs.{prop.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* review rating section */}
      <div className="relative mx-2 sm:mx-4 md:mx-8 lg:mx-12 mb-12 sm:mb-16 md:mb-20 lg:mb-28 mt-8 sm:mt-12 lg:mt-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center px-4 sm:px-0">
          <div className="flex flex-col items-center justify-center font-poppins py-4 sm:py-8">
            <div className="flex gap-1">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
            </div>
            <p className="flex gap-1 text-xs sm:text-sm text-gray-500 text-center">
              Be the first to review to review this property
            </p>
          </div>
          <div className="hidden sm:block h-24 w-px bg-gray-300 mx-8 sm:mx-12 md:mx-20 lg:mx-28" />

          {!submitted ? (
            <button
              onClick={() => setWriteReview(!writeReview)}
              className="font-poppins bg-white hover:bg-zinc-100 text-black rounded-full font-serif px-6 sm:px-12 py-2 text-sm sm:text-base"
            >
              {writeReview ? "Cancel Review" : "Write a Review"}
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="font-poppins bg-black hover:bg-zinc-900 text-white px-6 sm:px-12 py-2 text-sm sm:text-base"
            >
              Refresh Page
            </button>
          )}
        </div>

        {/* if user click on write review */}
        {writeReview && !submitted && (
          <form
            onSubmit={handleSubmitReview}
            className="flex flex-col items-center justify-center gap-4 my-6 mb-12 border-t bg-white border-gray-300 text-sm text-gray-500 font-poppins max-w-3xl mx-auto pb-8 px-4 sm:px-0"
          >
            <h1 className="text-xl sm:text-2xl text-gray-600 font-bold font-poppins mt-4">
              Write a review
            </h1>
            <p className="text-sm text-gray-500">Rating</p>
            {/* rating star */}
            <div id="rating" required className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className="cursor-pointer"
                >
                  {star <= rating ? (
                    <IoStar size={20} sm:size={24} className="text-yellow-500" />
                  ) : (
                    <IoStarOutline size={20} sm:size={24} className="text-gray-500 " />
                  )}
                </span>
              ))}
            </div>
            <label className="mt-4 text-sm sm:text-base">
              Review Title (<span id="titleCharCount">{titleCharCount}</span>)
            </label>
            <input
              type="text"
              id="title"
              className="border border-gray-400 px-4 py-2 w-full sm:w-3/4 md:w-1/2"
              placeholder="Give your review a title"
              maxLength={100}
              value={reviewTitle}
              onChange={handleTitleChange}
            />

            <label className="mt-4 text-sm sm:text-base">
              Review (<span>{commentCharCount}</span>)
            </label>
            <textarea
              type="text"
              id="review"
              rows={4}
              className="border border-gray-400 px-4 py-2 w-full sm:w-3/4 md:w-1/2"
              placeholder="Write your comments here.."
              maxLength={5000}
              value={comment}
              onChange={handleCommentChange}
              required
            />
            {/* image upload */}
            <label className="mt-4 text-sm sm:text-base">Picture/Video (optional)</label>
            <div className="flex gap-3 overflow-x-auto w-full sm:w-auto px-2">
              {images.length < 5 && (
                <label className="w-24 h-24 sm:w-32 sm:h-32 group border border-gray-300 hover:border-zinc-300 flex items-center justify-center cursor-pointer flex-shrink-0">
                  <FaCloudUploadAlt
                    size={40} sm:size={60}
                    className="text-gray-500 group-hover:scale-110 group-hover:text-blue-500 transition-transform duration-500"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImageupload}
                  />
                </label>
              )}
              {/* preview images */}
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                  <img
                    src={image.preview}
                    alt="preview"
                    className="w-full h-full object-cover border border-gray-300"
                  />
                  <button>
                    <MdDeleteForever
                      size={16}
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 cursor-pointer w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 rounded-full text-red-600 hover:bg-black hover:text-white shadow-md transition-colors duration-300"
                      onClick={() => handleRemoveImage(index)}
                    />
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm sm:text-base px-4 text-center">
              Name (displayed publicly like{" "}
              <span className="text-black">
                <select className="text-sm">
                  <option value="most-recent">John Smith</option>
                  <option value="last_initial">John S.</option>
                  <option value="only_name">John</option>
                  <option value="all_initial">J. S.</option>
                  <option value="annonymous">Anonymous</option>
                </select>
              </span>
              )
            </p>
            {/* name */}
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 px-4 py-2 w-full sm:w-3/4 md:w-1/2"
              placeholder="Enter your name ( publicly displayed )"
              required
            />
            <label className="mt-4 text-sm sm:text-base">Email</label>
            <input
              type="email"
              className="border border-gray-400 px-4 py-2 w-full sm:w-3/4 md:w-1/2"
              placeholder="Enter your email ( will not be published )"
              required
            />
            <p className="mt-4 w-full sm:w-3/4 md:w-1/2 text-center text-xs sm:text-sm md:text-md px-2">
              How we use your data: We'll only contact you about the review you
              left, and only if necessary. By submitting your review, you agree
              to Judge.me's{" "}
              <span className="text-black cursor-pointer">terms</span>,{" "}
              <span className="text-black cursor-pointer">privacy</span> and{" "}
              <span className="text-black cursor-pointer">content </span>
              policies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-sm sm:text-base w-full sm:w-auto px-4 sm:px-0">
              <button
                onClick={() => setWriteReview(false)}
                className="font-poppins bg-white hover:bg-gradient-to-br from-white to-red-200 border border-black text-black px-6 sm:px-12 py-2 w-full sm:w-auto"
              >
                cancel Review
              </button>
              <button
                type="submit"
                className="font-poppins bg-black hover:bg-zinc-900 text-white px-6 sm:px-12 py-2 w-full sm:w-auto"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}

        {/* if summit show this message */}
        {submitted && (
          <div className="flex flex-col items-center justify-center gap-4 my-6 mb-12 text-gray-500 font-poppins px-4 sm:px-0">
            <CheckCheck size={28} sm:size={36} className="rounded-full text-green-600 " />
            <h1 className="text-xl sm:text-2xl text-green-600 font-semibold text-center">
              Review submitted successfully!
            </h1>
            <p className="text-center">Thank you! for your review.</p>
          </div>
        )}

        {/* filter selector */}
        <div className="border-y text-black border-gray-400 px-4 sm:px-0">
          <select onChange={handleFilterChange} value={filter} className="my-4 w-full sm:w-auto">
            <option value="most-recent">Most Recent</option>
            <option value="highest-rating">Highest Rating</option>
            <option value="lowest-rating">Lowest Rating</option>
            <option value="only-pictures">Only Pictures</option>
            <option value="pictures-first">Pictures First</option>
            <option value="most-helpful">Most Helpful</option>
          </select>
        </div>

        {/* show all comment here */}
        {sortedReviews.map((rev, index) => (
          <div key={index} className="my-4 px-4 sm:px-0">
            <div className="flex justify-between my-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) =>
                  star <= rev.rating ? (
                    <IoStar size={14} sm:size={16} className="text-yellow-400" />
                  ) : (
                    <IoStarOutline size={14} sm:size={16} className="text-gray-400" />
                  )
                )}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{rev.date}</div>
            </div>

            <div className="flex flex-col gap-3 my-2 font-poppins text-gray-500">
              <div className="flex gap-2">
                <User className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 text-black" />
                <p className="text-sm sm:text-md ">Name: {rev.name}</p>
              </div>
              <p className="text-gray-200 text-sm sm:text-base">Title : {rev.title}</p>
              <p className="text-sm sm:text-md">Comment: {rev.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/*Other section of property */}
      <div className="flex flex-col mt-8 sm:mt-12 gap-6 sm:gap-8 px-4 sm:px-0">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center lg:text-left">
            Open the door for aspacious living
          </h1>
          <p className="mt-0 lg:mt-12 bg-[#172229] p-4 rounded-md z-10 text-sm sm:text-base">
            Indulge in the ultimate coastal lifestyle with our contemporary
            beachfront properties. Immerse yourself in the soothing sounds of
            the ocean and bask in the warm embrace of the sun, just steps away
            from your doorstep.
          </p>
        </div>
        <img src={ShopPro} alt="big image is here" className="-mt-8 lg:-mt-16 w-full" />
      </div>
      {/* Horizonal property card  */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 -mt-8 lg:-mt-20 max-w-7xl mx-auto px-4 sm:px-0">
        {/* flex card style card */}
        <div className="w-full order-2 lg:order-1">
          {properties
            .slice(currentIndexOfFlexCard, currentIndexOfFlexCard + 1)
            .map((property) => (
              <PropertyCardFlex key={property.id} property={property} />
            ))}
          {/* Slider Navigation Controls */}
          <div className="flex items-center justify-between mt-6 lg:mt-8">
            <button
              onClick={() =>
                setCurrentIndexOfFlexCard(
                  (prev) => (prev - 1 + properties.length) % properties.length
                )
              }
              className="px-3 sm:px-4 py-2 rounded-full border border-gray-600 text-gray-400 transition-colors hover:bg-white hover:text-black"
              aria-label="Previous slide"
              disabled={properties.length <= 1}
            >
              <MoveLeft size={18} sm:size={20} />
            </button>

            {/* Decorative line */}
            <div className="flex-grow w-full h-px bg-gray-400 mx-3 sm:mx-4"></div>

            <button
              onClick={() =>
                setCurrentIndexOfFlexCard(
                  (prev) => (prev + 1) % properties.length
                )
              }
              className="py-2 px-3 sm:px-4 rounded-full border border-gray-600 text-gray-400 transition-colors hover:bg-white hover:text-black"
              aria-label="Next slide"
              disabled={properties.length <= 1}
            >
              <MoveRight size={18} sm:size={20} />
            </button>
          </div>
        </div>
        <p className="mt-0 lg:mt-12 bg-[#172229] p-4 rounded-md z-10 text-sm sm:text-base order-1 lg:order-2">
          Experience the epitome of luxury and leisure in our resort-style
          private estates. Set within lush landscaped grounds, these exclusive
          properties offer a wealth of amenities to indulge your every desire.
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;