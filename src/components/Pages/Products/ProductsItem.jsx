import ItemCount from "../../Global/ItemCount";

/* eslint-disable react/prop-types */
function ProductItem({ product }) {
  return (
    <div className="flex justify-between w-[50rem] border p-8">
      <div className="flex flex-col justify-between">
        <span className="text-blue-950 text-3xl font-semibold">
          {product.name}
        </span>
        <span className="text-blue-500 font-semibold text-3xl">
          R$ {product.price}
        </span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-2 items-center">
          <ItemCount stock={product.stock} />
          <span>
            {product.stock.toString().padStart(2, " ")} items disponíveis
          </span>
        </div>
        <button className="border p-2 w-full border-blue-600 text-blue-600">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
