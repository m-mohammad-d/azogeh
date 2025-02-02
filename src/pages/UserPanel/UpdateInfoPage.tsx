import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetMeQuery, useUpdateInfoMutation } from "../../services/UsersApi";
import toast from "react-hot-toast";
import SmallSpinner from "../../components/SmallSpinner";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MetaTags from "../../components/MetaTag";

const updateInfoSchema = z.object({
  name: z.string().min(3, "نام باید حداقل 3 کاراکتر باشد").max(15, "نام نمی‌تواند بیشتر از 15 کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
});

type UpdateInfoFormValues = z.infer<typeof updateInfoSchema>;

const UpdateInfoPage: React.FC = () => {
  const [updateinfo, { isLoading }] = useUpdateInfoMutation();
  const { data: info } = useGetMeQuery({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateInfoFormValues>({
    resolver: zodResolver(updateInfoSchema),
    defaultValues: {
      name: info?.data?.user?.name || "",
      email: info?.data?.user?.email || "",
    },
  });

  useEffect(() => {
    if (info) {
      reset({
        name: info.data.user.name,
        email: info.data.user.email,
      });
    }
  }, [info, reset]);

  const onSubmit = async (data: UpdateInfoFormValues) => {
    try {
      await updateinfo(data).unwrap();
      toast.success("مشخصات شما با موفقیت بروزرسانی شد");
    } catch (error) {
      toast.error("خطایی در بروزرسانی اطلاعات رخ داد");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <MetaTags title="ویرایش اطلاعات | پنل کاربری" description="ویرایش اطلاعات شخصی." />

      <div className="w-full max-w-md space-y-8">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-white p-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-700">ویرایش مشخصات</h2>

          <div className="space-y-6">
            <Input type="text" label="نام کامل" placeholder="مثال: علی محمدی" className="w-full" errorMessage={errors.name?.message} {...register("name")} />

            <Input type="email" label="آدرس ایمیل" placeholder="مثال: example@site.com" className="w-full" errorMessage={errors.email?.message} {...register("email")} />
          </div>

          <Button type="submit" disabled={isLoading} className="mt-8 w-full rounded-md py-3 text-base font-medium transition-all">
            {isLoading ? <SmallSpinner /> : "ذخیره تغییرات"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateInfoPage;
