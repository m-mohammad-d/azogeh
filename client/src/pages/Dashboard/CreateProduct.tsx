import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUploadImageMutation } from "../../services/UploadApi";
import { useCreateProductMutation } from "../../services/ApiProduct";
import toast from "react-hot-toast";

const productSchema = z.object({
  name: z.string().min(3, "نام محصول باید حداقل 3 کاراکتر باشد."),
  description: z.string().min(10, "توضیحات محصول باید حداقل 10 کاراکتر باشد."),
  price: z.coerce.number().min(1000, "قیمت محصول باید حداقل 1000 باشد."),
  discount: z.coerce.number().min(0, "تخفیف باید عدد مثبت باشد.").max(99, "تخفیف نمیتواند بیشتر از 99 درصد باشد"),
  category: z.string().min(3, "دسته‌بندی محصول باید حداقل 3 کاراکتر باشد."),
  brand: z.string().min(1, "برند باید وارد شود."),
  isAvailable: z.coerce.boolean(),
  image: z.string().min(1, "تصویر محصول باید بارگذاری شود."),
  countInStock: z.coerce.number().min(0, "تعداد موجودی باید عدد مثبت باشد."),
});

type ProductFormData = z.infer<typeof productSchema>;

function CreateProduct() {
  const [uploadImage] = useUploadImageMutation();
  const [createProduct] = useCreateProductMutation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({ resolver: zodResolver(productSchema) });

  const onSubmit = async (data: ProductFormData) => {
    const newProduct = {
      ...data,
      image: imageUrl,
      images: [imageUrl],
      rating: 0,
      numReviews: 0,
    };

    try {
      await createProduct(newProduct);
      toast.success("محصول با موفقیت اضافه شد!");
    } catch (error) {
      toast.error("خطا در ارسال محصول:");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await uploadImage(formData).unwrap();
        const { image } = response.data;
        setImageUrl(image);
        setValue("image", image);
      } catch (error) {
        toast.error("آپلود تصویر با خطا مواجه شد:");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">ایجاد محصول جدید</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            نام محصول
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`mt-1 p-2 border rounded-md w-full ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <span className="text-error-400 text-sm">{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            توضیحات محصول
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className={`mt-1 p-2 border rounded-md w-full ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && <span className="text-error-400 text-sm">{errors.description.message}</span>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            قیمت محصول
          </label>
          <input
            id="price"
            type="number"
            {...register("price")}
            className={`mt-1 p-2 border rounded-md w-full ${errors.price ? "border-red-500" : ""}`}
          />
          {errors.price && <span className="text-error-400 text-sm">{errors.price.message}</span>}
        </div>

        <div>
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
            تخفیف محصول
          </label>
          <input
            id="discount"
            type="number"
            {...register("discount")}
            className={`mt-1 p-2 border rounded-md w-full ${errors.discount ? "border-red-500" : ""}`}
          />
          {errors.discount && <span className="text-error-400 text-sm">{errors.discount.message}</span>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            دسته‌بندی محصول
          </label>
          <input
            id="category"
            type="text"
            {...register("category")}
            className={`mt-1 p-2 border rounded-md w-full ${errors.category ? "border-red-500" : ""}`}
          />
          {errors.category && <span className="text-error-400 text-sm">{errors.category.message}</span>}
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            برند
          </label>
          <input
            id="brand"
            type="text"
            {...register("brand")}
            className={`mt-1 p-2 border rounded-md w-full ${errors.brand ? "border-red-500" : ""}`}
          />
          {errors.brand && <span className="text-error-400 text-sm">{errors.brand.message}</span>}
        </div>

        <div>
          <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700">
            تعداد موجودی
          </label>
          <input
            id="countInStock"
            type="number"
            {...register("countInStock")}
            className={`mt-1 p-2 border rounded-md w-full ${errors.countInStock ? "border-red-500" : ""}`}
          />
          {errors.countInStock && <span className="text-error-400 text-sm">{errors.countInStock.message}</span>}
        </div>
        <div>
          <label htmlFor="isAvailable" className="block text-sm font-medium text-gray-700">
            در دسترس
          </label>
          <select
            id="isAvailable"
            {...register("isAvailable")}
            className={`mt-1 p-2 border rounded-md w-full ${errors.isAvailable ? "border-red-500" : ""}`}
          >
            <option value="true">موجود</option>
            <option value="false">ناموجود</option>
          </select>
          {errors.isAvailable && <span className="text-error-400 text-sm">{errors.isAvailable.message}</span>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            تصویر محصول
          </label>
          <div className="flex items-center space-x-3">
            <input id="image" type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
            <label
              htmlFor="image"
              className="cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-all"
            >
              انتخاب تصویر
            </label>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md border border-primary-500"
              />
            )}
            <span className="text-sm text-gray-600">
              {watch("image") ? "تصویر انتخاب شده" : "هیچ تصویری انتخاب نشده"}
            </span>
          </div>
          {errors.image && <span className="text-error-400 text-sm">{errors.image.message}</span>}
        </div>

        <div>
          <button type="submit" className="w-full p-2 bg-primary-600 text-white rounded-md">
            اضافه کردن محصول
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
