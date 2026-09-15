const categories = [
  { image: "https://japam.in/cdn/shop/files/1_1b42a50a-4022-4bf9-affc-605f7fea341c.png?v=1774088462&width=70" },
  { image: "https://japam.in/cdn/shop/files/2_03327e1d-ba6b-43bb-a211-379aba6ff76b.png?v=1774088462&width=70" },
  { image: "https://japam.in/cdn/shop/files/3_5d3b0fef-ce0a-4d77-89be-c2cd5974c856.png?v=1774088462&width=70" },
  { image: "https://japam.in/cdn/shop/files/5_3fa820d2-9cf7-434e-a5ff-95885ff7fd04.png?v=1774088463&width=70" },
  { image: "https://japam.in/cdn/shop/files/4_7e88292b-f212-4ff0-a32c-7d1a81bf71e7.png?v=1774088462&width=70" },
  { image: "https://japam.in/cdn/shop/files/7_ec000b51-cf89-435c-8d81-5b057f88e1da.png?v=1774088462&width=70" },
  { image: "https://japam.in/cdn/shop/files/6_7f870987-3c08-4487-a816-ec8eeee41867.png?v=1774088462&width=70" },
  { image: "https://japam.in/cdn/shop/files/8_7972b077-7b4d-476c-b87f-b7cd5688f82f.png?v=1774088462&width=70" },
];

function CategoryStrip() {
  return (
    <div className="category-strip">
      {categories.map((pic, index) => (
        <div key={index} className="category-item">
          <div className="category-circle">
            {pic.image && (
              <img src={pic.image} alt={`category-${index}`} className="category-img" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryStrip;