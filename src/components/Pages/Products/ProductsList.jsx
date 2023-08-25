import { useEffect, useState } from "react";
import ProductItem from "./ProductsItem";
import api from "../../../api";

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
    <div className="flex h-full w-full items-center justify-center flex-col gap-6">
      {productsList.map((product, index) => {
        return <ProductItem product={product} key={index} />;
      })}
    </div>
  );
}

export default ProductList;
