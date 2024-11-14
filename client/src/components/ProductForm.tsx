import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "../schemas/productSchema";
import { useState, useEffect } from "react";

type ProductFormProps = {
  onSubmit: (data: ProductFormData, image: File | null) => void;
  initialValues?: ProductFormData;
};

function ProductForm({ onSubmit, initialValues }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImageUrl(previewUrl);
      setFile(selectedFile);
      setValue("image", previewUrl);
    }
  };

  useEffect(() => {
    if (initialValues) {
      setValue("name", initialValues?.name);
      setValue("price", initialValues?.price);
      setValue("image", initialValues?.image);
      setValue("brand", initialValues?.brand);
      setValue("category", initialValues?.category);
      setValue("countInStock", initialValues?.countInStock);
      setValue("description", initialValues?.description);
      setImageUrl(initialValues.image);
    }
  }, [initialValues]);

  const handleFormSubmit = async (data: ProductFormData) => {
    onSubmit(data, file);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* فیلد نام محصول */}
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

        {/* فیلد توضیحات محصول */}
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

        {/* فیلد قیمت محصول */}
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

        {/* فیلد تخفیف محصول */}
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

        {/* فیلد دسته‌بندی محصول */}
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

        {/* فیلد برند محصول */}
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

        {/* فیلد تعداد موجودی */}
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

        {/* فیلد دسترسی محصول */}
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

        {/* فیلد انتخاب تصویر */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            تصویر محصول
          </label>
          <div className="flex items-center space-x-3">
            <input id="image" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            <label
              htmlFor="image"
              className="cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-all"
            >
              انتخاب تصویر
            </label>
            <span className="text-sm text-gray-600">
              {watch("image") ? "تصویر انتخاب شده" : "هیچ تصویری انتخاب نشده"}
            </span>
          </div>

          {/* نمایش پیش‌نمایش تصویر */}
          {imageUrl && (
            <div className="mt-3">
              <img src={imageUrl} alt="Product Preview" className="w-32 h-32 object-cover" />
            </div>
          )}

          {errors.image && <span className="text-error-400 text-sm">{errors.image.message}</span>}
        </div>

        {/* دکمه ارسال فرم */}
        <div>
          <button type="submit" className="w-full p-2 bg-primary-600 text-white rounded-md">
            اضافه کردن محصول
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
