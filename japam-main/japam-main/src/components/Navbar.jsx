import { useContext, useState } from "react";
import { CartContext } from "../context/cart-context";

const navLinks = [
    {
        label: "Rudraksha",
        dropdown: ["Rudraksha Braceletes", "Rudraksha Malas", "Nepali Rudraksha"],
    },
    {
        label: "Energy Stones",
        dropdown: ["Pyrite Wearables", "Rose Quartz Wearables", "Tiger Eye Wearables", "Amethyst Wearables", "Hematite Wearables"],
    },
    { label: "Karungali", dropdown: [] },
    { label: "Vaastu", dropdown: [] },
    { label: "Rashi/Zodiac", dropdown: [] },
    {
        label: "Spiritual Jewellery",
        dropdown: ["Spiritual Bracelets", "Spiritual Necklaces"],
    },
    {
        label: "Gift Hampers",
        dropdown: ["Diwali Celebration", "Rakhi Celebration"],
    },
    {
        label: "Support",
        dropdown: ["Track My Order", "Contact Us", "Returns/Exchange"],
    },
];

function Navbar() {
    const { cartItems } = useContext(CartContext);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="navbar-wrapper">
            {/* Top row - logo aur icons */}
            <div className="top-bar">
                <div className="left-section">
                    <div className="logo-placeholder">
                        <img
                            src="https://japam.in/cdn/shop/files/PhotoshopPreview_Image-removebg-preview.png?v=1772086024&width=60"
                            alt="logo"
                        />
                    </div>
                </div>

                <div className="top-icons">
                    {/* Search Icon */}
                    <div className="icon-placeholder search-icon">
                        <i className="fas fa-search"></i>
                    </div>

                    {/* Profile Icon */}
                    <div className="icon-placeholder profile-icon">
                        <i className="fas fa-user"></i>
                    </div>

                    {/* Cart Icon */}
                    <div className="icon-placeholder cart-icon">
                        <i className="fas fa-shopping-bag"></i>
                        {cartItems.length > 0 && (
                            <span className="cart-badge">{cartItems.length}</span>
                        )}
                    </div>

                    {/* Menu Icon - Right side on mobile */}
                    <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
            </div>

            {/* Bottom row - nav links with dropdown + Chat with Sevak button */}
            <div className="nav-row">
                <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    {navLinks.map((link) => (
                        <li
                            key={link.label}
                            className="nav-item"
                            onMouseEnter={() => setOpenDropdown(link.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            {link.label}
                            {link.dropdown.length > 0 && (
                                <span className="arrow">
                                    <i className="fas fa-chevron-down"></i>
                                </span>
                            )}

                            {openDropdown === link.label && link.dropdown.length > 0 && (
                                <ul className="dropdown-menu">
                                    {link.dropdown.map((item) => (
                                        <li key={item} className="dropdown-item">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                <button className="sevak-btn">
                    <i className="fas fa-comment-dots"></i> Chat with Sevak
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                        {navLinks.map((link) => (
                            <div key={link.label} className="mobile-nav-item">
                                {link.label}
                                {link.dropdown.length > 0 && (
                                    <div className="mobile-dropdown">
                                        {link.dropdown.map((item) => (
                                            <div key={item} className="mobile-dropdown-item">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;