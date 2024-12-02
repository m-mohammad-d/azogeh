interface ShippingAddress {
  province: string;
  city: string;
  street: string;
  _id: string;
}

interface OrderItem {
  product: string;
  qty: number;
  _id: string;
}

interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
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
  paidAt?: string;
  deliveredAt?: string;
}

interface Data {
  orders: Order[];
}

export interface Response {
  status: string;
  results: number;
  pagination: null;
  data: Data;
}
