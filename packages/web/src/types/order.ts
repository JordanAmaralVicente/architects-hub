import { OrderStatus } from "./order-status";

export interface Order {
  id: string;
  title: string;
  description: string;
  status: OrderStatus;
}
