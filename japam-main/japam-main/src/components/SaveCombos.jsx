import { useState } from "react";
import combo from "../data/combo";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ITEMS_PER_VIEW = 4;

const SaveCombos = () => {
  const [imageIndexes, setImageIndexes] = useState({});
  const [startIndex, setStartIndex] = useState(0);

  const visibleProducts = combo.slice(
    startIndex,
    startIndex + ITEMS_PER_VIEW
  );

const nextProducts = () => {
  if (startIndex < combo.length - ITEMS_PER_VIEW) {
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
    <section className="bg-[#fff3df] py-8">
      <div className="max-w-[1390px] mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[45px] font-bold text-[#1F2340] leading-[1.2]">
            Save More With Combos
          </h2>

          <button
              className="
                     text-[18px]
                     text-[#1F2340]
                          border-b border-[#1F2340]
                                  pb-0.5
                                hover:opacity-80
                                 transition-all duration-300 "
>
                                   View all
        </button>
        </div>

        <div className="relative group">

          {/* Section Slider Arrows */}
          <div className="hidden lg:flex absolute right-[-45px] top-[185px] z-40 flex-col gap-3">

            <button
              onClick={nextProducts}
              disabled={
                startIndex + ITEMS_PER_VIEW >= combo.length
              }
              className={`
                w-12 h-12 rounded-full
                flex items-center justify-center
                shadow-md
                            transition-all duration-300
    opacity-0 group-hover:opacity-100
                ${
                  startIndex + ITEMS_PER_VIEW >= combo.length
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
                            transition-all duration-300
    opacity-0 group-hover:opacity-100
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
                      className="w-full h-80 object-cover"
                    />

                    {/* Discount */}
                    <span className="absolute top-0 left-0 bg-[#D94A43] text-white text-[14px] font-semibold px-3 py-1.5 rounded-br-md">
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

                    <h3 className="text-[18px] font-semibold text-[#1F2340] leading-7 line-clamp-3 min-h-22.5">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex text-[#D94A43]">
                        {[...Array(item.rating)].map(
                          (_, index) => (
                            <FaStar key={index} />
                          )
                        )}
                      </div>

                      <span className="text-[12px] text-gray-500">
                        ({item.reviews})
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[18px] font-bold text-[#1F2340]">
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
        <div className="mt-8 h-0.5 bg-[#1F2340]/15 relative">
          <div
            className="absolute top-0 left-0 h-full bg-[#1F2340]"
            style={{
              width: `${
                ((startIndex + ITEMS_PER_VIEW) /
                  combo.length) *
                100
              }%`,
            }}
          />
        </div>

      </div>
    </section>
  );
};

export default SaveCombos;