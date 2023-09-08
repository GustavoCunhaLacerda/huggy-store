import { useContext } from "react";
import CartContext from "../../../context/cartContext";

function ItemListContainer() {
  const cartContext = useContext(CartContext);

  function handleRemoveFromCart(itemId) {
    cartContext.removeItem(itemId);
  }

  return (
    <div>
      <div className="flex h-full w-full flex-col gap-6 justify-center items-center p-5">
        {cartContext.cartItems.map((cartItem, index) => {
          return (
            <div
              key={index}
              className="flex justify-between w-full border p-8 m-5"
            >
              <div className="flex flex-col justify-between">
                <span className="text-blue-950 text-3xl font-semibold">
                  {cartItem.item.name}
                </span>
                <span className="text-blue-500 font-semibold text-3xl">
                  R$ {cartItem.item.price}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <div className="flex gap-2 items-center">
                  <span>Quantidade: </span>
                  <span>{cartItem.quantity}</span>
                </div>
                <button
                  className="border p-2 w-full border-red-600 text-red-600"
                  onClick={() => handleRemoveFromCart(cartItem.item.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemListContainer;
