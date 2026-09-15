import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { rudraksha } from "../data/rudraksha";

const RudrakshaSection = () => {
  const [start, setStart] = useState(0);
  const [currentImages, setCurrentImages] = useState({});

  const visibleCards = 4;

  const nextSlide = () => {
    if (start < rudraksha.length - visibleCards) {
      setStart(start + 1);
    }
  };

  const prevSlide = () => {
    if (start > 0) {
      setStart(start - 1);
    }
  };

  const nextImage = (id, totalImages) => {
    setCurrentImages((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (id, totalImages) => {
    setCurrentImages((prev) => ({
      ...prev,
      [id]:
        ((prev[id] || 0) - 1 + totalImages) %
        totalImages,
    }));
  };

  const progress =
    rudraksha.length > 0
      ? ((start + visibleCards) / rudraksha.length) * 100
      : 0;

  return (
    <section className="bg-[#FFF3DF] py-9">
      <div className="max-w-[1370px] mx-auto px-8">
        {/* Heading */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[30px] font-bold text-[#1f2340]">
            Single Rudraksha Beads
          </h2>

          <button className="text-[17px] text-[#1f2340] underline">
            View all
          </button>
        </div>

        <div className="flex gap-8">
          {/* Left Banner */}
          <div className="w-[350px] flex-shrink-0">
            <div className="overflow-hidden cursor-pointer group">
              <img
                src="https://japam.in/cdn/shop/files/IMG-2146.jpg?v=1702795235&width=900"
                alt=""
                className="h-[370px] w-full object-cover"
              />

              <div className="bg-[#C63E3A] px-5 py-9 text-white">
                <h3 className="text-[24px] font-bold whitespace-nowrap mb-2">
                  Original Nepali Rudraksha
                </h3>

                <p className="text-[15px]">
                  1 Mukhi to 11 Mukhi - with certificate
                </p>
              </div>
            </div>
          </div>

          {/* Right Slider */}
          <div className="flex-1 relative overflow-hidden group">
            <div className="flex gap-5">
              {rudraksha
                .slice(start, start + visibleCards)
                .map((item) => (
                  <div
                    key={item.id}
                    className="w-[210px] flex-shrink-0"
                  >
                    {/* Image Slider */}
                    <div className="relative group overflow-hidden">
                      <img
                        src={
                          item.images[
                            currentImages[item.id] || 0
                          ]
                        }
                        alt={item.title}
                        className="h-[170px] w-full object-cover"
                      />

                      {/* Discount */}
                      <div className="absolute top-0 left-0 bg-[#D64040] text-white px-1 py-1 text-[12px] font-semibold z-10">
                        {item.discount}
                      </div>

                      {/* Previous Image */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(
                            item.id,
                            item.images.length
                          );
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
                      >
                        <FaChevronLeft size={12} />
                      </button>

                      {/* Next Image */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(
                            item.id,
                            item.images.length
                          );
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
                      >
                        <FaChevronRight size={12} />
                      </button>

                  
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-[15px] font-semibold text-[#1f2340] leading-6 min-h-[60px]">
                      {item.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={13}
                          color="#D64040"
                        />
                      ))}

                      <span className="text-[14px] ml-1 text-[#1f2340]">
                        ({item.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[18px] font-bold text-[#1f2340]">
                        ₹ {item.price}
                      </span>

                      <span className="line-through text-[14px] text-gray-500">
                        ₹ {item.oldPrice}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Section Slider Arrows */}
            <button
              onClick={nextSlide}
              className="absolute right-[-10px] top-[44%] w-10 h-10 rounded-full bg-[#363047] text-white flex items-center justify-center opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            >
              <FaChevronRight size={14} />
            </button>

            <button
              onClick={prevSlide}
              className="absolute right-[-10px] top-[55%] w-10 h-10 rounded-full bg-[#8b8b8b] text-white flex items-center justify-center opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            >
              <FaChevronLeft size={14} />
            </button>

            {/* Progress Bar */}
            <div className="mt-10 w-[88%] mx-auto h-[2px] bg-[#cfc6b9]">
              <div
                className="h-full bg-[#1f2340] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RudrakshaSection; 