import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { UserProvider } from "./Context/UserProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
