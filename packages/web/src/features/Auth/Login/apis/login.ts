import axios from "axios";
import { appConfig } from "../../../../config";
import { LoginDTO } from "../types";

export async function login(loginData: LoginDTO) {
  return axios.post(`${appConfig.api.url}/auth/login`, loginData);
}
