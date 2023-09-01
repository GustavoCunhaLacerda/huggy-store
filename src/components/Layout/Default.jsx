import NavBar from "./NavBar";

// eslint-disable-next-line react/prop-types
function Default({ children }) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-x-clip overflow-y-auto">
      <NavBar />
      {children}
    </div>
  );
}

export default Default;
