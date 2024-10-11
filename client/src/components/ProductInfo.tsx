import React from "react";
import ProductImage from "./ProductImage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { increaseQuantity, decreaseQuantity, removeItem } from "../store/CartSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { separateThousands } from "../utils/FormatNumber";

type ProductProps = {
  title: string;
  brand: string;
  category: string;
  sales: number;
  rating: number;
  mainImageUrl: string;
  altText: string;
  imageCarousel: string[];
  productId: string;
  onAddToCart: () => void;
  price: number;
  discountedPrice: number;
};

const ProductInfo: React.FC<ProductProps> = ({
  title,
  brand,
  sales,
  rating,
  mainImageUrl,
  altText,
  imageCarousel,
  productId,
  onAddToCart,
  discountedPrice,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find(item => item._id === productId);

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        dispatch(decreaseQuantity(productId));
      } else {
        dispatch(removeItem(productId));
        toast.success("محصول با موفقیت از سبد خرید حذف شد");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row px-8 w-full md:w-2/3 justify-between">
      <div className="mb-6 mx-auto">
        <ProductImage mainImageUrl={mainImageUrl} altText={altText} imageCarousel={imageCarousel} />
      </div>
      <div className="space-y-4 mr-0 md:mr-11">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-lg mb-1">
          <span className="font-bold">برند:</span> {brand}
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">تعداد فروش:</span> {sales} نفر
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">امتیاز:</span> {rating}
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">قیمت:</span> {separateThousands(discountedPrice)} تومن
        </p>

        {cartItem ? (
          <div className="flex items-center">
            <button
              id="increment-btn"
              onClick={() => dispatch(increaseQuantity(productId))}
              className="flex justify-center items-center w-8 h-8 rounded-full text-white bg-green-500 hover:bg-green-600"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12"></path>
              </svg>
            </button>
            <span className="text-2xl text-gray-400 font-bold mx-2">{cartItem.quantity}</span>
            <button
              id="decrement-btn"
              onClick={handleDecrement}
              className="flex justify-center items-center w-8 h-8 rounded-full text-white bg-red-500 hover:bg-red-600"
              aria-label="Decrease quantity or remove item"
            >
              {cartItem.quantity > 1 ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                </svg>
              ) : (
                <FaRegTrashAlt />
              )}
            </button>
          </div>
        ) : (
          <button className="bg-primary-500 text-white py-2 px-4 rounded-md" onClick={onAddToCart}>
            اضافه به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
