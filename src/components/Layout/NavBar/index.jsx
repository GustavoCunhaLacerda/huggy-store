function NavBar() {
  const navOptions = [
    { label: "Home", path: "home" },
    { label: "Produtos", path: "products" },
    { label: "Carrinho", path: "cart", icon: "cart" },
    { label: "Perfil", path: "profile", icon: "person" },
  ];

  return (
    <aside className="flex w-full bg-gray-50 border-b border-gray-300 p-6 justify-between">
      <div>LOGO</div>
      <nav className="flex gap-4 items-center">
        {navOptions.map((option, index) => {
          return (
            <a onClick={option.action} href={option.path} key={index}>
              {option.icon ? <img src={`/icons/${option.icon}.svg`} height={32} width={32}/> : option.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export default NavBar;
