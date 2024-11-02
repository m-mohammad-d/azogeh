import { Product } from "./product";
export interface shippingAddress {
  province: string;
  city: string; 
  street: string; 
}

interface Cart {
  orderItems: Product[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress?: shippingAddress;
  paymentMethod?: string;
}

export default Cart;
