import axios from "axios";
import { appConfig } from "../../config";
import { User } from "../../types/user";
import { LoginDTO } from "./types";

export async function doLogin(loginData: LoginDTO) {
  return axios.post<{ access_token: string; user: User }>(
    `${appConfig.api.url}/auth/login`,
    loginData
  );
}
