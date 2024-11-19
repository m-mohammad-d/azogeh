import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface CartItemProps {
  item: {
    _id: string;
    image: string;
    name: string;
    price: number;
    qty: number; 
  };
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="border-b py-4 flex items-center justify-between">
      <img src={`${item.image}`} alt={item.name} className="w-20 h-20 object-cover" />
      <div className="flex flex-col ml-4 flex-grow">
        <span className="font-semibold text-lg">{item.name}</span>
        <span className="text-gray-600">قیمت: {item.price.toLocaleString()} تومان</span>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <button
              id="increment-btn"
              onClick={() => onIncrease(item._id)}
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
            <span className="text-2xl text-gray-400 font-bold mx-2">{item.qty}</span>
            <button
              id="decrement-btn"
              onClick={() => (item.qty > 1 ? onDecrease(item._id) : onRemove(item._id))} // Use the passed function
              className="flex justify-center items-center w-8 h-8 rounded-full text-white focus:outline-none bg-red-500 hover:bg-red-600"
            >
              {item.qty > 1 ? (
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
        </div>
      </div>
    </div>
  );
};

export default CartItem;
