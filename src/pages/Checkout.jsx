import { useContext, useState } from "react";
import Default from "../components/Layout/Default";
import CheckoutForm from "../components/Pages/Checkout/CheckoutForm";
import CartContext from "../context/cartContext";
import dayjs from "dayjs";

function Checkout() {
  const [order, setOrder] = useState(null);
  const cartContext = useContext(CartContext);

  return (
    <Default>
      {!order ? (
        <div className="flex h-full w-full flex-col">
          <div className="flex px-16 py-10 justify-between">
            <h1 className="font-inter text-2xl font-semibold text-gray-900">
              Finalizar Compra
            </h1>
          </div>
          <div className="flex w-full px-16 rounded-xl gap-5 justify-between">
            <CheckoutForm setOrder={setOrder} />
            <div className="flex flex-col w-1/3">
              <div className="bg-blue-50 flex flex-col justify-center items-center">
                <span className="font-semibold text-xl text-white bg-blue-300 p-2 rounded-t-md w-full">
                  Resumo do Pedido
                </span>
                <div className="flex flex-col w-full p-3">
                  {cartContext.cartItems.map((cartItem) => {
                    return (
                      <div className="flex justify-between w-full [&_p]:font-inter [&_p]:text-sm">
                        <p>{cartItem.item.name}</p>
                        <div className="flex">
                          <p>{cartItem.quantity}x </p>
                          <p>R$ {cartItem.item.price.toFixed(2).toString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                type="submit"
                form="checkout-form"
                className="bg-green-400 p-3 rounded-md mt-3 font-inter font-semibold text-sm text-white"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-center w-full items-center gap-8">
          <h2 className="font-inter text-3xl text-gray-900 font-semibold">
            Dados da Compra
          </h2>
          <div className="flex flex-col justify-center items-center gap-2">
            <h3 className="font-inter text-xl text-gray-900 font-medium">
              Comprador
            </h3>
            <p className="font-inter text-sm text-gray-900">
              {order.buyer.name}
            </p>
            <p className="font-inter text-sm text-gray-900">
              {order.buyer.email}
            </p>
            <p className="font-inter text-sm text-gray-900">
              {order.buyer.phone}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <h3 className="font-inter text-xl text-gray-900 font-medium">
              Items
            </h3>
            {order.items.map((item) => {
              return (
                <div className="flex items-center gap-3">
                  <img src={item.item.image} width={40} height={40} />
                  <p className="font-inter text-sm text-gray-900">
                    {item.item.name}
                  </p>
                  <p className="font-inter text-sm text-gray-900">
                    {item.quantity}x
                  </p>
                  <p className="font-inter text-sm text-gray-900">
                    R$ {item.item.price.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          <div>
            <h3 className="font-inter font-medium text-gray-900">
              Data da Compra:{" "}
              {dayjs(order.date).format("DD/MM/YYYY HH:mm").toString()}
            </h3>
            <h3 className="font-inter font-medium text-gray-900">
              Total: R$ {order.total.toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </Default>
  );
}

export default Checkout;
