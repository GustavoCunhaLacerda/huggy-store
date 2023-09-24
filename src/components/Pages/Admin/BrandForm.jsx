import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import api from "../../../api";

yup.setLocale(pt);

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

function BrandForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await api.brand.post(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

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
    </form>
  );
}

export default BrandForm;
