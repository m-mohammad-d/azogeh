import { Link } from "react-router-dom";
import MetaTags from "../components/MetaTag";

function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <MetaTags title="صفحه مورد نظر یافت نشد | اذوقه" description="صفحه‌ای که جستجو کردید موجود نیست. لطفاً آدرس صحیح را وارد کنید." keywords="صفحه یافت نشد, خطای ۴۰۴, فروشگاه آنلاین" />
      <h1 className="text-[120px] font-extrabold text-gray-700">404</h1>
      <p className="mb-6 text-2xl font-medium text-gray-600">صفحه پیدا نشد</p>
      <Link to="/" className="rounded-md bg-indigo-500 px-4 py-2 font-medium text-white transition-all duration-200 ease-in-out hover:bg-indigo-600">
        بریم خونه
      </Link>
    </div>
  );
}

export default PageNotFound;
