import { toast } from "react-hot-toast";
import { useUploadImageMutation } from "../services/UploadApi";

export const useImageUploader = () => {
  const [uploadImage] = useUploadImageMutation();

  const uploadImageFile = async (image: File | null): Promise<string | null> => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await uploadImage(formData).unwrap();
      return res.data.image;
    } catch (error) {
      toast.error("آپلود تصویر با خطا مواجه شد");
      return null;
    }
  };

  return uploadImageFile;
};
