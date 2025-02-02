// @ts-nocheck
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useGetMeQuery, useLoginMutation } from "../services/UsersApi";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorResponse } from "../types/ErrorType";
import SmallSpinner from "../components/SmallSpinner";
import ReCAPTCHA from "react-google-recaptcha";
import Input from "../components/Input";
import Button from "../components/Button";
import MetaTags from "../components/MetaTag";
const schema = z.object({
  email: z.string().email("ایمیل نامعتبر است.").min(1, "ایمیل نمی‌تواند خالی باشد."),
  password: z.string().min(8, "پسورد باید حداقل 8 کاراکتر باشد.").max(15, "پسورد باید حداکثر 15 کاراکتر باشد."),
});

type FormData = z.infer<typeof schema>;

function LoginPage() {
  const { data: user } = useGetMeQuery({});
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
      <MetaTags title="ورود به حساب | اذوقه" description="برای خرید و دسترسی به ویژگی‌های بیشتر، وارد حساب کاربری خود شوید." keywords="ورود, ورود به حساب, فروشگاه آنلاین" />
      <div className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          به <span className="text-primary-500">اذوقه</span> خوش آمدید
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="email" label="ایمیل" placeholder="ایمیل خود را وارد کنید" errorMessage={errors.email?.message} {...register("email")} />
          <div className="relative mb-6">
            <Input type="password" label="پسورد" placeholder="رمز خود را وارد کنید" errorMessage={errors.password?.message} {...register("password")} />
          </div>
          <div className="mb-6 flex justify-center">
            <ReCAPTCHA sitekey="6LfLupYqAAAAAG1vdqt4yX6ik0KJikrzpUxACAFR" ref={recaptchaRef as React.LegacyRef<ReCAPTCHA>} />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <Button type="submit" className="w-full">
              {isLoading ? <SmallSpinner /> : "ورود"}
            </Button>
          </div>

          <div className="mb-4 flex items-center justify-between text-sm">
            <Link to="/forget-password" className="text-primary hover:underline">
              فراموشی رمز عبور
            </Link>
          </div>

          <div className="space-x-5 text-center">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟
              <Link to="/signup" className="mr-1 text-primary hover:underline">
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
