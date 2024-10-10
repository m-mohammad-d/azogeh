// CartItem.tsx
import React from "react";

interface ProductProps {
  _id: string;
  price: number;
  name: string;
  image: string;
  quantity: number;
}
interface CartItemProps {
  product: ProductProps;
}

const OrderCartItem: React.FC<CartItemProps> = ({ product }) => {
  return (
    <div className="flex justify-between items-center border p-4 mb-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <img src={`/images/${product.image}`} alt={product.name} className="w-16 h-16 object-cover mr-4" />
        <div className="text-right">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">تعداد: {product.quantity}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">{product.price} تومان</p>
      </div>
    </div>
  );
};

export default OrderCartItem;
