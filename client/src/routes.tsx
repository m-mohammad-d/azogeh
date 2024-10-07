import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./layout/appLayout";
import ProductList from "./pages/ProductList";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserLayout from "./layout/UserLayout";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./layout/AdminLayout";
import UpdateInfoPage from "./pages/UserPanel/UpdateInfoPage";
import PageNotFound from "./pages/PageNotFound";
import CartPage from "./pages/CartPage";

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
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <UserLayout />,
            children: [
              {
                path: "user/edit-profile",
                element: <UpdateInfoPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
