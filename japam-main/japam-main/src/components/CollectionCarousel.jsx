import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { collections } from "../data/collections";

const ITEMS_PER_VIEW = 6;

const CollectionCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = Math.ceil(
    collections.length / ITEMS_PER_VIEW
  );

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="bg-[#fff3df] py-10">
      <div className="max-w-[1300px] mx-auto px-0">

        <div className="relative group">
         <h2 className="absolute -left-4 -top-4 z-14 text-[34px] sm:text-[34px] lg:text-[42px] font-bold text-[#16233d]">
  Shop Our Collections
</h2>
          {/* Right Arrow */}
         <div className="hidden lg:flex absolute right-[-45px] top-[110px] z-40 flex-col gap-3">
            <button
              onClick={nextSlide}
              disabled={currentIndex >= totalSlides - 1
              }
              className={`
                w-12 h-12 rounded-full
                flex items-center justify-center
                shadow-md
                 transition-all duration-300
    opacity-0 group-hover:opacity-100
                ${
                   currentIndex >= totalSlides - 1
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-[#2E3148] text-white"
                }
              `}
            >
              <FaChevronRight />
            </button>

            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`
                w-12 h-12 rounded-full
                flex items-center justify-center
                shadow-md
                 transition-all duration-300
    opacity-0 group-hover:opacity-100
                ${
                  currentIndex === 0
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-[#2E3148] text-white"
                }
              `}
            >
              <FaChevronLeft />
            </button>

          </div>

          {/* Collections */}
          <div className="overflow-hidden px-0 pt-8">
  <div
    className="flex transition-transform duration-500 ease-in-out"
    style={{
      transform: `translateX(-${currentIndex * 100}%)`,
    }}
  >
    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
      <div
        key={slideIndex}
        className="min-w-full flex justify-between gap-6"
      >
        {collections
          .slice(
            slideIndex * ITEMS_PER_VIEW,
            slideIndex * ITEMS_PER_VIEW + ITEMS_PER_VIEW
          )
          .map((item) => (
            <div
              key={item.id}
              className="flex-1 text-center group cursor-pointer"
            >
              <div className="w-[210px] h-[210px] mx-auto rounded-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              <h3
                className="
                  mt-4
                  text-[17px]
                  font-medium
                  text-[#16233d]
                  leading-snug
                "
              >
                {item.title}
              </h3>
            </div>
          ))}
      </div>
    ))}
  </div>
</div>

          {/* Progress Bar */}
         <div className="mt-12 w-full h-[3px] bg-[#d6d6d6] overflow-hidden">
  <div
    className="h-full bg-[#16233d] transition-all duration-500"
    style={{
      width: `${((currentIndex + 1) / totalSlides) * 100}%`,
    }}
  />
</div>

        </div>
      </div>
    </section>
  );
};

export default CollectionCarousel;