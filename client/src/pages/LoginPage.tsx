import { ErrorResponse, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaGithub, FaGoogle } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { useLoginMutation } from "../services/UsersApi";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/InputField";

const schema = z.object({
  email: z.string().email("ایمیل نامعتبر است.").nonempty("ایمیل نمی‌تواند خالی باشد."),
  password: z.string().min(8, "پسورد باید حداقل 8 کاراکتر باشد.").max(15, "پسورد باید حداکثر 15 کاراکتر باشد."),
});

type FormData = z.infer<typeof schema>;

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data).unwrap();
      navigate("/");
    } catch (error: unknown) {
      toast.error((error as ErrorResponse).data.message, {
        duration: 6000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-gray-100 border">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          به <span className="text-primary-500">اذوقه</span> خوش آمدید
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            id="email"
            type="email"
            label="ایمیل"
            placeholder="ایمیل"
            register={register}
            error={errors.email}
          />

          <InputField
            id="password"
            type={showPassword ? "text" : "password"}
            label="پسورد"
            placeholder="پسورد"
            register={register}
            error={errors.password}
          />
          <div className="mb-6 relative">
            {showPassword ? (
              <FaEye className="absolute top-7 left-6 cursor-pointer" onClick={() => setShowPassword(false)} />
            ) : (
              <RiEyeCloseLine className="absolute top-7 left-6 cursor-pointer" onClick={() => setShowPassword(true)} />
            )}
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
            <Link to="/forget-password" className="text-primary-600 hover:underline">
              فراموشی رمز عبور
            </Link>
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
