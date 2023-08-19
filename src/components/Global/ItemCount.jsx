import { useState } from "react";

function ItemCount({ stock }) {
  const [count, setCount] = useState(0);

  function increment() {
    if (stock === 0) {
      return 0;
    }

    if (stock) {
      setCount((curr) => Math.min(stock, curr + 1));
    } else {
      setCount((curr) => curr + 1);
    }
  }

  function decrement() {
    if (stock === 0) {
      return 0;
    }

    setCount((curr) => Math.max(0, curr - 1));
  }

  return (
    <div className="flex border justify-between items-center px-4 py-2 w-24">
      <button onClick={decrement}>-</button>
      <span>{count.toString().padStart(2, " ")}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default ItemCount;
