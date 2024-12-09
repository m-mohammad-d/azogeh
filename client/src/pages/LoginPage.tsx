import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { useGetMeQuery, useLoginMutation } from "../services/UsersApi";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorResponse } from "../types/ErrorType";
import InputField from "../components/InputField";
import SmallSpinner from "../components/SmallSpinner";
import ReCAPTCHA from "react-google-recaptcha";
const schema = z.object({
  email: z.string().email("ایمیل نامعتبر است.").nonempty("ایمیل نمی‌تواند خالی باشد."),
  password: z.string().min(8, "پسورد باید حداقل 8 کاراکتر باشد.").max(15, "پسورد باید حداکثر 15 کاراکتر باشد."),
});

type FormData = z.infer<typeof schema>;

function LoginPage() {
  const { data: user } = useGetMeQuery({});
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const recaptchaRef = useRef<ReCAPTCHA | null>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const backUrl = queryParams.get("backUrl") || "/";

  useEffect(() => {
    if (user) navigate(backUrl);
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!recaptchaRef.current?.getValue()) {
      toast.error("تایید کنید که ربات نیستید");
      return;
    }
    try {
      await login(data).unwrap();
      await navigate(backUrl);
    } catch (error: unknown) {
      toast.error((error as ErrorResponse).data.message, { duration: 6000 });
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
          <div className="relative mb-6">
            <InputField
              id="password"
              type={showPassword ? "text" : "password"}
              label="پسورد"
              placeholder="پسورد"
              register={register}
              error={errors.password}
            />
            <div className="absolute top-7 left-6 cursor-pointer text-gray-500">
              {showPassword ? (
                <FaEye onClick={() => setShowPassword(false)} />
              ) : (
                <RiEyeCloseLine onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
          <div className="mb-6 flex justify-center">
            <ReCAPTCHA
              sitekey="6LfLupYqAAAAAG1vdqt4yX6ik0KJikrzpUxACAFR"
              ref={recaptchaRef as React.LegacyRef<ReCAPTCHA>}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {isLoading ? <SmallSpinner /> : "ورود"}
            </button>
          </div>

          <div className="flex justify-between items-center text-sm mb-4">
            <Link to="/forget-password" className="text-primary-600 hover:underline">
              فراموشی رمز عبور
            </Link>
          </div>

          <div className="text-center space-x-5">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟
              <Link to="/signup" className="text-primary-400 hover:underline mr-1">
                ثبت نام
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
