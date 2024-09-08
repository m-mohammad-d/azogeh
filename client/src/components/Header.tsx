import { Link } from "react-router-dom";
import Search from "./Search";

function Header() {
  return (
    <header>
      <div className="bg-primary-500 w-full h-12"></div>
      <div className="max-w-screen-2xl flex justify-between items-center mt-12 mx-auto">
        <div className="flex items-center gap-8">
          <div>
            <img src="public/logo.png" />
          </div>
          <Search />
        </div>
        <div>
          <Link
            to="/login"
            className="flex items-center gap-2 bg-primary-500 px-8 py-3 rounded-lg shadow-lg text-white hover:bg-primary-600 transition duration-200"
          >
            <img src="/public/icon/user.svg" alt="User Icon" className="h-6 w-6" />
            <span>ورود / ثبت نام</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
