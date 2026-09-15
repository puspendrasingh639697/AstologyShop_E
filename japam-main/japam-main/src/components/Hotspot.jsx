import { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

export default function Hotspot({
  top,
  left,
  title,
  description,
  isOpen,
  onClick,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 640);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  return (
    <div
      className="absolute z-20"
      style={{
        top,
        left,
      }}
    >
      {/* Plus Button */}

      <button
        onClick={onClick}
        className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-xl shadow-lg transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <FiX /> : <FiPlus />}
      </button>

      {/* Popup */}

      {isOpen && (
        <div
          className={`${
            isMobile
              ? "fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.25rem)] max-w-85 rounded-3xl"
              : "absolute top-14 left-0 w-72 rounded-2xl"
          } bg-white shadow-2xl p-5 z-30`}
        >

          {!isMobile && (
            <div className="absolute -top-2 left-5 w-4 h-4 bg-white rotate-45"></div>
          )}

          <h3 className="text-lg font-semibold text-[#23254c] relative z-10">
            {title}
          </h3>

          <p className="mt-3 text-[15px] leading-6 text-gray-600 relative z-10">
            {description}
          </p>

        </div>
      )}
    </div>
  );
}