// @ts-nocheck
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
    <div className="mx-4 my-20 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          به <span className="text-primary-500">اذوقه</span> خوش آمدید
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField id="email" type="email" label="ایمیل" placeholder="ایمیل" register={register} error={errors.email} />
          <div className="relative mb-6">
            <InputField id="password" type={showPassword ? "text" : "password"} label="پسورد" placeholder="پسورد" register={register} error={errors.password} />
            <div className="absolute left-6 top-7 cursor-pointer text-gray-500">
              {showPassword ? <FaEye onClick={() => setShowPassword(false)} /> : <RiEyeCloseLine onClick={() => setShowPassword(true)} />}
            </div>
          </div>
          <div className="mb-6 flex justify-center">
            <ReCAPTCHA sitekey="6LfLupYqAAAAAG1vdqt4yX6ik0KJikrzpUxACAFR" ref={recaptchaRef as React.LegacyRef<ReCAPTCHA>} />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <button type="submit" className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 w-full rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2">
              {isLoading ? <SmallSpinner /> : "ورود"}
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between text-sm">
            <Link to="/forget-password" className="text-primary-600 hover:underline">
              فراموشی رمز عبور
            </Link>
          </div>

          <div className="space-x-5 text-center">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟
              <Link to="/signup" className="text-primary-400 mr-1 hover:underline">
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
