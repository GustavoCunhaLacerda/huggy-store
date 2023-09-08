// eslint-disable-next-line react/prop-types
function ItemCount({ count, setCount, limit }) {
  function increment() {
    if (limit === 0) {
      return 0;
    }

    if (limit) {
      setCount((curr) => Math.min(limit, curr + 1));
    } else {
      setCount((curr) => curr + 1);
    }
  }

  function decrement() {
    if (limit === 0) {
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
