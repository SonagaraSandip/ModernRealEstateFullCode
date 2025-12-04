import { useState, useEffect, Fragment } from "react";
import PropertyCard from "../components/PropertryCard";
import PropertyCardFlex from "../components/PropertyCardFlex";
import { fetchProperties } from "../api/propertyApi";
import Slider from "../assets/homepage/slider.webp";
import { MoveRight, MoveLeft, LocateFixed } from "lucide-react";
import Door from "../assets/homepage/cat-img.webp";
import Cat1 from "../assets/homepage/cat-1.avif";
import Cat2 from "../assets/homepage/cat-2.avif";
import Map from "../assets/homepage/map.webp";
import ShopPro from "../assets/homepage/shop-pro.webp";
import ModernHouse from "../assets/homepage/modern-houses.webp";
import Subscribe from "../assets/homepage/subscribe-img.webp";

const slideData = [
  {
    id: 1,
    image: Slider,
    location: "Utica, Pennsylvania 57867",
    title: "Eco-Friendly Homes for Modern Living",
    description:
      "Experience a harmonious balance between sustainable living and modern comfort in our eco-friendly homes. Designed with a commitment to environmental consciousness.",
  },
  {
    id: 2,
    image: Slider,
    location: "Springfield, Illinois 62704",
    title: "Luxurious Loft in the Heart of the City",
    description:
      "Embrace a serene lifestyle surrounded by lush green spaces, community gardens, and tranquil water features. From the organic architecture to the eco-friendly materials.",
  },
  {
    id: 3,
    image: Slider,
    location: "Austin, Texas 78701",
    title: "Contemporary Suburban Retreat",
    description:
      "Discover the perfect blend of urban convenience and natural tranquility. Our residences seamlessly integrate energy-efficient features for a sustainable future.",
  },
];

const catData = [
  {
    id: 1,
    image: Cat1,
    name: "Properties",
  },
  {
    id: 2,
    image: Cat2,
    name: "Farm Villa",
  },
  {
    id: 3,
    image: Cat1,
    name: "Royal House",
  },
  {
    id: 4,
    image: Cat2,
    name: "Best Sellers",
  },
];

