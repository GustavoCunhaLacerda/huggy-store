import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function ProductItem({ product }) {
  const navigate = useNavigate();

  function handleNavigation(path) {
    navigate(path);
  }

  return (
    <div
      className="flex flex-col gap-2 p-5 border border-gray-200 rounded-xl shadow-md cursor-pointer bg-white"
      onClick={() => handleNavigation("/products/" + product.id)}
    >
      <img
        src={product.image}
        className="w-[300px] h-[300px] bg-white cursor-pointer object-contain rounded-xl"
      />
      <div className="flex flex-col items-center justify-center">
        <span className="text-gray-950 text-xl font-semibold  font-inter align-middle text-center hover:underline">
          {product.name}
        </span>
        <span className="text-2xl font-inter font-semibold text-blue-600">
          R$ {product.price}
        </span>
        <span className="text text-sm text-gray-600">
          10x de R$ {String(Math.floor((product.price / 10) * 100) / 100)} s/
          juros
        </span>
      </div>
    </div>
  );
}

export default ProductItem;
