// @ts-nocheck
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useGetMeQuery, useSignUpMutation } from "../services/UsersApi";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorResponse } from "../types/ErrorType";
import Input from "../components/Input";
import SmallSpinner from "../components/SmallSpinner";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../components/Button";
import MetaTags from "../components/MetaTag";

const schema = z
  .object({
    name: z.string().min(3, "نام باید حداقل 3 کاراکتر باشد.").max(15, "نام باید حداکثر 15 کاراکتر باشد."),
    email: z.string().email("ایمیل نامعتبر است.").min(1, "ایمیل نمی‌تواند خالی باشد."),
    password: z.string().min(8, "پسورد باید حداقل 8 کاراکتر باشد.").max(15, "پسورد باید حداکثر 15 کاراکتر باشد."),
    passwordConfirmation: z.string().min(8, "تکرار پسورد باید حداقل 8 کاراکتر باشد.").max(15, "تکرار پسورد باید حداکثر 15 کاراکتر باشد."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "پسوردها مطابقت ندارند.",
    path: ["passwordConfirmation"],
  });

type FormData = z.infer<typeof schema>;

function SignUpPage() {
  const { data: user } = useGetMeQuery({});
  const recaptchaRef = useRef<ReCAPTCHA | null>();

  const [signup, { isLoading }] = useSignUpMutation();
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
      await signup(data).unwrap();
      navigate(backUrl);
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
    <div className="mx-4 my-20 flex items-center justify-center">
      <MetaTags title="ثبت نام | اذوقه" description="برای دسترسی به امکانات بیشتر، در فروشگاه اذوقه ثبت نام کنید." keywords="ثبت نام, ایجاد حساب, فروشگاه آنلاین" />
      <div className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          ثبت نام در <span className="text-primary">اذوقه</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Input id="name" type="text" label="نام و نام خانوادگی" placeholder="نام و نام خانوادگی" register={register} errorMessage={errors.name?.message} {...register("name")} />

            <Input id="email" type="email" label="ایمیل" placeholder="ایمیل" register={register} errorMessage={errors.email?.message} {...register("email")} />

            <Input id="password" type="password" label="پسورد" placeholder="پسورد" register={register} errorMessage={errors.password?.message} {...register("password")} />

            <Input
              id="passwordConfirmation"
              type="password"
              label="تکرار پسورد"
              placeholder="تکرار پسورد"
              register={register}
              errorMessage={errors.passwordConfirmation?.message}
              {...register("passwordConfirmation")}
            />
          </div>
          <div className="mb-6 flex justify-center">
            <ReCAPTCHA sitekey="6LfLupYqAAAAAG1vdqt4yX6ik0KJikrzpUxACAFR" ref={recaptchaRef as React.LegacyRef<ReCAPTCHA>} />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <Button type="submit" className="w-full">
              {isLoading ? <SmallSpinner /> : "ثبت نام"}
            </Button>
          </div>
        </form>

        <div className="space-x-5 text-center">
          <p className="text-sm text-gray-600">
            قبلاً ثبت‌نام کرده‌اید؟
            <Link to="/login" className="mr-1 text-primary hover:underline">
              ورود
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
