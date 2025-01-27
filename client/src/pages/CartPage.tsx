import { useState } from "react";
import toast from "react-hot-toast";
import { FaCartPlus, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../services/UsersApi";
import { RootState } from "../store";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../store/CartSlice";
import Pagination from "../components/Pagination";
import { separateThousands } from "../utils/FormatNumber";
import CartItem from "../components/CartItem";
import Button from "../components/Button";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.orderItems);
  const { data: userInfo } = useGetMeQuery({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  const handleRemove = (itemId: string) => {
    dispatch(removeFromCart({ _id: itemId }));
    toast.success("محصول با موفقیت حذف شد");
  };

  const handleIncrease = (itemId: string) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrease = (itemId: string) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleCheckout = () => {
    if (userInfo) {
      navigate("/checkout");
    } else {
      navigate(`/login?backUrl=/checkout`);
      toast("برای تکمیل خرید باید وارد شوید", {
        duration: 4000,
        position: "top-center",
        icon: <FaLock />,
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(0);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mx-auto mt-8 max-w-screen-lg rounded-lg border border-gray-200 bg-white px-4 py-6 shadow">
      <h1 className="mb-6 text-center text-2xl font-bold text-neutral-gray-8">سبد خرید</h1>

      {cartItems.length === 0 ? (
        <div className="space-y-4 p-6 text-center text-lg">
          <p className="text-gray-600">سبد خرید شما خالی است.</p>
          <p className="text-gray-500">برای خرید محصولات می‌توانید به صفحه محصولات مراجعه کنید و محصولات مورد نظر خود را به سبد خرید اضافه کنید.</p>
          <Link to="/products">
            <Button size="medium" className="mt-4 py-3" shape={8}>
              <span className="flex items-center justify-center gap-3">
                <FaCartPlus />
                <span>مشاهده محصولات</span>
              </span>
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <div>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse border-b border-b-neutral-gray-3 text-right">
                <thead>
                  <tr>
                    <th className="p-4 font-medium text-neutral-800">محصول</th>
                    <th className="p-4 font-medium text-neutral-800">قیمت</th>
                    <th className="p-4 font-medium text-neutral-800">تعداد</th>
                    <th className="p-4 font-medium text-neutral-800">قیمت کل</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id} className="border-t border-t-neutral-gray-3">
                      <td className="flex items-center gap-4 p-4">
                        <button onClick={() => handleRemove(item._id)}>
                          <img src="/icon/location-cross.png" alt="location cross" />
                        </button>
                        <img src={item.image} alt={item.name} className="h-20 w-20 rounded border object-cover" />
                        <span className="line-clamp-1 text-neutral-gray-8">{item.name}</span>
                      </td>
                      <td className="p-4 text-neutral-gray-8">{separateThousands(item.price)} تومان</td>
                      <td className="p-4 text-neutral-gray-8">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleDecrease(item.id)} className="h-8 w-8 rounded bg-gray-200 text-neutral-gray-8 hover:bg-gray-300">
                            -
                          </button>
                          <span>{item.qty}</span>
                          <button onClick={() => handleIncrease(item.id)} className="h-8 w-8 rounded bg-gray-200 text-neutral-gray-8 hover:bg-gray-300">
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-primary">{separateThousands(item.price * item.qty)} تومان</td>
                      <td className="p-4 text-center"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="block md:hidden">
              {currentItems.map((item) => (
                <CartItem key={item._id} item={item} onIncrease={handleIncrease} onDecrease={handleDecrease} onRemove={handleRemove} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col justify-between md:flex-row">
            <div>
              <h2 className="text-xl font-bold text-neutral-gray-8">جمع کل: {separateThousands(calculateTotal())} تومان</h2>
            </div>
            <Button onClick={handleCheckout} className="mt-4 md:mt-auto">
              تکمیل فرایند خرید
            </Button>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page: number) => setCurrentPage(page)} />
        </div>
      )}
    </div>
  );
}

export default CartPage;
