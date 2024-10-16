import { ErrorResponse, Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { FaEye, FaGithub, FaGoogle } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { useLoginMutation } from "../services/UsersApi";
import { toast } from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrors({ email: "", password: "" });
    if (!email) {
      setErrors(prev => ({ ...prev, email: "ایمیل نمی‌تواند خالی باشد." }));
      return;
    }

    if (!password) {
      setErrors(prev => ({ ...prev, password: "پسورد نمی‌تواند خالی باشد." }));
      return;
    }

    if (password.length < 8 || password.length > 15) {
      setErrors(prev => ({ ...prev, password: "پسورد باید بین 8 تا 15 کاراکتر باشد." }));
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();
      console.log(response);

      if (response.status === "success") {
        navigate("/user/edit-profile");
      }
    } catch (error: unknown) {
      toast.error((error as ErrorResponse).data.message, {
        duration: 6000,
      });
    }
  }

  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-gray-100 border">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          به <span className="text-primary-500">اذوقه</span> خوش آمدید
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <CustomInput
              type="email"
              name="email"
              placeholder="ایمیل"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1"
              label="ایمیل"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="mb-6 relative">
            <CustomInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="پسورد"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1"
              label="پسورد"
            />
            {showPassword ? (
              <FaEye className="absolute top-7 left-6 cursor-pointer" onClick={() => setShowPassword(false)} />
            ) : (
              <RiEyeCloseLine className="absolute top-7 left-6 cursor-pointer" onClick={() => setShowPassword(true)} />
            )}
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              ورود
            </button>
          </div>

          <div className="flex justify-between items-center text-sm mb-4">
            <a href="#" className="text-primary-600 hover:underline">
              فراموشی رمز عبور
            </a>
          </div>

          <div className="text-center mb-4 text-gray-500">یا وارد شوید با</div>

          <div className="flex gap-4 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <FaGoogle />
              ورود با Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-900"
            >
              <FaGithub />
              ورود با GitHub
            </button>
          </div>
        </form>

        <div className="text-center space-x-5">
          <p className="text-sm text-gray-600">
            حساب کاربری ندارید؟
            <Link to="/signup" className="text-primary-400 hover:underline ml-2">
              ثبت نام
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
