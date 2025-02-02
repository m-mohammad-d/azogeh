import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  return (
    <HelmetProvider>
      <div>
        <Toaster />
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
};

export default App;
