import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgetPasswordMutation } from "../services/UsersApi";
import toast from "react-hot-toast";
import PasswordResetLinkSent from "../components/PasswordResetLinkSent";
import Input from "../components/Input";
import Button from "../components/Button";
import SmallSpinner from "../components/SmallSpinner";

const schema = z.object({
  email: z.string().email("ایمیل نامعتبر است.").min(1, "ایمیل نمی‌تواند خالی باشد."),
});

type FormData = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await forgetPassword({ email: data.email }).unwrap();
      toast.success("لینک بازنشانی پسورد به ایمیل شما ارسال شد. ایمیل خود را چک کنید.");
      setIsSuccess(true);
    } catch (error) {
      toast.error("مشکلی در ارسال لینک بازنشانی وجود دارد.");
    }
  };

  if (isSuccess) {
    return <PasswordResetLinkSent />;
  }

  return (
    <div className="mx-4 my-20 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">بازیابی رمز عبور</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input id="email" type="email" label="ایمیل" placeholder="ایمیل خود را برای بازنشانی پسورد وارد کنید" errorMessage={errors.email?.message} {...register("email")} />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <Button type="submit" className="w-full">
              {isLoading ? <SmallSpinner /> : " ارسال لینک بازیابی "}
            </Button>
          </div>
        </form>
        <p>لینک بازیابی پسورد به ایمیل شما ارسال میشود.</p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
