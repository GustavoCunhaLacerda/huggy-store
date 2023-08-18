import Default from "../components/Layout/Default";
import ItemListContainer from "../components/Pages/Cart/ItemListContainer";

function Cart() {
  return (
    <Default>
      <div className="flex h-full w-full items-center justify-center">
        <ItemListContainer />
      </div>
    </Default>
  );
}

export default Cart;
