import { useState, useEffect } from "react";

const heroSlides = [
  {
    image: "https://japam.in/cdn/shop/files/Banner_desktop_2.jpg?v=1777975965&width=1400",
    title: "Authentic Energy Stones",
    subtitle: "100% Real Energy Stones With Authentication Certificate",
    btnText: "EXPLORE NOW",
    link: "/collections/energy-stones",
  },
  {
    image: "https://japam.in/cdn/shop/files/Banner_desktop_3.jpg?v=1777975965&width=1400",
    title: "Karungali - Ebony wood",
    subtitle: "Sacred Karungali Beads in everyday wearable designs.",
    btnText: "EXPLORE COLLECTION",
    link: "/collections/karungali",
  },
  {
    image: "https://japam.in/cdn/shop/files/ChatGPT_Image_Mar_7_2026_04_42_16_PM_1.png?v=1778058344&width=1400",
    title: "Certified Rudraksha Collection",
    subtitle: "Rudraksha wearables crafted for modern, everyday wear.",
    btnText: "EXPLORE NOW",
    link: "/collections/rudraksha",
  },
];
function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3000); // 3 second
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="hero-section">
      {heroSlides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt={slide.title}
          className={`hero-bg-img ${index === current ? "active" : ""}`}
        />
      ))}

      <div className="hero-overlay">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-content ${index === current ? "active" : ""}`}
          >
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <a href={slide.link} className="hero-btn">
              {slide.btnText}
            </a>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="hero-dots">
        {heroSlides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;