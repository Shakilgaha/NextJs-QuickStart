import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { setToast, getToken } from "@/utils";
import { STATUS } from "@/constants";

export async function Put<TInput, TResponse>(url: string, data?: TInput, isToken: boolean = true, isToast: boolean = true): Promise<TResponse> {
  const authToken = getToken();
  const isFormData = data instanceof FormData;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const config: AxiosRequestConfig = {
    method: "PUT",
    url: BASE_URL + url,
    headers: {
      ...(isToken && authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    data,
  };

  try {
    const response = await axios(config);
    const resData = response.data;

    if (response.status === STATUS.OK) {
      if (isToast && resData && (resData as { message?: string }).message) {
        setToast({ message: (resData as { message: string }).message, type: "success" });
      }
      return resData;
    } else {
      return null as TResponse;
    }
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const responseData = axiosError.response?.data;
    const message = responseData?.message || axiosError.message || "Something went wrong";

    setToast({ message, type: "error" });
    throw new Error(message);
  }
}
