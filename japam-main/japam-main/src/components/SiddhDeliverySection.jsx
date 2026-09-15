const SiddhDeliverySection = () => {
  return (
    <section className="bg-[#fae6c4] py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2
          className="
            text-center
            text-[#1f2340]
            text-[32px]
            sm:text-[40px]
            md:text-[50px]
            lg:text-[58px]
            font-black
            font-sans
            tracking-[1px]
            leading-[1.1]
          "
        >
          Siddh Products Delivered To Your Home
        </h2>

        {/* Description */}
        <p
          className="
            text-center
            text-[#1f2340]
            mt-3
            text-[13px]
            sm:text-[14px]
            md:text-[15px]
            font-medium
            max-w-5xl
            mx-auto
            md:pl-20 lg:pl-24
            leading-relaxed
          "
        >
          Each Siddh order comes with a Siddhi Prakriya Report (SPR) with a QR
          code to watch a short video of the Siddhi ceremony of your product.
        </p>

        {/* Video */}
        <div className="mt-8 md:mt-10 flex justify-center">
          <div className="w-full max-w-5xl overflow-hidden shadow-lg">
            <video
              className="
                w-full
                h-55
                sm:h-87.5
                md:h-125
                lg:h-155
                object-cover
              "
              autoPlay
              muted
              loop
              controls
              playsInline
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiddhDeliverySection;