import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { setToast, getToken } from "@/utils";
import { STATUS } from "@/constants";

export async function Delete<T = unknown, TInput = unknown>(url: string, data?: TInput): Promise<T> {
  const authToken = getToken();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: BASE_URL + url,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data,
  };

  try {
    const response = await axios(config);
    const resData = response.data;

    if (response.status === STATUS.OK) {
      if (resData && (resData as { message?: string }).message) {
        setToast({ message: (resData as { message: string }).message, type: "success" });
      }
      return resData;
    } else {
      return null as T;
    }
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const responseData = axiosError.response?.data;
    const message = responseData?.message || axiosError.message || "Something went wrong";

    setToast({ message, type: "error" });
    throw new Error(message);
  }
}
