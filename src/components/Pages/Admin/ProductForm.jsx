import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import api from "../../../api";

yup.setLocale(pt);

const schema = yup
  .object({
    name: yup.string().required(),
    image: yup.mixed().required(),
    price: yup.number().min(0.01).max(999.99).required(),
    brand: yup.string().required(),
    stockCount: yup.number().integer().min(1).max(99).required(),
    color: yup.string().required(),
    size: yup.string().required(),
    material: yup.string().required(),
  })
  .required();

function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await api.product.post(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function fetchBrands() {
      const availableBrands = await api.brand.list();
      setBrands(availableBrands);
    }

    fetchBrands();
  }, []);

  return (
    <form
      id="admin-form"
      onSubmit={handleSubmit(onSubmit)}
      className="[&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_label]:font-semibold [&_input]:border [&_input]:rounded-md [&_input]:h-9 [&_input]:px-2 flex flex-col gap-5"
    >
      <div>
        <label>Nome</label>
        <input type="text" {...register("name")} />
        <p className="text-xs font-medium text-red-600">
          {errors.name?.message}
        </p>
      </div>
      <div>
        <label>Imagem</label>
        <input type="file" {...register("image")} />
        <p className="text-xs font-medium text-red-600">
          {errors.image?.message}
        </p>
      </div>
      <div>
        <label>Preço</label>
        <input type="number" {...register("price")} />
        <p className="text-xs font-medium text-red-600">
          {errors.price?.message}
        </p>
      </div>
      <div>
        <label>Marca</label>
        <select
          name="select"
          className="p-2 border-gray-900 border rounded-xl"
          {...register("brand")}
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
        <p className="text-xs font-medium text-red-600">
          {errors.brand?.message}
        </p>
      </div>
      <div>
        <label>Quantidade no estoque</label>
        <input type="number" {...register("stockCount")} />
        <p className="text-xs font-medium text-red-600">
          {errors.stockCount?.message}
        </p>
      </div>
      <div>
        <label>Cor</label>
        <input type="text" {...register("color")} />
        <p className="text-xs font-medium text-red-600">
          {errors.color?.message}
        </p>
      </div>
      <div>
        <label>Tamano</label>
        <input type="text" {...register("size")} />
        <p className="text-xs font-medium text-red-600">
          {errors.size?.message}
        </p>
      </div>
      <div>
        <label>Material</label>
        <input type="text" {...register("material")} />
        <p className="text-xs font-medium text-red-600">
          {errors.material?.message}
        </p>
      </div>
    </form>
  );
}

export default ProductForm;
