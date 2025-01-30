import React from "react";
import Button from "./Button";
import { IoIosCloseCircleOutline } from "react-icons/io";

const fakeProduct = {
  _id: "67378d0546a5bb2e6dc1307e",
  name: "کنسرو لوبیا با قارچ طبیعت - 380 گرم",
  description:
    "کنسرو لوبیا با قارچ طبیعت، یک غذای آماده خوشمزه و مقوی است که ترکیبی از لوبیا قرمز و قارچ با طعم بی‌نظیر ارائه می‌دهد. این محصول در وزن 380 گرم عرضه می‌شود و گزینه‌ای مناسب برای یک وعده غذایی سریع و سالم است. کنسرو لوبیا با قارچ طبیعت با مواد اولیه باکیفیت تهیه شده و می‌تواند به‌تنهایی یا به‌عنوان مکمل در کنار غذاهای دیگر مصرف شود.\n\n\n\n\n\n\n\n",
  image: "https://res.cloudinary.com/dk1j8lhuv/image/upload/v1731693828/Azooghe/epils0irqhfttphhshts.webp",
  images: ["https://res.cloudinary.com/dk1j8lhuv/image/upload/v1731693828/Azooghe/epils0irqhfttphhshts.webp"],
  countInStock: 1,
  isAvailable: true,
  brand: "طبیعت",
  category: "کنسرو",
  rating: 2,
  numReviews: 1,
  price: 55000,
  discount: 11,
  createdAt: "2024-11-15T18:03:49.633Z",
  updatedAt: "2024-12-20T12:07:21.699Z",
  slug: "knsrw-lwbya-ba-qarch-tbyat-380-grm",
  discountedPrice: 48950,
  id: "67378d0546a5bb2e6dc1307e",
};
const FavoriteOrderCard: React.FC = () => {
  return (
    <div className="relative flex w-full border-b-2 border-b-neutral-gray-3 hover:border-b-primary transition-all duration-300 ease-in flex-col items-stretch gap-4 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Close Button */}
      <div className="absolute left-2 top-2 sm:static sm:left-auto sm:top-auto">
        <IoIosCloseCircleOutline size={30} className="text-neutral-gray-7 hover:cursor-pointer" />
      </div>

      {/* Product Image */}
      <div className="mx-auto h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24">
        <img src={fakeProduct.image} alt={fakeProduct.name} className="h-full w-full object-contain" />
      </div>

      {/* Product Info */}
      <div className="flex-1 text-center sm:text-right">
        <h3 className="line-clamp-2 text-sm font-semibold sm:text-base md:text-lg">{fakeProduct.name}</h3>
        <div className="mt-2 flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
          {fakeProduct.discountedPrice ? (
            <>
              <span className="text-sm font-bold text-red-600 sm:text-base">{fakeProduct.discountedPrice.toLocaleString()} تومان</span>
              <span className="text-xs text-gray-400 line-through sm:text-sm">{fakeProduct.price.toLocaleString()} تومان</span>
            </>
          ) : (
            <span className="text-sm font-bold sm:text-base">{fakeProduct.price.toLocaleString()} تومان</span>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="sm:w-40">
        <Button size="small" className="w-full sm:w-auto">
          افزودن به سبد خرید
        </Button>
      </div>
    </div>
  );
};

export default FavoriteOrderCard;
