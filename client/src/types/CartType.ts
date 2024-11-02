import { Product } from "./product";

interface Cart {
  orderItems: Product[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress?: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod?: string;
}

export default Cart;
