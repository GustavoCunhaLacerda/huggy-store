import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import api from "../../../api";
import { useState } from "react";

yup.setLocale(pt);

const schema = yup
  .object({
    label: yup.string().required(),
  })
  .required();

function ColorForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await api.color.post(data);
      reset();
      setColor("");
    } catch (error) {
      console.log(error);
    }
  };

  const [color, setColor] = useState("");

  return (
    <form
      id="admin-form"
      onSubmit={handleSubmit(onSubmit)}
      className="[&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_label]:font-semibold [&_input]:border [&_input]:rounded-md [&_input]:h-9 [&_input]:px-2 flex flex-col gap-5"
    >
      <div>
        <label>Cor</label>
        <div className="flex w-full gap-1 items-center">
          <input
            value={color}
            type="text"
            {...register("label")}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            className="w-full"
          />
          <p className="text-xs font-medium text-red-600">
            {errors.label?.message}
          </p>
        </div>
      </div>
    </form>
  );
}

export default ColorForm;
