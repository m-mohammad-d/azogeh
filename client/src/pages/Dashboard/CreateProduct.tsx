import { useCreateProductMutation } from "../../services/ApiProduct";
import { useUploadImageMutation } from "../../services/UploadApi";
import ProductForm from "../../components/ProductForm";
import toast from "react-hot-toast";
import { ProductFormData } from "../../schemas/productSchema";

function CreateProduct() {
  const [createProduct] = useCreateProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const onSubmit = async (data: ProductFormData, image: File | null) => {
    let finalImageUrl = "";
    if (image) {
      const formData = new FormData();

      formData.append("image", image);
      console.log(image);

      try {
        const res = await uploadImage(formData).unwrap();
        finalImageUrl = res.data.image;
      } catch (error) {
        toast.error("آپلود تصویر با خطا مواجه شد");
        return;
      }
    }
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
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">ایجاد محصول جدید</h2>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
}

export default CreateProduct;
