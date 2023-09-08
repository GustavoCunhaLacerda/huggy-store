import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function ProductItem({ product }) {
  const navigate = useNavigate();

  function handleNavigation(path) {
    navigate(path);
  }

  function createTeddyId(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    <div className="flex flex-col gap-2">
      <img
        src={`/teddies/teddy-${createTeddyId(1, 4)}.png`}
        className="w-[300px] h-[300px] bg-gray-200 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center">
        <span
          className="text-gray-950 text-xl font-semibold hover:underline cursor-pointer font-inter"
          onClick={() => handleNavigation("/products/" + product.id)}
        >
          {product.name}
        </span>
        <span className="text-xl font-inter" style={{ color: "#e66767" }}>
          R$ {product.price}
        </span>
        <span className="text text-sm " style={{ color: "#596275" }}>
          10x de R$ {String(Math.floor((product.price / 10) * 100) / 100)} s/
          juros
        </span>
      </div>
    </div>
  );
}

export default ProductItem;
