import { useContext } from "react";
import Default from "../components/Layout/Default";
import ItemListContainer from "../components/Pages/Cart/ItemListContainer";
import CartContext from "../context/cartContext";

function Cart() {
  const cartContext = useContext(CartContext);

  return (
    <Default>
      <div className="flex h-full w-full flex-col">
        <button
          onClick={cartContext.clear}
          className="border border-red-600 w-36 p-3 m-5 text-red-600 hover:bg-red-600/25"
        >
          Limpar Carinho
        </button>
        <ItemListContainer />
      </div>
    </Default>
  );
}

export default Cart;
