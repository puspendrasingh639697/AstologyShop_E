import { useState, useEffect } from "react";

function AnnouncementBar() {
  const messages = [
    "✨ 100% Cashback available upto ₹500",
    "🕉️ Free delivery on orders over ₹299",
    "🙏 Har Ghar Rudraksha - Claim Free 5 Mukhi",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="announcement-bar">
      <span key={currentIndex} className="announcement-text">
        {messages[currentIndex]}
      </span>
    </div>
  );
}

export default AnnouncementBar;