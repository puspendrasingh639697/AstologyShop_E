import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { trendingProducts } from "../data/trendingProducts";

const ProductCard = ({ product }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    setImageIndex(
      (prev) => (prev + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setImageIndex(
      (prev) =>
        prev === 0
          ? product.images.length - 1
          : prev - 1
    );
  };

  return (
    <div>
      {/* IMAGE CARD */}
      <div className="relative group overflow-hidden rounded-lg">

        {/* Discount Badge */}
        <div className="absolute top-0 left-0 z-20 bg-[#d9534f] text-white px-4 py-1 text-[15px] font-semibold">
          🏷 {product.discount} Off
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            z-20
            w-10
            h-10
            rounded-full
            bg-white/95
            shadow-md
            flex
            items-center
            justify-center
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-300
          "
        >
          <FaChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            z-20
            w-10
            h-10
            rounded-full
            bg-white/95
            shadow-md
            flex
            items-center
            justify-center
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-300
          "
        >
          <FaChevronRight />
        </button>

        {/* Product Image */}
        <img
          src={product.images[imageIndex]}
          alt={product.title}
          className="
          
  w-full
  aspect-square
  object-cover
  rounded-lg
  transition-all
  duration-500
  group-hover:scale-[1.02]
"
        />
      </div>

      {/* Product Title */}
      <h3
        className="
          mt-3
          text-[17px]
          font-semibold
          text-[#16233d]
        "
      >
        {product.title}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-1 text-[#d9534f] text-sm">
        ★★★★★
        <span className="text-gray-600 ml-1">(1)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mt-2">
        <span className="text-[18px] font-bold text-[#16233d]">
          ₹ {product.price}
        </span>

        <span className="text-gray-500 line-through text-[16px]">
          ₹ {product.oldPrice}
        </span>
      </div>
    </div>
  );
};

const LatestTrending = () => {
  return (
    <section className="bg-[#fff3df] pt-0 pb-10">
      <div className="max-w-[1340px] mx-auto px-4">

        {/* Heading */}
       <h2
    className="
      text-[28px]
      font-bold
      text-[#16233d]
          pb-[20px]

    "
  >
    Latest & Trending
  </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {[
    ...trendingProducts,
    ...trendingProducts,
    ...trendingProducts,
  ].map((product, index) => (
    <ProductCard
      key={index}
      product={product}
    />
  ))}
</div>
       

      </div>
    </section>
  );
};

export default LatestTrending;