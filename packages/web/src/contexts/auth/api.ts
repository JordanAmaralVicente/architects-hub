import { appConfig } from "../../config";
import { User } from "../../types/user";
import { axiosApi } from "../../utils/axios";
import { LoginDTO } from "./types";

interface AuthenticationData {
  user: User;
  access_token?: string;
}

export async function doLogin(loginData: LoginDTO) {
  const result = await axiosApi.post<AuthenticationData>(
    `${appConfig.api.url}/auth/login`,
    loginData
  );

  return result.data;
}

export async function verifyToken(token: string) {
  const result = await axiosApi.post<AuthenticationData>("/auth/verify", null, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return result.data;
}
