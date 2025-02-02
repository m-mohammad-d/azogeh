import { useCreateProductMutation } from "../../services/ApiProduct";
import { useImageUploader } from "../../hooks/useImageUploader";
import ProductForm from "../../components/ProductForm";
import toast from "react-hot-toast";
import { ProductFormData } from "../../schemas/productSchema";
import MetaTags from "../../components/MetaTag";

function CreateProduct() {
  const [createProduct] = useCreateProductMutation();
  const uploadImageFile = useImageUploader();

  const onSubmit = async (data: ProductFormData, image: File | null) => {
    const finalImageUrl = await uploadImageFile(image);
    if (!finalImageUrl) return;

    const newProduct = {
      ...data,
      image: finalImageUrl,
      images: [finalImageUrl],
      rating: 0,
      numReviews: 0,
    };

    try {
      await createProduct({ ...newProduct }).unwrap();
      toast.success("محصول جدید با موفقیت ایجاد شد!");
    } catch (error) {
      toast.error("خطا در ایجاد محصول");
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-4 shadow-lg">
      <MetaTags title="ایجاد محصول | داشبورد" description="ایجاد یک محصول جدید در سیستم." />

      <h2 className="mb-6 text-2xl font-semibold">ایجاد محصول جدید</h2>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
}

export default CreateProduct;
