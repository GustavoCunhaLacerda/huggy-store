import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function ProductItem({ product }) {
  const navigate = useNavigate();

  function handleNavigation(path) {
    navigate(path);
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-[210px] h-[300px] bg-gray-200 cursor-pointer"
        onClick={() => handleNavigation("/products/" + product.id)}
      />
      <div className="flex flex-col">
        <span className="text-gray-950 text-xl font-semibold hover:underline cursor-pointer font-inter">
          {product.name}
        </span>
        <span className="text-blue-500 text-xl hover:underline cursor-pointer font-inter">
          R$ {product.price}
        </span>
        <span>{product.size}</span>
      </div>
    </div>
  );
}

export default ProductItem;
