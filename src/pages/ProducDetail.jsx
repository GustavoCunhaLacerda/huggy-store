import { useContext, useEffect, useState } from "react";
import Default from "../components/Layout/Default";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import ItemCount from "../components/Global/ItemCount";
import CartContext from "../context/cartContext";

function ProductDetail() {
  const cartContext = useContext(CartContext);
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetch() {
      const res = await api.product.index(params.id);
      setProduct(res);
    }

    fetch();
  }, [params.id]);

  function addToCart() {
    if (count === 0) {
      return;
    }
    cartContext.addItem(product, count);
    navigate("/cart");
  }

  return (
    <Default>
      {product ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex gap-12 items-center">
            {/* IMG */}
            <img
              className="h-72 w-72 bg-white rounded-xl object-contain p-6 border border-gray-200 shadow-md"
              src={product.image}
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-inter text-blue-600 font-semibold">
                {product.brand}
              </h2>
              <h1 className="text-5xl font-inter text-gray-900 font-bold">
                {product.name}
              </h1>
              <h2 className="text-2xl font-inter text-gray-900 font-semibold">
                R$ {product.price}
              </h2>
              <div className="flex gap-4 items-center">
                <ItemCount
                  count={count}
                  setCount={setCount}
                  limit={product.stockCount}
                />
                <button
                  className="bg-blue-500 items-center justify-center flex h-11 w-full rounded-xl hover:bg-blue-500/50"
                  onClick={addToCart}
                >
                  <span className="text-white text-sm font-semibold">
                    Adicionar no Carrinho
                  </span>
                </button>
              </div>
              <h3 className="text-xs font-inter text-gray-900 font-normal -mt-2">
                {product.stockCount} produtos disponíveis
              </h3>
            </div>
          </div>
        </div>
      ) : null}
    </Default>
  );
}

export default ProductDetail;
