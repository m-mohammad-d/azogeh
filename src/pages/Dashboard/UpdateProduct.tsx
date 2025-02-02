import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../services/ApiProduct";
import { useImageUploader } from "../../hooks/useImageUploader";
import ProductForm from "../../components/ProductForm";
import toast from "react-hot-toast";
import { ProductFormData } from "../../schemas/productSchema";
import Spinner from "../../components/Spinner";
import MetaTags from "../../components/MetaTag";

function UpdateProduct() {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId as string);
  const [updateProduct] = useUpdateProductMutation();
  const uploadImageFile = useImageUploader();

  const onSubmit = async (data: ProductFormData, image: File | null) => {
    let finalImageUrl = product?.data.product.image;

    if (image) {
      finalImageUrl = (await uploadImageFile(image)) || "";
      if (!finalImageUrl) return;
    }

    const productNewData = {
      ...data,
      image: finalImageUrl,
      images: [finalImageUrl],
      rating: product?.data.product.rating,
      numReviews: product?.data.product.numReviews,
    };

    try {
      await updateProduct({ productId, ...productNewData }).unwrap();
      toast.success("محصول با موفقیت به‌روز شد!");
    } catch (error) {
      toast.error("خطا در به‌روزرسانی محصول");
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>مشکلی پیش آمده است</p>;

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-4 shadow-lg">
      <MetaTags title="ویرایش محصول | داشبورد" description="ویرایش اطلاعات یک محصول." />

      <h2 className="mb-6 text-2xl font-semibold">ویرایش محصول</h2>
      <ProductForm onSubmit={onSubmit} initialValues={product?.data.product} />
    </div>
  );
}

export default UpdateProduct;
