import { useEffect, useState } from "react";
import ProductItem from "./ProductsItem";
import api from "../../../api";

function ProductList() {
  const [productsList, setProductList] = useState([]);
  const [computedProductsList, setComputedProductsList] = useState([]);
  const [search, setSearch] = useState("");

  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function fetch() {
      const res = await api.product.list();
      setProductList(res);
      setComputedProductsList(res);
    }

    async function fetchOptions() {
      const availableBrands = await api.brand.list();
      setBrands(availableBrands);

      const availableSizes = await api.size.list();
      setSizes(availableSizes);

      const availableColors = await api.color.list();
      setColors(availableColors);
    }

    fetchOptions();
    fetch();
  }, []);

  useEffect(() => {
    const filteredList = productsList
      .filter((product) => {
        return Object.values(product)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      })
      .filter((product) => {
        if (selectedBrand === "") return true;
        if (product.brand === selectedBrand) return true;
        return false;
      })
      .filter((product) => {
        if (selectedColor === "") return true;
        if (product.color === selectedColor) return true;
        return false;
      })
      .filter((product) => {
        if (selectedSize === "") return true;
        if (product.size === selectedSize) return true;
        return false;
      });

    setComputedProductsList(filteredList);
  }, [search, selectedBrand, selectedColor, selectedSize]);

  useEffect(() => {
    const filteredList = computedProductsList;

    setComputedProductsList(filteredList);
  }, []);

  return (
    <>
      <div className="flex px-16 pt-10 justify-between">
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
      <div className="px-16 py-10 flex gap-6">
        <div className="flex items-center gap-2">
          <span>Marca: </span>
          <select
            name="select"
            className="px-3 py-2 border-gray-900 border rounded-md"
            onChange={(e) => setSelectedBrand(e.target.value)}
            value={selectedBrand}
          >
            <option value={""}>Todos</option>
            {brands.map((brand) => {
              return (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span>Cor: </span>
          <select
            name="select"
            className="px-3 py-2 border-gray-900 border rounded-md"
            onChange={(e) => setSelectedColor(e.target.value)}
            value={selectedColor}
          >
            <option value={""}>Todos</option>
            {colors.map((color) => {
              return (
                <option key={color.id} value={color.label}>
                  {color.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span>Tamanho: </span>
          <select
            name="select"
            className="px-3 py-2 border-gray-900 border rounded-md"
            onChange={(e) => setSelectedSize(e.target.value)}
            value={selectedSize}
          >
            <option value={""}>Todos</option>
            {sizes.map((size) => {
              return (
                <option key={size.id} value={size.label}>
                  {size.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {computedProductsList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
          {computedProductsList.map((product, index) => {
            return <ProductItem product={product} key={index} />;
          })}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-semibold text-lg font-inter">
            Nenhum produto encontrado
          </span>
        </div>
      )}
    </>
  );
}

export default ProductList;
