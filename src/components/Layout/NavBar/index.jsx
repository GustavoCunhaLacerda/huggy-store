import { Link } from "react-router-dom";

function NavBar() {
  const navOptions = [
    { label: "Home", path: "/" },
    { label: "Ursos", path: "/products" },
    { label: "Pequenos", path: "/products/category/small" },
    { label: "Médios", path: "/products/category/medium" },
    { label: "Grandes", path: "/products/category/large" },
    { label: "Carrinho", path: "/products/large", icon: "cart" },
    { label: "Perfil", path: "/profile", icon: "person" },
  ];

  return (
    <aside className="flex w-full bg-gray-50 border-b border-gray-300 p-6 justify-between">
      <Link to="/" className="flex gap-2 items-center">
        <img src="/public/icons/teddy-bear.svg" className="w-8 h-8" />
        <span className="font-inter font-bold">HUGGY</span>
      </Link>
      <nav className="flex gap-4 items-center">
        {navOptions.map((option, index) => {
          return (
            <Link to={option.path} key={index} className="font-inter">
              {option.icon ? (
                <img src={`/icons/${option.icon}.svg`} height={32} width={32} />
              ) : (
                option.label
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default NavBar;
