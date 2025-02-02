import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdatePasswordMutation } from "../../services/UsersApi";
import toast from "react-hot-toast";
import SmallSpinner from "../../components/SmallSpinner";
import Input from "../../components/Input";
import { ErrorResponse } from "../../types/ErrorType";
import Button from "../../components/Button";
import MetaTags from "../../components/MetaTag";

const passwordSchema = z
  .object({
    passwordCurrent: z.string().min(8, "رمز عبور فعلی باید حداقل ۸ کاراکتر باشد"),
    password: z.string().min(8, "رمز عبور جدید باید حداقل ۸ کاراکتر باشد").regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ داشته باشد").regex(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "رمز عبور جدید با تکرار آن مطابقت ندارد",
    path: ["passwordConfirmation"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

function ChangePasswordPage() {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      passwordCurrent: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      await updatePassword(data).unwrap();
      toast.success("پسورد با موفقیت عوض شد");
      reset();
    } catch (error) {
      toast.error((error as ErrorResponse).data.message, {
        duration: 6000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <MetaTags title="تغییر رمز عبور | پنل کاربری" description="تغییر رمز عبور حساب کاربری." />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 sm:p-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
          تغییر رمز عبور
          <span className="mt-2 block text-sm font-normal text-gray-400">برای امنیت حساب خود از رمز عبور قوی استفاده کنید</span>
        </h2>

        <div className="mb-4 space-y-5">
          <Input type="password" label="رمز عبور فعلی" placeholder="رمز عبور فعلی خود را وارد کنید" errorMessage={errors.passwordCurrent?.message} {...register("passwordCurrent")} />

          <Input type="password" label="رمز عبور جدید" placeholder="رمز عبور جدید (حداقل ۸ کاراکتر)" errorMessage={errors.password?.message} {...register("password")} />

          <Input type="password" label="تکرار رمز عبور جدید" placeholder="رمز عبور جدید را تکرار کنید" errorMessage={errors.passwordConfirmation?.message} {...register("passwordConfirmation")} />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <SmallSpinner /> : "تغییر رمز عبور"}
        </Button>
      </form>
    </div>
  );
}

export default ChangePasswordPage;
