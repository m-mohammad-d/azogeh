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
import ForgotPassword from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ServicesPage from "./pages/ServicesPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserListPage from "./pages/Dashboard/UserListPage";
import CheckOut from "./pages/CheckOut";
import CreateProduct from "./pages/Dashboard/CreateProduct";

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
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/forget-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPasswordPage />,
      },
      {
        path: "/checkOut",
        element: <CheckOut />,
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
    path: "*",
    element: <PageNotFound />,
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/admin/home", element: <Dashboard /> },
      { path: "admin/add-product", element: <CreateProduct /> },
      { path: "/admin/manage-users", element: <UserListPage /> },
    ],
  },
]);

export default router;
