import { Product } from "../types/product";
import { separateThousands } from "../utils/FormatNumber";

interface SpecialOfferProductItemProps {
  product: Product;
}

function SpecialOfferProductItem({ product }: SpecialOfferProductItemProps) {
  return (
    <div className="relative my-5 overflow-hidden rounded-xl bg-white shadow-lg">
      <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-2xl bg-secondary-500 text-xs font-semibold text-white">{product.discount}%</div>

      <div className="p-6">
        <img src={product?.image} alt={product.name} className="mx-auto rounded-lg object-cover" />
      </div>

      <div className="mx-auto h-px w-3/4 bg-black/10"></div>

      <p className="mt-2 line-clamp-2 h-14 px-4 text-center text-xs !leading-[30px] md:text-lg">{product.name}</p>

      <div className="flex flex-col items-center justify-between p-5 md:flex-row">
        <p className="text-sm text-neutral-300 line-through">{separateThousands(product.price)} تومان</p>
        <p className="text-lg font-semibold">{separateThousands(product.discountedPrice)} تومان</p>
      </div>
    </div>
  );
}

export default SpecialOfferProductItem;
