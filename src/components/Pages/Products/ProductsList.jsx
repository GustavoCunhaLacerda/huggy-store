import { useEffect, useState } from "react";
import ProductItem from "./ProductsItem";
import api from "../../../api";
import { useParams } from "react-router-dom";

function ProductList() {
  const params = useParams();

  const [productsList, setProductList] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await api.product.list();

      if (params.size) {
        setProductList(
          res.filter((product) => {
            return (
              product.size ===
              { small: "Pequeno", medium: "Médio", large: "Grande" }[
                params.size
              ]
            );
          })
        );
      } else {
        setProductList(res);
      }
    }

    fetch();
  }, [params.size]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 justify-items-center mt-10">
      {productsList.map((product, index) => {
        return <ProductItem product={product} key={index} />;
      })}
    </div>
  );
}

export default ProductList;
