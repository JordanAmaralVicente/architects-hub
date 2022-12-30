import axios from "axios";
import { appConfig } from "../config";

export const axiosApi = axios.create({
  baseURL: appConfig.api.url,
});
