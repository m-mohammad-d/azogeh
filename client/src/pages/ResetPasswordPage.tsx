import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/InputField";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../services/UsersApi";
import PasswordResetSuccess from "../components/ResetPasswordSuccsess";

const schema = z
  .object({
    newPassword: z.string().min(8, "پسورد باید حداقل 8 کاراکتر باشد.").max(15, "پسورد باید حداکثر 15 کاراکتر باشد."),
    confirmPassword: z
      .string()
      .min(8, "تایید پسورد باید حداقل 8 کاراکتر باشد.")
      .max(15, "تایید پسورد باید حداکثر 15 کاراکتر باشد."),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
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
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">تغییر رمز عبور</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <InputField
              id="newPassword"
              type="password"
              label="رمز عبور جدید"
              placeholder="رمز عبور جدید خود را وارد کنید"
              register={register}
              error={errors.newPassword}
            />
          </div>

          <div className="mb-4">
            <InputField
              id="confirmPassword"
              type="password"
              label="تایید رمز عبور"
              placeholder="رمز عبور خود را دوباره وارد کنید"
              register={register}
              error={errors.confirmPassword}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              تغییر رمز عبور
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
