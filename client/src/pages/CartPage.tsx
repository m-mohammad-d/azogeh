import { useSelector, useDispatch } from "react-redux";
import { removeItem, increaseQuantity, decreaseQuantity, clearCart } from "../store/CartSlice";
import { RootState } from "../store";
import { useState } from "react";
import Pagination from "../components/Pagination";
import CartItem from "../components/CartItem";
import { separateThousands } from "../utils/FormatNumber";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  const handleRemove = (itemId: string) => {
    dispatch(removeItem(itemId));
    toast.success("محصول با موفقیت حذف شد");
  };

  const handleIncrease = (itemId: string) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrease = (itemId: string) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("سبد خرید شما پاک شد");
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(0);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-screen-xl mx-4 px-4 py-6 border mt-16 border-gray-100 2xl:mx-auto shadow-lg rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-500">سبد خرید</h1>
      {cartItems.length === 0 ? (
        <div className="text-lg text-center space-y-4 p-6">
          <p className="text-gray-600">سبد خرید شما خالی است.</p>
          <p className="text-gray-500">
            برای خرید محصولات می‌توانید به صفحه محصولات مراجعه کنید و محصولات مورد نظر خود را به سبد خرید اضافه کنید.
          </p>
          <Link to="/products">
            <button className="mt-4 bg-primary-500 hover:bg-primary-600 transition duration-300 ease-in-out text-white px-6 py-3 rounded-lg shadow-md">
              <span className="flex items-center justify-center gap-3">
                <FaCartPlus />
                <span>مشاهده محصولات</span>
              </span>
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {currentItems.map(item => (
            <CartItem
              key={item._id}
              item={item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />
          ))}
          <div className="flex justify-between flex-col md:flex-row md:items-center mt-6">
            <div>
              <h2 className="text-xl font-bold text-gray-700">جمع کل: {separateThousands(calculateTotal())} تومان</h2>
            </div>
            <button
              onClick={handleClearCart}
              className="mt-4 bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out text-white px-6 py-3 rounded-lg shadow-md"
            >
              پاک کردن سبد خرید
            </button>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}

export default CartPage;
