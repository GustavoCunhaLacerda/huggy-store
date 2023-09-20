import { useEffect, useState } from "react";
import ProductItem from "./ProductsItem";
import api from "../../../api";
import { useParams } from "react-router-dom";

function ProductList() {
  const [productsList, setProductList] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await api.product.list();
      setProductList(res);
    }

    fetch();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 justify-items-center mt-10 px-4">
      {productsList.map((product, index) => {
        return <ProductItem product={product} key={index} />;
      })}
    </div>
  );
}

export default ProductList;
