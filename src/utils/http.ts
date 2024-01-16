import axios from "axios";
import { toast } from "react-toastify";
import getUser, { removeUser } from "./storageHelper";
const qs = require("qs");

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}${"api/"}`;

const http = axios.create({
  baseURL: baseUrl,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Cache-Control": "no-store",
  },
  paramsSerializer(params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  (config: any) => {
    const headerToken = getUser()?.token?.accessToken;
    if (headerToken) {
      config.headers.Authorization = `Bearer ${headerToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: any) => {
    if (response.status === 200) {
      if (response.data instanceof Blob) {
        return response.data;
      }
      toast.success(response?.data?.message, {
        delay: 1,
      });
      return response.data;
    }
    return Promise.reject(response.data.message);
  },
  async (error) => {
    if (error.response.status === 401) {
      toast.error("Oturumun Süresi Dolmuştur");
      setTimeout(() => {
        removeUser();
        window.location.href = "/login";
      }, 2000);
    } else {
      if(error.response.status === 500){
        window.location.href = "/error";
        return Promise.reject(error.response?.data);
      }
      
    }
    toast.error(error.response?.data.Message);
    toast.error(error.response?.data.message);
  }
);

export default http;
