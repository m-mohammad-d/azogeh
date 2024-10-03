import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./layout/appLayout";
import ProductList from "./pages/ProductList";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
