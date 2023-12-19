import axios from "axios";
import { toast } from "react-toastify";
import getUser from "./storageHelper";
const qs = require("qs");

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}${"api/"}`;

const http = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
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
      //Reflesh token
      window.location.href = "/login";
    }
    toast.error(error.response?.data?.message);
    if (error.response?.data && error.response.data.error) {
      if (error.response.data.error.details) {
        return Promise.reject(
          error.response.data.error.message +
            " " +
            error.response.data.error.details
        );
      } else {
        return Promise.reject(error.response.data.error.message);
      }
    }
    return Promise.reject(error.response?.data);
  }
);

export default http;
