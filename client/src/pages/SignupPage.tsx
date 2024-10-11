import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-gray-100 border">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          ثبت نام در <span className="text-primary-500">اذوقه</span>
        </h1>

        <form>
          <div className="mb-4">
            <CustomInput
              type="text"
              id="username"
              placeholder="نام کاربری"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mt-1"
              label="نام کاربری"
            />
          </div>

          <div className="mb-4">
            <CustomInput
              type="email"
              id="email"
              placeholder="ایمیل"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1"
              label="ایمیل"
            />
          </div>

          <div className="mb-6 relative">
            <CustomInput
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="پسورد"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1"
              label="پسورد"
            />
            {showPassword ? (
              <FaEye className="absolute top-7 left-6" onClick={() => setShowPassword(false)} />
            ) : (
              <RiEyeCloseLine className="absolute top-7 left-6" onClick={() => setShowPassword(true)} />
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              ثبت نام
            </button>
          </div>
        </form>

        <div className="text-center space-x-5">
          <p className="text-sm text-gray-600">
            حساب کاربری دارید؟
            <Link to="/login" className="text-primary-400 hover:underline ml-2">
              ورود
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
