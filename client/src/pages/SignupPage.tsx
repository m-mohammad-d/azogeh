import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { useSignUpMutation } from "../services/UsersApi";
import { setItemLocal } from "../utils/localStorageUtils";
import { log } from "console";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signup] = useSignUpMutation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);

    const response = await signup(formData).unwrap();
    console.log(response);

    setItemLocal("token", response.data.user);
  }

  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-gray-100 border">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          ثبت نام در <span className="text-primary-500">اذوقه</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <CustomInput
              type="text"
              name="name"
              placeholder="نام کاربری"
              value={formData.name}
              onChange={handleChange}
              className="mt-1"
              label="نام کاربری"
            />
          </div>

          <div className="mb-4">
            <CustomInput
              type="email"
              name="email"
              placeholder="ایمیل"
              value={formData.email}
              onChange={handleChange}
              className="mt-1"
              label="ایمیل"
            />
          </div>

          <div className="mb-6 relative">
            <CustomInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="پسورد"
              value={formData.password}
              onChange={handleChange}
              className="mt-1"
              label="پسورد"
            />
            {showPassword ? (
              <FaEye className="absolute top-7 left-6" onClick={() => setShowPassword(false)} />
            ) : (
              <RiEyeCloseLine className="absolute top-7 left-6" onClick={() => setShowPassword(true)} />
            )}
          </div>

          <div className="mb-6 relative">
            <CustomInput
              type={showConfirmPassword ? "text" : "password"}
              name="passwordConfirmation"
              placeholder="تکرار پسورد"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              className="mt-1"
              label=" تکرار پسورد"
            />
            {showConfirmPassword ? (
              <FaEye className="absolute top-7 left-6" onClick={() => setShowConfirmPassword(false)} />
            ) : (
              <RiEyeCloseLine className="absolute top-7 left-6" onClick={() => setShowConfirmPassword(true)} />
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