const category = ["All", "villa", "Royalhouse", "bunglows"];

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexofCat, setCurrentIndexofCat] = useState(0);
  const [currentIndexOfProperty, setCurrentIndexOfProperty] = useState(0);
  const [currentIndexOfFilter, setCurrentIndexOfFilter] = useState(0);
  const [currentIndexOfFlexCard, setCurrentIndexOfFlexCard] = useState(0);
  const [currentIndexOfSingleCard, setCurrentIndexOfSingleCard] = useState(0);
  const [selectCategory, setSelectCategory] = useState("All");

  const currentSlide = slideData[currentIndex];
  // Create an array of the visible categories (1 on mobile, 3 on desktop)
  const visibleCategories = [
    catData[currentIndexofCat],
    catData[(currentIndexofCat + 1) % catData.length],
    catData[(currentIndexofCat + 2) % catData.length],
  ];

  useEffect(() => {
    const getData = async () => {
      const data = await fetchProperties();
      setProperties(data);
    };
    getData();
  }, []);

  //Slider function
  const goToPreviousSlide = () => {
    // if at the first slider , wrap around to the last
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slideData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const isLastSlide = currentIndex === slideData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  //Catdata function slider
  const goToPreviousSlideOfCat = () => {
    // if at the first slider , wrap around to the last
    const isFirstSlide = currentIndexofCat === 0;
    const newIndex = isFirstSlide ? catData.length - 1 : currentIndexofCat - 1;
    setCurrentIndexofCat(newIndex);
  };

  const goToNextSlideOfCat = () => {
    const isLastSlide = currentIndexofCat === catData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndexofCat + 1;
    setCurrentIndexofCat(newIndex);
  };

  //filter category properties
  const filterProperties = properties.filter((property) => {
    if (selectCategory === "All") {
      return true;
    }
    return property.type === selectCategory;
  });
  
  return (
    <div className="text-white px-4 sm:px-6 lg:px-0">
      {/* Slider */}
      <div className="flex flex-col lg:flex-row text-white">
        <div className="w-full lg:w-[60%]">
          <img
            src={currentSlide.image}
            alt=""
            className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover"
          />
        </div>
        {/* right side */}
        <div className="flex flex-col items-start justify-center w-full lg:w-[40%] gap-4 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-24 py-8 lg:py-0">
          <div className="flex items-center gap-2 mb-2 sm:mb-4">
            <LocateFixed size={16} />
            <h1 className="text-xs sm:text-sm font-medium tracking-wide uppercase text-gray-400">
              {currentSlide.location}
            </h1>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">
            {currentSlide.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            {currentSlide.description}
          </p>
          <button className="flex items-center justify-center gap-2 rounded-full bg-white text-black px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold w-fit transition-transform hover:scale-105 mb-8 sm:mb-12">
            <span>Show full details</span>
            <MoveRight size={14} sm:size={16} />
          </button>

          {/* Slider Navigation Controls */}
          <div className="flex items-center justify-between w-full">
            <button
              onClick={goToPreviousSlide}
              className="px-3 sm:px-4 py-2 rounded-full border border-gray-600 text-gray-400 transition-colors hover:bg-white hover:text-black"
              aria-label="Previous slide"
            >
              <MoveLeft size={18} sm:size={20} />
            </button>

            {/* Decorative line */}
            <div className="flex-grow w-full h-px bg-gray-400 mx-2 sm:mx-4"></div>

            <button
              onClick={goToNextSlide}
              className="py-2 px-3 sm:px-4 rounded-full border border-gray-600 text-gray-400 transition-colors hover:bg-white hover:text-black"
              aria-label="Next slide"
            >
              <MoveRight size={18} sm:size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* large text with 3 image slider*/}
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 -mt-8 sm:-mt-12 lg:-mt-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-serif leading-tight">
          Contemporary
          <br />
          Beachfront Properties
        </h1>
        <div className="flex flex-col lg:flex-row mt-6 sm:mt-8 gap-6 sm:gap-8">
          <div className="flex flex-col gap-3 sm:gap-4 lg:w-1/2">
            <p className="text-sm sm:text-base">
              From the organic architecture to the use of eco-friendly
              materials, these homes provide a sanctuary where you can live in
              harmony with nature without compromising on luxury or style.
            </p>
            <div className="mt-4 sm:mt-6">
              <div className="flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto pb-4 lg:overflow-visible">
                {visibleCategories.map((category, index) => (
                  <Fragment key={index}>
                    <div className="flex flex-col items-start gap-3 sm:gap-4 w-40 sm:w-48 flex-shrink-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
                      />
                      <div className="flex items-center w-full justify-between">
                        <h3 className="text-base sm:text-lg font-semibold">
                          {category.name}
                        </h3>
                        <span>
                          <MoveRight
                            size={20} sm:size={24}
                            fill="#fff"
                            className="font-bold"
                          />
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
              {/* Slider Navigation Controls */}
              <div className="flex items-center justify-between w-full mt-4 sm:mt-8">
                <button
                  onClick={goToPreviousSlideOfCat}
                  className="px-3 sm:px-4 py-2 rounded-full border border-gray-600 text-gray-400 transition-colors hover:bg-white hover:text-black"
                  aria-label="Previous slide"
                >
                  <MoveLeft size={18} sm:size={20} />
                </button>

                {/* Decorative line */}
                <div className="flex-grow w-full h-px bg-gray-400 mx-2 sm:mx-4"></div>

                <button
                  onClick={goToNextSlideOfCat}
                  className="py-2 px-3 sm:px-4 rounded-full border border-gray-600 text-gray-400 transition-colors hover:bg-white hover:text-black"
                  aria-label="Next slide"
                >
                  <MoveRight size={18} sm:size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 lg:w-1/2">
            <img
              src={Door}
              alt="cat-door"
              className="h-48 sm:h-64 md:h-72 lg:h-full w-full object-cover rounded-lg"
            />
            <p className="text-sm sm:text-base">
              Immerse yourself in a welcoming community with top-rated schools,
              parks, and recreational facilities just moments away. Create
              lasting memories as you enjoy the comfort, convenience, and
              tranquility that these modern family homes offer.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-[#ab7d65] h-48 sm:h-64 md:h-80 lg:h-screen -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-96 -z-10" />
      
      {/* Find your home place */}
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 -mt-32 sm:-mt-40 md:-mt-48 lg:-mt-80">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif whitespace-normal sm:whitespace-nowrap">
            Find your home place
          </h1>
          <div className="w-full h-px bg-white mt-2 sm:mt-0"></div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mt-6 sm:mt-8">
          <div className="flex flex-col gap-6 sm:gap-8 lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
              {properties.length > 0 ? (
                properties
                  .slice(currentIndexOfProperty, currentIndexOfProperty + 2)
                  .map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))
              ) : (
                <p className="text-xl sm:text-2xl md:text-3xl font-serif mt-6 text-gray-300 text-center col-span-full">
                  No properties found
                </p>
              )}
            </div>
            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() =>
                  setCurrentIndexOfProperty(
                    (prev) => (prev - 2 + properties.length) % properties.length
                  )
                }
                className="px-3 sm:px-4 py-2 rounded-full border border-gray-600 text-gray-400 transition-colors hover:bg-white hover:text-black"
                aria-label="Previous slide"
              >
                <MoveLeft size={18} sm:size={20} />
              </button>

              {/* Decorative line */}
              <div className="flex-grow w-full h-px bg-gray-400 mx-2 sm:mx-4"></div>

              <button
                onClick={() =>
                  setCurrentIndexOfProperty(
                    (prev) => (prev + 2) % properties.length
                  )
                }
                className="py-2 px-3 sm:px-4 rounded-full border border-gray-600 text-gray-400 transition-colors hover:bg-white hover:text-black"
                aria-label="Next slide"
              >
                <MoveRight size={18} sm:size={20} />
              </button>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2">
            <img
              src={Map}
              alt="map"
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
      
      {/* Open the door for aspacious living */}
      <div className="flex flex-col mt-8 sm:mt-12 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-16 max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif whitespace-normal sm:whitespace-nowrap">
            Open the door for aspacious living
          </h1>
          <p className="mt-0 lg:mt-12 bg-[#172229] p-3 sm:p-4 rounded-md z-10 text-sm sm:text-base">
            Indulge in the ultimate coastal lifestyle with our contemporary
            beachfront properties. Immerse yourself in the soothing sounds of
            the ocean and bask in the warm embrace of the sun, just steps away
            from your doorstep.
          </p>
        </div>
        <img src={ShopPro} alt="big image is here" className="-mt-8 lg:-mt-16 w-full" />
      </div>
      
      {/* Horizonal property card */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 -mt-8 lg:-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* flex card style card */}
        <div className="w-full lg:w-2/3">
          {properties
            .slice(currentIndexOfFlexCard, currentIndexOfFlexCard + 1)
            .map((property) => (
              <PropertyCardFlex key={property.id} property={property} />
            ))}
          {/* Slider Navigation Controls */}
          <div className="flex items-center justify-between mt-4 sm:mt-6 lg:mt-8">
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
            <div className="flex-grow w-full h-px bg-gray-400 mx-2 sm:mx-4"></div>

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
        <p className="mt-4 sm:mt-6 lg:mt-12 bg-[#172229] p-3 sm:p-4 rounded-md z-10 text-sm sm:text-base">
          Experience the epitome of luxury and leisure in our resort-style
          private estates. Set within lush landscaped grounds, these exclusive
          properties offer a wealth of amenities to indulge your every desire.
        </p>
      </div>
      
      {/* Luxurious properties */}
      <div className="flex flex-col mt-6 sm:mt-8 gap-3 sm:gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif whitespace-normal sm:whitespace-nowrap">
          Luxurious properties
        </h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {category.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectCategory(category)}
              className={`font-serif text-sm sm:text-base lg:text-lg border px-3 sm:px-4 py-1 sm:py-1.5 rounded-md hover:bg-gray-600 ${
                selectCategory === category ? "bg-gray-600" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="h-px w-full bg-white" />
      </div>
      
      {/* filtred property card show here */}
      <div className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 px-4 sm:px-6 lg:px-0 pb-4">
        {filterProperties.length > 0 ? (
          filterProperties
            .slice(currentIndexOfFilter, currentIndexOfFilter + 5)
            .map((property) => (
              <div key={property.id} className="flex-shrink-0 w-64 sm:w-72 md:w-80">
                <PropertyCard property={property} />
              </div>
            ))
        ) : (
          <p className="text-xl sm:text-2xl md:text-3xl font-serif mt-6 text-gray-300 text-center w-full">
            No properties found
          </p>
        )}
      </div>
      
      {/* Slider Navigation Controls */}
      <div className="flex items-center justify-between max-w-7xl mx-auto mt-4 sm:mt-6 lg:mt-8 px-4 sm:px-6 lg:px-0">
        <button
          onClick={() =>
            setCurrentIndexOfFilter(
              (prev) =>
                (prev - 2 + filterProperties.length) % filterProperties.length
            )
          }
          className="px-3 sm:px-4 py-2 rounded-full border border-gray-600 text-gray-400 transition-colors hover:bg-white hover:text-black"
          aria-label="Previous slide"
          disabled={filterProperties.length <= 5}
        >
          <MoveLeft size={18} sm:size={20} />
        </button>

        {/* Decorative line */}
        <div className="flex-grow w-full h-px bg-gray-400 mx-2 sm:mx-4"></div>

        <button
          onClick={() =>
            setCurrentIndexOfFilter(
              (prev) => (prev + 2) % filterProperties.length
            )
          }
          className="py-2 px-3 sm:px-4 rounded-full border border-gray-600 text-gray-400 transition-colors hover:bg-white hover:text-black"
          aria-label="Next slide"
          disabled={filterProperties.length <= 5}
        >
          <MoveRight size={18} sm:size={20} />
        </button>
      </div>

      {/* Modern house image and text */}
      <div className="bg-[#ab7d65] h-auto lg:h-screen mt-8 lg:mt-28">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mt-6 lg:mt-28 w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
          <div className="w-full lg:w-[75%]">
            <img
              src={ModernHouse}
              alt="ModernHouse"
              className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="w-full lg:w-[25%] mt-6 lg:mt-0 lg:mr-8 xl:mr-20">
            <p className="font-serif text-sm sm:text-base">
              Experience the epitome of luxury and leisure in our resort-style
              private estates. Set within lush landscaped grounds, these
              exclusive properties offer a wealth of amenities to indulge your
              every desire.
            </p>
            <div className="w-full mt-6 sm:mt-8 lg:mt-20">
              {properties
                .slice(currentIndexOfSingleCard, currentIndexOfSingleCard + 1)
                .map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-between mt-4 sm:mt-6 lg:mt-8">
              <button
                onClick={() =>
                  setCurrentIndexOfSingleCard(
                    (prev) => (prev - 1 + properties.length) % properties.length
                  )
                }
                className="px-3 sm:px-4 py-2 rounded-full border border-gray-600 bg-[#172229] text-white transition-colors duration-300 hover:bg-white hover:text-black"
                aria-label="Previous slide"
              >
                <MoveLeft size={18} sm:size={20} />
              </button>

              {/* Decorative line */}
              <div className="flex-grow w-full h-px bg-gray-200 mx-2 sm:mx-4"></div>

              <button
                onClick={() =>
                  setCurrentIndexOfSingleCard(
                    (prev) => (prev + 1) % properties.length
                  )
                }
                className="py-2 px-3 sm:px-4 rounded-full border border-gray-600 bg-[#172229] hover:bg-white hover:text-black text-white transition-colors duration-300"
                aria-label="Next slide"
              >
                <MoveRight size={18} sm:size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* find your ideal space */}
      <div className="flex flex-col mt-8 sm:mt-12 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-16 max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif whitespace-normal sm:whitespace-nowrap">
            Find your ideal space
          </h1>
          <p className="mt-0 lg:mt-12 bg-[#172229] z-10 p-3 sm:p-4 rounded-md text-sm sm:text-base">
            Welcome to the epitome of modern living in our tech-integrated
            homes. Seamlessly blending cutting-edge technology with elegant
            design, these residences are equipped with state-of-the-art smart
            home systems that enhance convenience, security, and energy
            efficiency.
          </p>
        </div>
        <img
          src={Subscribe}
          alt="big image is here"
          className="-mt-6 lg:-mt-16 w-full"
        />
        <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 flex items-end justify-end self-end -mt-12 lg:-mt-20 bg-[#172229] p-3 sm:p-4 rounded-md text-sm sm:text-base">
          Welcome to the epitome of modern living in our tech-integrated homes.
          Seamlessly blending cutting-edge technology with elegant design, these
          residences are equipped with state-of-the-art smart home systems that
          enhance convenience, security, and energy efficiency.
        </p>
      </div>
    </div>
  );
};

export default Home;