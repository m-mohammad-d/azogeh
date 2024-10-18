import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { useSignUpMutation } from "../services/UsersApi";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorResponse } from "../types/ErrorType";

const schema = z
  .object({
    name: z.string().min(3, "نام باید حداقل 3 کاراکتر باشد.").max(15, "نام باید حداکثر 15 کاراکتر باشد."),
    email: z.string().email("ایمیل نامعتبر است.").nonempty("ایمیل نمی‌تواند خالی باشد."),
    password: z.string().min(8, "پسورد باید حداقل 8 کاراکتر باشد.").max(15, "پسورد باید حداکثر 15 کاراکتر باشد."),
    passwordConfirmation: z
      .string()
      .min(8, "تکرار پسورد باید حداقل 8 کاراکتر باشد.")
      .max(15, "تکرار پسورد باید حداکثر 15 کاراکتر باشد."),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: "پسوردها مطابقت ندارند.",
    path: ["passwordConfirmation"],
  });

type FormData = z.infer<typeof schema>;

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signup] = useSignUpMutation();
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
      await signup(data).unwrap();
      navigate("/");
    } catch (error: unknown) {
      if ((error as ErrorResponse).data.message) {
        const serverError = error as ErrorResponse;
        toast.error(serverError.data.message, {
          duration: 6000,
        });
      } else {
        toast.error("خطای ناشناخته‌ای رخ داد.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-gray-100 border">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          ثبت نام در <span className="text-primary-500">اذوقه</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <div className="relative mb-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="relative bg-inherit">
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={`peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ${
                      errors.name ? "ring-red-500" : "ring-gray-500"
                    } focus:ring-sky-600 focus:outline-none focus:border-rose-600`}
                    placeholder="نام و نام خانوادگی"
                  />
                  <label
                    htmlFor="name"
                    className="absolute cursor-text right-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    نام و نام خانوادگی
                  </label>
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative mb-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="relative bg-inherit">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ${
                      errors.email ? "ring-red-500" : "ring-gray-500"
                    } focus:ring-sky-600 focus:outline-none focus:border-rose-600`}
                    placeholder="ایمیل"
                  />
                  <label
                    htmlFor="email"
                    className="absolute cursor-text right-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    ایمیل
                  </label>
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          <div className="mb-6 relative">
            <div className="relative mb-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="relative bg-inherit">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ${
                      errors.password ? "ring-red-500" : "ring-gray-500"
                    } focus:ring-sky-600 focus:outline-none focus:border-rose-600`}
                    placeholder="پسورد"
                  />
                  <label
                    htmlFor="password"
                    className="absolute cursor-text right-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    پسورد
                  </label>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>
            {showPassword ? (
              <FaEye className="absolute top-7 left-6 cursor-pointer" onClick={() => setShowPassword(false)} />
            ) : (
              <RiEyeCloseLine className="absolute top-7 left-6 cursor-pointer" onClick={() => setShowPassword(true)} />
            )}
          </div>

          <div className="mb-6 relative">
            <div className="relative mb-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="relative bg-inherit">
                  <input
                    id="passwordConfirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("passwordConfirmation")}
                    className={`peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ${
                      errors.passwordConfirmation ? "ring-red-500" : "ring-gray-500"
                    } focus:ring-sky-600 focus:outline-none focus:border-rose-600`}
                    placeholder="تکرار پسورد"
                  />
                  <label
                    htmlFor="passwordConfirmation"
                    className="absolute cursor-text right-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    تکرار پسورد
                  </label>
                </div>
                {errors.passwordConfirmation && (
                  <p className="text-red-500 text-xs mt-1">{errors.passwordConfirmation.message}</p>
                )}
              </div>
            </div>
            {showConfirmPassword ? (
              <FaEye className="absolute top-7 left-6 cursor-pointer" onClick={() => setShowConfirmPassword(false)} />
            ) : (
              <RiEyeCloseLine
                className="absolute top-7 left-6 cursor-pointer"
                onClick={() => setShowConfirmPassword(true)}
              />
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
