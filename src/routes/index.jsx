import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProducDetail";
import Admin from "../pages/Admin";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/category/:size",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
