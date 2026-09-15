import ProductCard from "./ProductCard";
import { products } from "../data/products";

export default function ExploreEnergyStones() {
  return (
    <section className="bg-[#fff3df] py-4">
      <div className="max-w-[1390px] mx-auto px-5 lg:px-8">

        {/* Heading */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[24px] md:text-[28px] font-bold text-[#1f2940]">
            Explore Energy Stones
          </h2>

          <button className="text-[18px] underline text-[#1f2940] hover:opacity-80 transition">
            View all
          </button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}