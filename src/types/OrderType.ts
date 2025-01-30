import { Product } from "./product";
import { User } from "./reviewsType";

interface ShippingAddress {
  province: string;
  city: string;
  street: string;
  _id: string;
}

export interface OrderItemRequest {
  product: Product;
  qty: number;
  _id: string;
}

export interface OrderRequest {
  status: string;
  data: {
    order: {
      _id: string;
      user: User;
      orderItems: OrderItemRequest[];
      shippingAddress: ShippingAddress;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
      isPaid: boolean;
      isDelivered: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

export interface OrderItemListResponse {
  product: string;
  qty: number;
  _id: string;
}

export interface Order {
  _id: string;
  user: User;
  orderItems: OrderItemListResponse[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface OrderListResponse {
  status: string;
  results: number;
  pagination: null;
  data: {
    orders: Order[];
  };
}

export interface TopSellingProduct {
  product: Product[];
  totalSold: number;
}

export interface TopSellingProductResponse {
  data: TopSellingProduct[];
  result: number;
  status: string;
}
