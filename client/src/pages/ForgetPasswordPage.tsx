import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/InputField";
import { useForgetPasswordMutation } from "../services/UsersApi";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("ایمیل نامعتبر است.").nonempty("ایمیل نمی‌تواند خالی باشد."),
});

type FormData = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
  const [forgetPassword] = useForgetPasswordMutation();

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
    } catch (error) {
      toast.error("مشکلی در ارسال لینک بازنشانی وجود دارد.");
    }
  };

  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">بازیابی رمز عبور</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <InputField
              id="email"
              type="email"
              label="ایمیل خود را وارد کنید"
              placeholder="ایمیل خود را برای بازنشانی پسورد وارد کنید"
              error={errors.email}
              register={register}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              ارسال لینک بازیابی
            </button>
          </div>
        </form>
        <p>لینک بازیابی پسورد به ایمیل شما ارسال میشود.</p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
