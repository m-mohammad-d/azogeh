import React from "react";
import ProductImage from "./ProductImage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../store/CartSlice";
import { FaMinus, FaRegHeart, FaRegTrashAlt, FaTag } from "react-icons/fa";
import toast from "react-hot-toast";
import { separateThousands } from "../utils/FormatNumber";
import { MdAdd, MdAddShoppingCart, MdOutlineVerifiedUser } from "react-icons/md";
import { Product } from "../types/product";
import { GoShareAndroid } from "react-icons/go";

type ProductInfoProps = {
  product: Product;
  onAddToCart: () => void;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.orderItems);
  const cartItem = cartItems.find((item) => item._id === product._id);

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.qty > 1) {
        dispatch(decreaseQuantity(product._id));
      } else {
        dispatch(removeFromCart({ _id: product._id }));
        toast.success("محصول با موفقیت از سبد خرید حذف شد");
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `محصول: ${product.name}`,
          text: `برند: ${product.brand}\nامتیاز: ${product.rating}\nقیمت: ${product.discountedPrice || product.price} تومان`,
          url: window.location.href,
        })
        .then(() => toast.success("محصول با موفقیت به اشتراک گذاشته شد!"))
        .catch((error) => toast.error("خطا در اشتراک‌گذاری: " + error));
    } else {
      toast.error("مرورگر شما از اشتراک‌گذاری پشتیبانی نمی‌کند.");
    }
  };

  const discountPercentage = product.discountedPrice ? ((product.price - product.discountedPrice) / product.price) * 100 : null;

  const isInStock = product.countInStock > 0;
  const isLowStock = product.countInStock >= 1 && product.countInStock <= 30;

  return (
    <div className="flex w-full flex-col justify-between gap-10 px-8 md:flex-row">
      <div className="mx-auto mb-6">
        <ProductImage mainImageUrl={`${product.image}`} altText={product.name} imageCarousel={product.images.map((img) => `${img}`)} />
      </div>
      <div className="mr-0 w-full space-y-4 md:mr-11">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>
          <div className="flex items-center gap-2">
            <FaRegHeart className="text-neutral-100" size={25} />
            <GoShareAndroid className="cursor-pointer text-neutral-100" size={25} onClick={handleShare} />
          </div>
        </div>
        <div className="h-px w-full bg-neutral-100"></div>
        <p className="mb-1 text-lg">
          <span className="font-bold">برند:</span> {product.brand}
        </p>
        <p className="mb-1 text-lg">
          <span className="font-bold">امتیاز:</span> {product.rating}
        </p>
        <p className="mb-1 flex items-center gap-2 text-lg">
          <MdOutlineVerifiedUser size={20} />
          <span className="font-bold">گارانتی اصالت و سلامت فیزیکی کالا</span>
        </p>
        <p className="mb-1 flex items-center text-lg">
          <span className="font-bold">قیمت:</span>
          {product.discountedPrice ? (
            <>
              <span className="ml-2 text-gray-500 line-through transition-all duration-300 ease-in-out">{separateThousands(product.price)} تومن</span>
              <span className="ml-2 font-bold text-primary-500 transition-all duration-300 ease-in-out">{separateThousands(product.discountedPrice)} تومن</span>
              <span className="ml-2 flex items-center font-bold text-green-500">
                <FaTag className="ml-2" />
                {discountPercentage?.toFixed(0)}% تخفیف
              </span>
            </>
          ) : (
            <span className="ml-2 font-bold text-primary-500 transition-all duration-300 ease-in-out">{separateThousands(product.price)} تومن</span>
          )}
        </p>

        {isInStock ? (
          cartItem ? (
            <div className="flex items-center">
              <button
                id="increment-btn"
                onClick={() => dispatch(increaseQuantity(product._id))}
                className="flex h-8 w-8 transform items-center justify-center rounded-full bg-green-500 text-white transition-all duration-200 ease-in-out hover:scale-110 hover:bg-green-600"
                aria-label="Increase quantity"
              >
                <MdAdd />
              </button>
              <span className="mx-2 text-2xl font-bold text-gray-400 transition-all duration-200 ease-in-out">{cartItem.qty}</span>
              <button
                id="decrement-btn"
                onClick={handleDecrement}
                className="flex h-8 w-8 transform items-center justify-center rounded-full bg-red-500 text-white transition-all duration-200 ease-in-out hover:scale-110 hover:bg-red-600"
                aria-label="Decrease quantity or remove item"
              >
                {cartItem.qty > 1 ? <FaMinus /> : <FaRegTrashAlt />}
              </button>
            </div>
          ) : (
            <button
              className="flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-2 text-white transition-all duration-500 hover:bg-primary-600"
              onClick={onAddToCart}
              aria-label="اضافه به سبد خرید"
            >
              <MdAddShoppingCart />
              اضافه به سبد خرید
            </button>
          )
        ) : (
          <p className="rounded-lg p-4 text-center font-bold text-red-600 shadow-md">متأسفیم، این محصول تمام شده! برای خرید زودتر اقدام کنید تا از دستش ندید. 🙁</p>
        )}

        {isLowStock && <p className="font-bold text-red-500">فقط {product.countInStock} عدد باقی مانده!</p>}
      </div>
    </div>
  );
};

export default ProductInfo;
