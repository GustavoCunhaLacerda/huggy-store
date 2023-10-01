import { useEffect, useReducer, useState } from "react";
import api from "../api";
import ProductForm from "../components/Pages/Admin/ProductForm";
import BrandForm from "../components/Pages/Admin/BrandForm";
import ColorForm from "../components/Pages/Admin/ColorForm";
import SizeForm from "../components/Pages/Admin/SizeForm";

function Admin() {
  const initialFormState = {};
  const [reload, setReload] = useState(true);
  const [docForm, setDocForm] = useState("PRODUCT");
  const [docs, setDocs] = useState([]);

  async function handleRemoveDoc(id) {
    switch (docForm) {
      case "BRAND":
        await api.brand.delete(id);
        break;
      case "PRODUCT":
        await api.product.delete(id);
        break;
      case "SIZE":
        await api.size.delete(id);
        break;
      case "COLOR":
        await api.color.delete(id);
        break;
      default:
        break;
    }

    setReload(true);
  }

  function form() {
    switch (docForm) {
      case "BRAND":
        return <BrandForm />;
      case "PRODUCT":
        return <ProductForm />;
      case "SIZE":
        return <SizeForm />;
      case "COLOR":
        return <ColorForm />;

      default:
        break;
    }
  }

  useEffect(() => {
    async function fetchDocs() {
      let docsData = [];

      switch (docForm) {
        case "BRAND":
          docsData = await api.brand.list();
          break;
        case "PRODUCT":
          docsData = await api.product.list();
          break;
        case "COLOR":
          docsData = await api.color.list();
          break;
        case "SIZE":
          docsData = await api.size.list();
          break;
        default:
          break;
      }
      setDocs(docsData);
    }

    if (reload) {
      fetchDocs();

      setReload(false);
    }
  }, [docForm, reload]);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="w-full  bg-gray-50 p-8 border">
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
          <option value="COLOR">Cor</option>
          <option value="SIZE">Tamanho</option>
        </select>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-96 border-2 bg-gray-50 p-5 mt-4 gap-5 flex flex-col rounded-xl h-full">
          {form()}
          <button
            type="submit"
            form="admin-form"
            onClick={() =>
              setTimeout(() => {
                setReload(true);
              }, 1000)
            }
            className="bg-blue-500 p-3 rounded-lg font-semibold text-sm text-white hover:bg-blue-500/50"
          >
            CADASTRAR
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {docs.map((doc, index) => {
          return (
            <div
              className="border-2 bg-gra p-4 rounded-lg flex justify-between items-center"
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

export default Admin;
