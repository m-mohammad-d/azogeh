import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "../schemas/productSchema";
import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "./Button";

interface ProductFormProps {
  onSubmit: (data: ProductFormData, image: File | null) => void;
  initialValues?: ProductFormData;
}

function ProductForm({ onSubmit, initialValues }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues,
  });

  const [imageUrl, setImageUrl] = useState<string | null>(initialValues?.image || null);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
    setFile(file);
    setValue("image", previewUrl);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleImageChange(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleImageChange(droppedFile);
    }
  };

  useEffect(() => {
    if (initialValues) {
      setValue("name", initialValues.name);
      setValue("price", initialValues.price);
      setValue("image", initialValues.image);
      setValue("brand", initialValues.brand);
      setValue("category", initialValues.category);
      setValue("countInStock", initialValues.countInStock);
      setValue("description", initialValues.description);
      setValue("discount", initialValues.discount);
      setImageUrl(initialValues.image);
    }
  }, [initialValues]);

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data, file);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Input fullWidth label="نام محصول" {...register("name")} errorMessage={errors.name?.message} />
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          توضیحات محصول
        </label>
        <textarea id="description" {...register("description")} rows={4} className={`mt-1 w-full rounded-md border p-2 ${errors.description ? "border-red-500" : ""}`} />
        {errors.description && <span className="text-error-400 text-sm">{errors.description.message}</span>}
      </div>
      <Input fullWidth label="قیمت محصول" type="number" {...register("price")} errorMessage={errors.price?.message} />
      <Input fullWidth label="تخفیف محصول" type="number" {...register("discount")} errorMessage={errors.discount?.message} />
      <Input fullWidth label="دسته‌بندی محصول" {...register("category")} errorMessage={errors.category?.message} />
      <Input fullWidth label="برند" {...register("brand")} errorMessage={errors.brand?.message} />
      <Input fullWidth label="تعداد موجودی" type="number" {...register("countInStock")} errorMessage={errors.countInStock?.message} />

      <div>
        <label htmlFor="isAvailable" className="block text-sm font-medium text-gray-700">
          در دسترس
        </label>
        <select id="isAvailable" {...register("isAvailable")} className="mt-1 w-full rounded-md border p-2">
          <option value="true">موجود</option>
          <option value="false">ناموجود</option>
        </select>
        {errors.isAvailable && <span className="text-error-400 text-sm">{errors.isAvailable.message}</span>}
      </div>

      <div
        className={`mt-4 flex flex-col items-center justify-center border-2 border-dashed p-4 ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"} transition-all`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input id="image" type="file" accept="image/*" className="hidden" onChange={handleFileInputChange} />
        <label htmlFor="image" className="cursor-pointer text-sm text-gray-600">
          تصویر را بکشید و اینجا رها کنید یا کلیک کنید برای انتخاب
        </label>
        {imageUrl && <img src={imageUrl} alt="Product Preview" className="mt-3 h-32 w-32 object-cover" />}
        {errors.image && <span className="text-error-400 text-sm">{errors.image.message}</span>}
      </div>

      <div className="flex items-center justify-center">
        <Button type="submit">اضافه کردن محصول</Button>
      </div>
    </form>
  );
}

export default ProductForm;
