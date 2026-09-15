import { useState } from "react";
import Hotspot from "./Hotspot";

const hotspots = [
  {
    id: 1,
    top: "20%",
    left: "60%",
    title: "Quality Packaging",
    description: "We focus heavily on customer experience and delight.",
  },
  {
    id: 2,
    top: "70%",
    left: "25%",
    title: "BTR Card",
    description: "We send samples for lab testing and provide Batch Test Reports.",
  },
  {
    id: 3,
    top: "55%",
    left: "78%",
    title: "Fit & Finish",
    description: "We put a lot of effort into ensuring our high quality standards.",
  },
];

export default function LabTestedSection() {
  const [active, setActive] = useState(null);

  return (
    <section className=" bg-[#fff3df] py-2 sm:mt-0 sm:py-1">
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-11">
        <div className="bg-[#fff8e6] shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            
            <h2 className="text-4xl font-semibold tracking-tight text-[#23254c] sm:text-5xl lg:text-6xl">
              Asli Wearables - Lab Tested
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#23254c] sm:text-lg">
              We follow our proprietary system of BTR (Batch Test Reports) to ensure you always get original and genuine beads and stones.
            </p>
          </div>

          <div className="relative overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600"
              alt="Lab tested wearable"
              className="w-full h-[320px] sm:h-[420px] md:h-[550px] lg:h-[670px] object-cover"
            />

          {hotspots.map((item) => (
            <Hotspot
              key={item.id}
              top={item.top}
              left={item.left}
              title={item.title}
              description={item.description}
              isOpen={active === item.id}
              onClick={() =>
                setActive(active === item.id ? null : item.id)
              }
            />
          ))}

          </div>
        </div>
      </div>
    </section>
  );
}