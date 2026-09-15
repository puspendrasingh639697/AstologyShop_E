import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";

export default function ProductCard({ product }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage(
      (prev) => (prev + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) =>
        prev === 0
          ? product.images.length - 1
          : prev - 1
    );
  };

  return (
    <div className="group">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-xl">

        {/* Discount Badge */}
        <div className="absolute top-0 left-0 bg-[#d64045] text-white text-sm font-semibold px-3 py-1 z-20">
          {product.discount}
        </div>

        <img
          src={product.images[currentImage]}
          alt={product.title}
          className="w-full h-[300px] md:h-[330px] object-cover transition-transform duration-500"
        />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            bg-white w-11 h-11 rounded-full
            flex items-center justify-center
            shadow-md
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            z-10
          "
        >
          <FaChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            bg-white w-11 h-11 rounded-full
            flex items-center justify-center
            shadow-md
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            z-10
          "
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Product Title */}
      <h3 className="mt-4 text-[17px] font-semibold text-[#1f2940] leading-6">
        {product.title}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className="text-[#d64045] text-sm"
          />
        ))}

        <span className="text-[14px] text-[#4b5563] ml-1">
          ({product.reviews})
        </span>
      </div>

      {/* Price */}
      <div className="mt-2 flex items-center gap-3">
        <span className="font-bold text-[17px] md:text-[20px] text-[#1f2940]">
          ₹{product.price}
        </span>

        <span className="line-through text-[#6b7280] text-[16px]">
          ₹{product.oldPrice}
        </span>
      </div>
    </div>
  );
}