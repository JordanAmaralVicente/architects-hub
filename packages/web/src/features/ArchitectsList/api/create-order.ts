import { axiosApi } from "../../../utils/axios";

interface CreateOrderDto {
  architectId: string;
  clientId: string;
  title: string;
  description: string;
}

export async function createServiceOrder(order: CreateOrderDto) {
  const result = await axiosApi.post("/orders/create", order);

  return result.data;
}
