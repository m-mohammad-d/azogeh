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
import InputField from "../components/InputField"

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
          <InputField
            id="name"
            type="text"
            label="نام و نام خانوادگی"
            placeholder="نام و نام خانوادگی"
            register={register}
            error={errors.name}
          />

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

          <InputField
            id="passwordConfirmation"
            type={showConfirmPassword ? "text" : "password"}
            label="تکرار پسورد"
            placeholder="تکرار پسورد"
            register={register}
            error={errors.passwordConfirmation}
          />
          <div className="mb-6 relative">
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
