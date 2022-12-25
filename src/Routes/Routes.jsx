import { createBrowserRouter } from "react-router-dom";
import BookingProducts from "../components/BookingProducts/BookingProducts";
import Home from "../components/Home/Home";
import ProductsTable from "../components/ProductsTable/ProductsTable";
import ReturnProducts from "../components/ReturnProducts/ReturnProducts";
import Main from "../Layout/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <ProductsTable />,
      },
      {
        path: "/bookings",
        element: <BookingProducts />,
      },
      {
        path: "/return-products",
        element: <ReturnProducts />,
      },
    ],
  },
]);

export default router;
