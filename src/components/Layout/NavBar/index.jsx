import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../../context/cartContext";

function NavBar() {
  const cartContext = useContext(CartContext);

  const navOptions = [
    { label: "Ursos", path: "/products" },
    {
      label: "Carrinho",
      path: "/cart",
      icon: "cart",
      count: cartContext.cartItems.length,
    },
  ];

  return (
    <aside className="flex w-full p-6 justify-between bg-blue-600 border-b">
      <Link to="/" className="flex gap-2 items-center">
        <img src="/icons/teddy-bear.svg" className="w-10 h-10" />
        <span className="font-inter font-normal text-2xl text-gray-50">
          HUGGY
        </span>
      </Link>
      <nav className="flex gap-4 items-center">
        {navOptions.map((option, index) => {
          return (
            <Link to={option.path} key={index} className="font-inter">
              {option.count ? (
                <div className="flex flex-col items-end justify-end">
                  <div className="bg-red-600 rounded-full w-4 h-4 z-10 justify-center items-end flex -mb-3">
                    <span className="text-xs font-medium text-gray-50">
                      {option.count}
                    </span>
                  </div>
                  <img
                    src={`/icons/${option.icon}.svg`}
                    height={32}
                    width={32}
                    className="z-0"
                  />
                </div>
              ) : option.icon ? (
                <img src={`/icons/${option.icon}.svg`} height={32} width={32} />
              ) : (
                <span className="font-semibold text-base text-gray-50">
                  {option.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default NavBar;
