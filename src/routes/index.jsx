import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Products from "../pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

export default router;
