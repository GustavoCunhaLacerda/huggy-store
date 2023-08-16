import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-screen w-screen justify-center">
      <div className="h-full w-[900px] bg-red-200"></div>
    </div>
  );
}

export default App;
