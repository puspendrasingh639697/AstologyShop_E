import {
  FaRupeeSign,
  FaHeart,
  FaShieldAlt,
  FaHandHoldingHeart,
  FaPeace,
  FaFistRaised,
  FaBalanceScale,
  FaArrowRight,
} from "react-icons/fa";

const purposes = [
  { title: "Wealth", icon: FaRupeeSign },
  { title: "Health", icon: FaHandHoldingHeart },
  { title: "Love", icon: FaHeart },
  { title: "Luck", icon: FaHeart },
  { title: "Protection", icon: FaShieldAlt },
  { title: "Peace", icon: FaPeace },
  { title: "Courage", icon: FaFistRaised },
  { title: "Balance", icon: FaBalanceScale },
];

export default function ShopByPurpose() {
  return (
    <section className="bg-[#ffeed1] py-14">
  {/* Heading */}
  <div className="max-w-[1190px] mx-auto">
    <h2 className="text-center text-[55px] font-bold text-[#1f2340] relative -top-5">
      Shop By Purpose
    </h2>
  </div>

  {/* Cards */}
  <div className="max-w-[1190px] mx-auto px-4">
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8">
      {purposes.map((item, index) => {
        const Icon = item.icon;

        return (
          <div key={index} className="cursor-pointer">
            {/* Image Area */}
            <div className="h-[82px] bg-gradient-to-b from-[#C7444E] to-[#4A2D4D] flex items-center justify-center">
              <Icon className="text-white text-[42px]" />
            </div>

            {/* Bottom Bar */}
            <div className="h-[24px] bg-[#25243C] px-2 flex items-center justify-between">
              <span className="text-white text-[13px] font-semibold">
                {item.title}
              </span>

              <div className="w-3.5 h-3.5 border border-white rounded-full flex items-center justify-center">
                <FaArrowRight className="text-white text-[8px]" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
  );
}