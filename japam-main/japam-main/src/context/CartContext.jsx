import { useState } from "react";
import { CartContext } from "./cart-context";

export function CartProvider({ children }) {
  // cartItems ek array hai jisme add kiye hue products store honge
  const [cartItems, setCartItems] = useState([]);

  // product ko cart me add karne ka function
  function addToCart(product) {
    const alreadyInCart = cartItems.find((item) => item.id === product.id);

    if (alreadyInCart) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // cart se product hatane ka function
  function removeFromCart(productId) {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  }

  // total price nikalne ka function
  function getTotalPrice() {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total = total + cartItems[i].price * cartItems[i].quantity;
    }
    return total;
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}