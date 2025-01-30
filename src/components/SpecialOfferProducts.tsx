import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";
import { Product } from "../types/product";
import HighlightBar from "./HighlightBar";
import DiscountTimer from "./DiscountTimer";
import { FaArrowLeft } from "react-icons/fa";
import ProductCard from "./ProductCard";
interface SpecialOfferProductsProps {
  products: Product[] | undefined;
}

function SpecialOfferProducts({ products }: SpecialOfferProductsProps) {
  const initialEndDate = new Date().getTime() + 10 * 60 * 60 * 1000;
  const discountedProducts = products?.filter((product) => product.discount > 0);

  return (
    <div className="mt-16 px-4 md:px-8">
      <h2 className="mb-6 text-lg font-semibold md:mb-8 md:text-2xl lg:text-3xl">تخفیف‌های مارکتی</h2>
      <HighlightBar />

      <div className="relative mt-10 h-full rounded-xl bg-primary px-4 py-2 shadow-lg lg:rounded-2xl">
        <div className="flex w-full items-center justify-between rounded-lg md:hidden">
          <div className="flex items-center gap-1">
            <h2 className="text-sm font-semibold text-white md:text-2xl">تخفیف ویژه %</h2>
            <DiscountTimer initialendDate={initialEndDate} />
          </div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-white">مشاهده</p>
            <FaArrowLeft className="text-white" />
          </div>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          breakpoints={{
            450: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
          }}
          className="h-full"
        >
          <SwiperSlide className="hidden h-[400px] flex-col items-center justify-center space-y-6 rounded-lg p-4 md:flex">
            <h2 className="text-2xl font-semibold text-white">تخفیف ویژه %</h2>
            <DiscountTimer initialendDate={initialEndDate} />
            <p className="flex items-center gap-2 text-sm font-medium text-white">
              مشاهده محصولات
              <FaArrowLeft />
            </p>
          </SwiperSlide>

          {discountedProducts?.map((product, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center mt-4">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SpecialOfferProducts;
