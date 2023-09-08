import { Link } from "react-router-dom";

function NavBar() {
  const navOptions = [
    // { label: "Home", path: "/" },
    { label: "Ursos", path: "/products" },
    // { label: "Pequenos", path: "/products/category/small" },
    // { label: "Médios", path: "/products/category/medium" },
    // { label: "Grandes", path: "/products/category/large" },
    { label: "Carrinho", path: "/products/large", icon: "cart" },
    { label: "Perfil", path: "/profile", icon: "person" },
  ];

  return (
    <aside className="flex w-full p-6 justify-between bg-gray-50 border-b">
      <Link to="/" className="flex gap-2 items-center">
        <img src="/public/icons/teddy-bear.svg" className="w-10 h-10" />
        <span
          className="font-inter font-normal text-2xl"
          style={{ color: "#546de5" }}
        >
          HUGGY
        </span>
      </Link>
      <nav className="flex gap-4 items-center">
        {navOptions.map((option, index) => {
          return (
            <Link to={option.path} key={index} className="font-inter">
              {option.icon ? (
                <img src={`/icons/${option.icon}.svg`} height={32} width={32} />
              ) : (
                <span
                  style={{ color: "#e66767" }}
                  className="font-semibold text-base"
                >
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
