function NavBar() {
  const navOptions = [
    { label: "Home", path: "home" },
    { label: "Produtos", path: "products" },
    { label: "Carrinho", path: "cart" },
    { label: "Perfil", path: "profile" },
  ];

  return (
    <aside className="flex w-full bg-gray-50 border-b border-gray-300 p-6 justify-between">
      <div>LOGO</div>
      <nav className="flex gap-4">
        {navOptions.map((option) => {
          return (
            <a onClick={option.action} href={option.path}>
              {option.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export default NavBar;
