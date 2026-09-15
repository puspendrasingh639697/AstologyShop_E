import { useState } from "react";
import {products} from "../data/products";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
const ITEMS_PER_VIEW = 4;

const ProductCarousel = () => {
  const [imageIndexes, setImageIndexes] = useState({});
   const [startIndex, setStartIndex] = useState(0);
  

  const visibleProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_VIEW
  );

const nextProducts = () => {
  if (startIndex < products.length - ITEMS_PER_VIEW) {
    setStartIndex((prev) => prev + 1);
  }
};

const prevProducts = () => {
  if (startIndex > 0) {
    setStartIndex((prev) => prev - 1);
  }
};

  const nextImage = (id, totalImages, e) => {
    e.stopPropagation();

    setImageIndexes((prev) => ({
      ...prev,
      [id]: Math.min(
        (prev[id] || 0) + 1,
        totalImages - 1
      ),
    }));
  };

  const prevImage = (id, totalImages, e) => {
    e.stopPropagation();

    setImageIndexes((prev) => ({
      ...prev,
      [id]: Math.max(
        (prev[id] || 0) - 1,
        0
      ),
    }));
  };

  return (  
    <section className="bg-[#fff3df] pt-6 pb-10">
      <div className="max-w-[1400px] mx-auto px-7">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-bold">
            Best Rakhi Ever
          </h2>

          <button
              className="
    text-[17px]
    text-[#1F2340]
    border-b border-[#1F2340]
    pb-[2px]
    hover:opacity-80
    transition-all duration-300
  "
>
  View all
</button>
        </div>

        <div className="relative">

          {/* Section Slider Arrows */}
          <div className="hidden lg:flex absolute right-[-24px] top-[170px] z-50 flex-col gap-3">

            <button
              onClick={nextProducts}
              disabled={
                startIndex + ITEMS_PER_VIEW >= products.length
              }
              className={`
                w-12 h-12 rounded-full
                flex items-center justify-center
                shadow-md
                ${
                  startIndex + ITEMS_PER_VIEW >= products.length
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-[#2E3148] text-white"
                }
              `}
            >
              <FaChevronRight />
            </button>

            <button
              onClick={prevProducts}
              disabled={startIndex === 0}
              className={`
                w-12 h-12 rounded-full
                flex items-center justify-center
                shadow-md
                ${
                  startIndex === 0
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-[#2E3148] text-white"
                }
              `}
            >
              <FaChevronLeft />
            </button>

          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {visibleProducts.map((item) => {
              const currentIndex =
                imageIndexes[item.id] || 0;

              const images = item.images;

              const isFirstImage =
                currentIndex === 0;

              const isLastImage =
                currentIndex === images.length - 1;

              return (
                <div
                  key={item.id}
                  className="group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-[10px]">

                    <img
                      src={images[currentIndex]}
                      alt={item.title}
                      className="w-full h-[260px] sm:h-[300px] lg:h-[320px] object-cover"
                    />

                    {/* Discount */}
                   <span
              className="
                     absolute top-0 left-0
                    min-w-[80px]
                         px-3
    h-[32px]
    bg-[#D94A43]
    text-white
    text-[12px]
    font-semibold
    flex items-center justify-center
    rounded-br-md
  "
>
  {item.discount}
</span>

                    {/* Prev Image */}
                    <button
                      onClick={(e) =>
                        prevImage(
                          item.id,
                          images.length,
                          e
                        )
                      }
                      disabled={isFirstImage}
                      className={`
                        absolute left-4 top-1/2 -translate-y-1/2
                        w-10 h-10 rounded-full
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100
                        transition-all duration-300
                        ${
                          isFirstImage
                            ? "bg-white/80 text-gray-300 cursor-not-allowed"
                            : "bg-white text-[#1F2340] shadow-md"
                        }
                      `}
                    >
                      <FaChevronLeft />
                    </button>

                    {/* Next Image */}
                    <button
                      onClick={(e) =>
                        nextImage(
                          item.id,
                          images.length,
                          e
                        )
                      }
                      disabled={isLastImage}
                      className={`
                        absolute right-4 top-1/2 -translate-y-1/2
                        w-10 h-10 rounded-full
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100
                        transition-all duration-300
                        ${
                          isLastImage
                            ? "bg-white/80 text-gray-300 cursor-not-allowed"
                            : "bg-white text-[#1F2340] shadow-md"
                        }
                      `}
                    >
                      <FaChevronRight />
                    </button>

                  </div>

                  {/* Content */}
                  <div className="pt-4">

                    <h3 className="text-[18px] font-semibold text-[#1F2340] leading-7 line-clamp-3 min-h-[78px] whitespace-pre-line">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-2 ">
                      <div className="flex text-[#D94A43]">
                        {[...Array(item.rating)].map(
                          (_, index) => (
                            <FaStar key={index} />
                          )
                        )}
                      </div>

                      <span className="text-[13px] text-gray-500">
                        ({item.reviews})
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[19px] font-bold text-[#1F2340]">
                        ₹{item.price}
                      </span>

                      <span className="text-[16px] text-gray-400 line-through">
                        ₹{item.oldPrice}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Line */}
        <div className="mt-8 h-[2px] bg-[#1F2340]/15 relative">
          <div
            className="absolute top-0 left-0 h-full bg-[#1F2340]"
            style={{
              width: `${
                ((startIndex + ITEMS_PER_VIEW) /
                  products.length) *
                100
              }%`,
            }}
          />
        </div>

      </div>
    </section>
  );
};

export default ProductCarousel;