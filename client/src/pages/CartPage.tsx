import { useSelector, useDispatch } from "react-redux";
import { removeItem, increaseQuantity, decreaseQuantity, clearCart } from "../store/CartSlice";
import { RootState } from "../store";
import { useState } from "react";
import Pagination from "../components/Pagination";
import CartItem from "../components/CartItem";
import { separateThousands } from "../utils/FormatNumber";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  const handleRemove = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  const handleIncrease = (itemId: string) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrease = (itemId: string) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(0);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-screen-xl mx-4 px-4 py-6 border mt-16 border-gray-100 2xl:mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-400">سبد خرید</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">سبد خرید شما خالی است.</p>
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
          <div className="flex justify-between flex-col md:flex-row md:items-center">
            <div className="mt-4">
              <h2 className="text-xl font-bold">جمع کل: {separateThousands(calculateTotal())} تومان</h2>
            </div>
            <button onClick={handleClearCart} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
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
