import React from "react";
import ProductImage from "./ProductImage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../store/CartSlice";
import { FaMinus, FaRegTrashAlt, FaTag } from "react-icons/fa";
import toast from "react-hot-toast";
import { separateThousands } from "../utils/FormatNumber";
import { MdAdd, MdAddShoppingCart } from "react-icons/md";
import { Product } from "../types/product";

type ProductInfoProps = {
  product: Product;
  onAddToCart: () => void;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.orderItems);
  const cartItem = cartItems.find(item => item._id === product._id);

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

  const discountPercentage = product.discountedPrice
    ? ((product.price - product.discountedPrice) / product.price) * 100
    : null;

  const isInStock = product.countInStock > 0;
  const isLowStock = product.countInStock >= 1 && product.countInStock <= 30;

  return (
    <div className="flex flex-col md:flex-row px-8 w-full md:w-2/3 justify-between gap-10">
      <div className="mb-6 mx-auto">
        <ProductImage
          mainImageUrl={`${product.image}`}
          altText={product.name}
          imageCarousel={product.images.map(img => `${img}`)}
        />
      </div>
      <div className="space-y-4 mr-0 md:mr-11">
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-lg mb-1">
          <span className="font-bold">برند:</span> {product.brand}
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">تعداد فروش:</span> {product.numReviews} خریدار
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">امتیاز:</span> {product.rating}
        </p>
        <p className="text-lg mb-1 flex items-center">
          <span className="font-bold">قیمت:</span>
          {product.discountedPrice ? (
            <>
              <span className="line-through text-gray-500 ml-2 transition-all duration-300 ease-in-out">
                {separateThousands(product.price)} تومن
              </span>
              <span className="ml-2 text-primary-500 font-bold transition-all duration-300 ease-in-out">
                {separateThousands(product.discountedPrice)} تومن
              </span>
              <span className="ml-2 text-green-500 font-bold flex items-center">
                <FaTag className="ml-2" />
                {discountPercentage?.toFixed(0)}% تخفیف
              </span>
            </>
          ) : (
            <span className="text-primary-500 font-bold ml-2 transition-all duration-300 ease-in-out">
              {separateThousands(product.price)} تومن
            </span>
          )}
        </p>

        {isInStock ? (
          cartItem ? (
            <div className="flex items-center">
              <button
                id="increment-btn"
                onClick={() => dispatch(increaseQuantity(product._id))}
                className="flex justify-center items-center w-8 h-8 rounded-full text-white bg-green-500 hover:bg-green-600 transition-all duration-200 ease-in-out transform hover:scale-110"
                aria-label="Increase quantity"
              >
                <MdAdd />
              </button>
              <span className="text-2xl text-gray-400 font-bold mx-2 transition-all duration-200 ease-in-out">
                {cartItem.qty}
              </span>
              <button
                id="decrement-btn"
                onClick={handleDecrement}
                className="flex justify-center items-center w-8 h-8 rounded-full text-white bg-red-500 hover:bg-red-600 transition-all duration-200 ease-in-out transform hover:scale-110"
                aria-label="Decrease quantity or remove item"
              >
                {cartItem.qty > 1 ? <FaMinus /> : <FaRegTrashAlt />}
              </button>
            </div>
          ) : (
            <button
              className="flex items-center gap-2 bg-primary-500 text-white py-2 px-6 rounded-lg transition-all duration-500 hover:bg-primary-600"
              onClick={onAddToCart}
              aria-label="اضافه به سبد خرید"
            >
              <MdAddShoppingCart />
              اضافه به سبد خرید
            </button>
          )
        ) : (
          <p className="text-center text-red-600 font-bold p-4 rounded-lg shadow-md">
            متأسفیم، این محصول تمام شده! برای خرید زودتر اقدام کنید تا از دستش ندید. 🙁
          </p>
        )}

        {isLowStock && <p className="text-red-500 font-bold">فقط {product.countInStock} عدد باقی مانده!</p>}
      </div>
    </div>
  );
};

export default ProductInfo;
