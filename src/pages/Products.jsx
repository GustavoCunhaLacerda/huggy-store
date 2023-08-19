import ItemCount from "../components/Global/ItemCount";
import Default from "../components/Layout/Default";

function Products() {
  const productsList = [
    { name: "Produto 1", price: 1.99, stock: 10 },
    { name: "Produto 2", price: 15.6, stock: 5 },
    { name: "Produto 3", price: 200.0, stock: 0 },
  ];

  return (
    <Default>
      <div className="flex h-full w-full items-center justify-center flex-col gap-6">
        {productsList.map((product, index) => {
          return (
            <div
              key={index}
              className="flex justify-between w-[50rem] border p-8"
            >
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
                  {/* <span>Quantidade: </span> */}
                  <ItemCount stock={product.stock} />
                  <span>
                    {product.stock.toString().padStart(2, " ")} items
                    disponíveis
                  </span>
                </div>
                <button className="border p-2 w-full border-blue-600 text-blue-600">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Default>
  );
}

export default Products;
