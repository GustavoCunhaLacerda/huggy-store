import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import api from "../../../api";
import CartContext from "../../../context/cartContext";
import { useContext } from "react";
import dayjs from "dayjs";

yup.setLocale(pt);

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .matches(phoneRegExp, "Número de telefone inválido."),
  })
  .required();

function CheckoutForm({ setOrder }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const cartContext = useContext(CartContext);

  const onSubmit = async (data) => {
    try {
      const checkoutFormData = {
        buyer: data,
        items: cartContext.cartItems,
        data: dayjs().toString(),
        total: cartContext.price(),
      };
      const orderId = await api.checkout.post(checkoutFormData);
      const order = await api.checkout.index(orderId);
      setOrder(order);
      reset();
      cartContext.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(onSubmit)}
      className="border-2 rounded-md w-full p-4 bg-gray-50 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_label]:font-semibold [&_input]:border [&_input]:rounded-md [&_input]:h-9 [&_input]:px-2 flex flex-col gap-5"
    >
      <h3 className="font-inter text-gray-900 text-xl font-semibold">
        Informações do Comprador
      </h3>
      <div>
        <label>Nome</label>
        <input type="text" {...register("name")} />
        <p className="text-xs font-medium text-red-600">
          {errors.name?.message}
        </p>
      </div>
      <div>
        <label>Email</label>
        <input type="text" {...register("email")} />
        <p className="text-xs font-medium text-red-600">
          {errors.email?.message}
        </p>
      </div>
      <div>
        <label>Telefone</label>
        <input type="text" {...register("phone")} />
        <p className="text-xs font-medium text-red-600">
          {errors.phone?.message}
        </p>
      </div>
    </form>
  );
}

export default CheckoutForm;
