import { OrderStatus } from "../../../types/order-status";
import { axiosApi } from "../../../utils/axios";

interface OrderUpdatableFields {
  title: string;
  description: string;
  status: OrderStatus;
}

export async function updateOrder(
  orderId: string,
  data: Partial<OrderUpdatableFields>
) {
  return axiosApi.put(`orders/${orderId}`, data);
}
