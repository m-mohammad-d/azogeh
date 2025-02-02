import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../services/UsersApi";
import PasswordResetSuccess from "../components/ResetPasswordSuccsess";
import Input from "../components/Input";
import Button from "../components/Button";
import MetaTags from "../components/MetaTag";

const schema = z
  .object({
    newPassword: z.string().min(8, "پسورد باید حداقل 8 کاراکتر باشد.").max(15, "پسورد باید حداکثر 15 کاراکتر باشد."),
    confirmPassword: z.string().min(8, "تایید پسورد باید حداقل 8 کاراکتر باشد.").max(15, "تایید پسورد باید حداکثر 15 کاراکتر باشد."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "پسوردها مطابقت ندارند",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function ResetPasswordPage() {
  const params = useParams();
  const resetToken = params.token;

  // const location = useLocation();
  const [resetPassword] = useResetPasswordMutation();
  // const [resetToken, setResetToken] = useState<string | null>(null);
  const [isPasswordReset, setIsPasswordReset] = useState(false); // State to manage password reset success

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const token = params.get("resetToken");
  //   setResetToken(token);
  // }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!resetToken) {
      toast.error("توکن بازنشانی معتبر نیست.");
      return;
    }

    try {
      await resetPassword({
        resetToken,
        password: data.newPassword,
        passwordConfirmation: data.confirmPassword,
      }).unwrap();
      toast.success("رمز عبور شما با موفقیت تغییر کرد.");
      setIsPasswordReset(true); // Set success state to true
    } catch (error) {
      toast.error("خطا در تغییر رمز عبور. لطفاً دوباره امتحان کنید.");
    }
  };

  // Conditionally render the success message or the form
  if (isPasswordReset) {
    return <PasswordResetSuccess />;
  }

  return (
    <div className="mx-4 my-20 flex items-center justify-center">
      <MetaTags title="بازنشانی رمز عبور | اذوقه" description="رمز عبور خود را بازنشانی کنید تا به راحتی وارد حساب کاربری خود شوید." keywords="بازنشانی رمز عبور, ورود به حساب, فروشگاه آنلاین" />
      <div className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">تغییر رمز عبور</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input id="newPassword" type="password" label="رمز عبور جدید" placeholder="رمز عبور جدید خود را وارد کنید" {...register("newPassword")} errorMessage={errors.newPassword?.message} />
          </div>

          <div className="mb-4">
            <Input
              id="confirmPassword"
              type="password"
              label="تایید رمز عبور"
              placeholder="رمز عبور خود را دوباره وارد کنید"
              {...register("confirmPassword")}
              errorMessage={errors.confirmPassword?.message}
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <Button type="submit" className="w-full">
              تغییر رمز عبور
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
