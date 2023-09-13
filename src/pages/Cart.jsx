import { useContext } from "react";
import Default from "../components/Layout/Default";
import ItemListContainer from "../components/Pages/Cart/ItemListContainer";
import CartContext from "../context/cartContext";

function Cart() {
  const cartContext = useContext(CartContext);

  return (
    <Default>
      <div className="flex h-full w-full flex-col">
        <div className="flex w-full items-center">
          <button
            onClick={cartContext.clear}
            className="border border-red-600 w-36 p-3 m-5 text-red-600 hover:bg-red-600/25"
          >
            Limpar Carinho
          </button>
          <div className="flex flex-col">
            <span className="font-semibold text-lg font-inter">
              Quantidate total: {cartContext.cartItems.length}
            </span>
            <span className="font-semibold text-lg font-inter">
              Valor Total:{" R$ "}
              {cartContext.cartItems.reduce((acc, curr) => {
                return acc + curr.item.price * curr.quantity;
              }, 0)}
            </span>
          </div>
        </div>
        <ItemListContainer />
      </div>
    </Default>
  );
}

export default Cart;
