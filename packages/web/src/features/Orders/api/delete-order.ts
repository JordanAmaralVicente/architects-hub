import { axiosApi } from "../../../utils/axios";

export async function deleteOrder(orderId: string) {
  return axiosApi.delete(`/order/${orderId}`);
}
