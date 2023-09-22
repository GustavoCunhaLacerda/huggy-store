import { useEffect, useReducer, useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../service/firebase";
import api from "../api";

function Admin() {
  const initialFormState = {};
  const [reload, setReload] = useState(true);
  const [docForm, setDocForm] = useState("PRODUCT");
  const [docs, setDocs] = useState([]);

  const [state, dispatch] = useReducer((state, value) => {
    if (value === "RESET") {
      return {};
    }
    return { ...state, ...value };
  }, initialFormState);

  const [brands, setBrands] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(state);

    switch (docForm) {
      case "BRAND":
        await api.brand.post(state);
        break;
      case "PRODUCT":
        await api.product.post(state);
        break;
      default:
        break;
    }

    setReload(true);
  }

  async function handleRemoveDoc(id) {
    console.log({ id });
    switch (docForm) {
      case "BRAND":
        await api.brand.delete(id);
        break;
      case "PRODUCT":
        await api.product.delete(id);
        break;
      default:
        break;
    }

    setReload(true);
  }

  useEffect(() => {
    dispatch("RESET");

    async function fetchBrands() {
      const availableBrands = await api.brand.list();
      setBrands(availableBrands);
    }

    async function fetchDocs() {
      let docsData = [];

      switch (docForm) {
        case "BRAND":
          docsData = await api.brand.list();
          break;
        case "PRODUCT":
          docsData = await api.product.list();
          break;
        default:
          break;
      }
      setDocs(docsData);
    }

    if (reload) {
      fetchBrands();
      fetchDocs();

      setReload(false);
    }
  }, [docForm, reload]);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="w-full  bg-gray-50 p-8">
        <span className="font-inter font-semibold mr-2">
          Classe de gerenciamento:{" "}
        </span>
        <select
          name="select"
          className="p-2 border-gray-900 border rounded-xl"
          value={docForm}
          onChange={(ev) => {
            setDocForm(ev.target.value);
            setReload(true);
          }}
        >
          <option value="PRODUCT" defaultValue>
            Produto
          </option>
          <option value="BRAND">Marca</option>
        </select>
      </div>
      <form
        onSubmit={handleSubmit}
        className="h-full w-full flex justify-center items-center"
      >
        <div className="flex flex-col w-96 [&>div]:flex [&>div]:flex-col  bg-gray-50 p-10 gap-4 rounded-xl [&_label]:font-semibold [&_input]:border [&_input]:rounded-md [&_input]:h-9 [&_input]:px-2">
          {docForm === "PRODUCT" ? (
            <_ProductForm state={state} dispatch={dispatch} brands={brands} />
          ) : docForm === "BRAND" ? (
            <_BrandForm state={state} dispatch={dispatch} />
          ) : null}
          <button
            type="submit"
            className="bg-blue-500 p-3 rounded-lg font-semibold text-sm text-white hover:bg-blue-500/50"
          >
            CADASTRAR
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-2 p-4">
        {docs.map((doc, index) => {
          return (
            <div
              className="border p-4 rounded-lg flex justify-between items-center"
              key={doc.id}
            >
              <div className="flex flex-col font-inter text-sm gap-2">
                {Object.keys(doc).map((key, index) => {
                  if (key === "image") {
                    return (
                      <img
                        src={doc[key]}
                        width={100}
                        height={100}
                        key={index}
                      />
                    );
                  }
                  return (
                    <p key={index}>
                      <strong className="uppercase">{key}: </strong> {doc[key]}
                    </p>
                  );
                })}
              </div>
              <button
                onClick={() => handleRemoveDoc(doc.id)}
                className="text-sm flex items-center border-red-500 border hover:bg-red-500/50 font-semibold font-inter p-2 text-red-500 rounded-xl"
              >
                EXCLUIR
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function _ProductForm({ state, dispatch, brands }) {
  return (
    <>
      <div>
        <label>Nome</label>
        <input
          type="text"
          value={state.name || ""}
          onChange={(e) => dispatch({ name: e.target.value })}
        />
      </div>
      <div>
        <label>Imagem</label>
        <input
          type="file"
          onChange={(e) => dispatch({ image: e.target.files[0] })}
        />
      </div>
      <div>
        <label>Preço</label>
        <input
          type="number"
          value={state.price || 0}
          onChange={(e) => dispatch({ price: parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <label>Marca</label>
        <select
          name="select"
          className="p-2 border-gray-900 border rounded-xl"
          value={state.brand || ""}
          onChange={(e) => {
            console.log(e.target.value);
            dispatch({ brand: e.target.value });
          }}
        >
          <option value={null}>Nenhum</option>
          {brands.map((brand) => {
            return (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label>Quantidade no estoque</label>
        <input
          type="number"
          value={state.stockCount || 0}
          onChange={(e) => dispatch({ stockCount: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <label>Cor</label>
        <input
          type="text"
          value={state.color || ""}
          onChange={(e) => dispatch({ color: e.target.value })}
        />
      </div>
      <div>
        <label>Tamano</label>
        <input
          type="text"
          value={state.size || ""}
          onChange={(e) => dispatch({ size: e.target.value })}
        />
      </div>
      <div>
        <label>Material</label>
        <input
          type="text"
          value={state.material || ""}
          onChange={(e) => dispatch({ material: e.target.value })}
        />
      </div>
    </>
  );
}

function _BrandForm({ state, dispatch }) {
  return (
    <>
      <div>
        <label>Nome</label>
        <input
          type="text"
          value={state.name || ""}
          onChange={(e) => dispatch({ name: e.target.value })}
        />
      </div>
    </>
  );
}

export default Admin;
