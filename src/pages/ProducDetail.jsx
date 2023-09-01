import { useEffect, useState } from "react";
import Default from "../components/Layout/Default";
import { useParams } from "react-router-dom";
import api from "../api";
import ItemCount from "../components/Global/ItemCount";

function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetch() {
      const res = await api.product.index(params.id);
      setProduct(res);
    }
    fetch();
  }, [params.id]);

  return (
    <Default>
      {product ? (
        <div className="flex flex-col md:flex-row h-full w-full items-center justify-center gap-10">
          <div className="bg-slate-200 w-[300px] h-[440px]"></div>
          <div className="flex flex-col gap-6">
            <span className="text-blue-950 text-3xl font-semibold">
              {product.name}
            </span>
            <span className="text-blue-500 font-semibold text-3xl">
              R$ {product.price}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-sm">
                Marca: {product.brand}
              </span>
              <span className="text-gray-500 text-sm">
                Material: {product.material}
              </span>
              <span className="text-gray-500 text-sm">
                Cor: {product.color}
              </span>
              <span className="text-gray-500 text-sm">
                Tamanho: {product.size}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <ItemCount stock={product.stockCount} />
                <span>
                  {product.stockCount.toString().padStart(2, " ")} items
                  disponíveis
                </span>
              </div>
              <button className="border p-2 w-full border-blue-600 text-blue-600 hover:bg-blue-100">
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      ) : (
        "loading..."
      )}
    </Default>
  );
}

export default ProductDetail;
