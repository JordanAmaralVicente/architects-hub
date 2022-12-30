import { User } from "../../../types/user";
import { axiosApi } from "../../../utils/axios";

export async function getArchitects(): Promise<Partial<User>[]> {
  const result = await axiosApi.get<Partial<User>[]>("/users/architects");

  return result.data;
}
