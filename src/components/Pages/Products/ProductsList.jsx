import { useEffect, useState } from "react";
import ProductItem from "./ProductsItem";
import api from "../../../api";

function ProductList() {
  const [productsList, setProductList] = useState([]);
  const [computedProductsList, setComputedProductsList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetch() {
      const res = await api.product.list();
      setProductList(res);
      setComputedProductsList(res);
    }

    fetch();
  }, []);

  useEffect(() => {
    const filteredList = productsList.filter((product) => {
      return Object.values(product)
        .join("")
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    setComputedProductsList(filteredList);
  }, [search]);

  return (
    <>
      <div className="flex px-16 py-10 justify-between">
        <h1 className="font-inter text-2xl font-semibold text-gray-900">
          Ursos
        </h1>
        <input
          type="text"
          className="border border-gray-500 rounded-md px-3 py-2"
          placeholder="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 justify-items-center">
        {computedProductsList.map((product, index) => {
          return <ProductItem product={product} key={index} />;
        })}
      </div>
    </>
  );
}

export default ProductList;
