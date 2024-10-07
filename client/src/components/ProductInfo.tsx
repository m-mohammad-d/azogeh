import React from "react";
import ProductImage from "./ProductImage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store"; // فرض بر این است که نوع RootState تعریف شده
import { increaseQuantity, decreaseQuantity, removeItem } from "../store/CartSlice"; // اضافه کردن اکشن‌ها
import { FaRegTrashAlt } from "react-icons/fa";

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
};

const ProductInfo: React.FC<ProductProps> = ({
  title,
  brand,
  category,
  sales,
  rating,
  mainImageUrl,
  altText,
  imageCarousel,
  productId,
  onAddToCart,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find(item => item._id === productId); // بررسی وجود محصول در سبد خرید

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(decreaseQuantity(productId));
    } else if (cartItem && cartItem.quantity === 1) {
      dispatch(removeItem(productId));
    }
  };

  return (
    <div className="flex px-8 w-2/3 justify-between">
      <ProductImage mainImageUrl={mainImageUrl} altText={altText} imageCarousel={imageCarousel} />
      <div className="space-y-4 mr-11">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-lg mb-1">
          <span className="font-bold">برند:</span> {brand}
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">دسته بندی:</span> {category}
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">تعداد فروش:</span> {sales} نفر
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">امتیاز:</span> {rating}
        </p>

        {cartItem ? (
          <div className="flex items-center">
            <button
              id="increment-btn"
              onClick={() => dispatch(increaseQuantity(productId))}
              className="flex justify-center items-center w-8 h-8 rounded-full text-white focus:outline-none bg-green-500 hover:bg-green-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12"></path>
              </svg>
            </button>
            <span className="text-2xl text-gray-400 font-bold mx-2">{cartItem.quantity}</span>
            <button
              id="decrement-btn"
              onClick={handleDecrement}
              className="flex justify-center items-center w-8 h-8 rounded-full text-white focus:outline-none bg-red-500 hover:bg-red-600"
            >
              {cartItem.quantity > 1 ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
