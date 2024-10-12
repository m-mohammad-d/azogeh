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
import ChangePasswordPage from "./pages/UserPanel/ChangePasswordPage";
import Userfavorites from "./pages/UserPanel/Userfavorites";
import OrderHistory from "./pages/UserPanel/OrderHistory";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

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
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
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
              {
                path: "user/change-password",
                element: <ChangePasswordPage />,
              },
              {
                path: "user/favorites",
                element: <Userfavorites />,
              },
              {
                path: "user/order-history",
                element: <OrderHistory />,
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
