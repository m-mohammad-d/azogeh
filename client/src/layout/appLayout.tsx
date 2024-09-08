import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function AppLayout() {
  return (
    <div className="flex flex-col  min-h-screen">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
