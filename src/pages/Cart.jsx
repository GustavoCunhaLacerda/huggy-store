import { useContext } from "react";
import Default from "../components/Layout/Default";
import ItemListContainer from "../components/Pages/Cart/ItemListContainer";
import CartContext from "../context/cartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartContext = useContext(CartContext);

  const navigate = useNavigate();

  function navigateToCheckout() {
    navigate("/checkout");
  }

  return (
    <Default>
      <div className="flex h-full w-full flex-col">
        <div className="flex px-16 py-10 justify-between">
          <h1 className="font-inter text-2xl font-semibold text-gray-900">
            Meu Carrinho
          </h1>
        </div>

        {cartContext.cartItems.length > 0 ? (
          <div className="flex w-full px-16 rounded-xl gap-5 justify-between">
            <div className="flex w-full flex-col">
              <table className="bg-slate-500 w-full rounded-md">
                <thead className="bborder bg-blue-300 text-left  rounded-t-xl rounded-md">
                  <tr className="[&>th]:font-inter [&>th]:font-semibold [&>th]:text-white [&>th]:p-2 rounded-md [&>th]:text-sm">
                    <th colSpan={2} className="rounded-tl-md">
                      Produto
                    </th>
                    <th>Qdd</th>
                    <th>Preço</th>
                    <th className="rounded-tr-md"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartContext.cartItems.map((product) => {
                    return (
                      <tr className="bg-blue-50 [&>td]:p-2 [&>td]:font-inter [&>td]:text-sm [&>td]:font-medium">
                        <td className="w-32">
                          <img
                            src={product.item.image}
                            width={100}
                            height={100}
                            className="bg-white p-2 rounded-md"
                          />
                        </td>
                        <td>
                          <div className="w-full flex flex-col">
                            <span>{product.item.name}</span>
                            <span>{product.item.brand}</span>
                          </div>
                        </td>
                        <td>{product.quantity}</td>
                        <td>R$ {product.item.price.toFixed(2).toString()}</td>
                        <td className="w-20">
                          <img
                            src="/icons/trash_2.svg"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() =>
                              cartContext.removeItem(product.item.id)
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex w-full justify-end py-3">
                <button
                  onClick={cartContext.clear}
                  className="bg-red-400 hover:bg-red-600/50 rounded-md py-2 px-3 text-sm font-semibold text-white"
                >
                  Limpar carrinho
                </button>
              </div>
            </div>
            <div className="flex flex-col w-1/4">
              <div className="bg-blue-50 flex flex-col justify-center items-center">
                <span className="font-semibold text-xl text-white bg-blue-300 p-2 rounded-t-md w-full">
                  Resumo
                </span>
                <div className="flex justify-between px-4 py-2 w-full">
                  <span className="font-inter font-medium text-base text-gray-900">
                    Total{" "}
                  </span>
                  <span className="font-inter font-medium text-base text-gray-900">
                    R$ {cartContext.price?.().toFixed(2).toString()}
                  </span>
                </div>
                <span className="font-inter font-normal text-sm pb-2 text-gray-900">
                  {" "}
                  10x de R${" "}
                  {String(
                    Math.floor((cartContext.price?.() / 10) * 100) / 100
                  )}{" "}
                  s/ juros
                </span>
              </div>
              <button
                onClick={navigateToCheckout}
                className="bg-green-400 p-3 rounded-md mt-3 font-inter font-semibold text-sm text-white"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Default>
  );
}

export default Cart;
