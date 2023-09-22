import { createContext, useState } from "react";

const CartContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addItem(item, quantity) {
    setCartItems((curr) => [...curr, { item, quantity }]);
  }

  function removeItem(itemId) {
    setCartItems((curr) =>
      curr.filter((cartItem) => cartItem.item.id !== itemId)
    );
  }

  function isInCart(itemId) {
    cartItems.forEach((cartItem) => {
      if (cartItem.item.id === itemId) {
        return true;
      }
    });

    return false;
  }

  function clear() {
    setCartItems([]);
  }

  function price() {
    return cartItems.reduce((acc, curr) => {
      return acc + curr.item.price * curr.quantity;
    }, 0);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        clear,
        isInCart,
        price,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
