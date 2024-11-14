import { z } from "zod";

export const productSchema = z.object({
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

export type ProductFormData = z.infer<typeof productSchema>;
