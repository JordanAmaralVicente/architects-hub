import { Order } from "../../../types/order";
import { UserRole } from "../../../types/user-role";
import { axiosApi } from "../../../utils/axios";

export async function getOrders(
  userId: string,
  userRole: UserRole
): Promise<Order[]> {
  const path = userRole === UserRole.ARCHITECT ? "architect" : "user";

  const result = await axiosApi.get<Order[]>(`/orders/${path}/${userId}`);

  return result.data;
}
