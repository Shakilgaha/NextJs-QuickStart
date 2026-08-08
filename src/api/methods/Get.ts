import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { setToast, getToken } from "@/utils";
import { STATUS, STORAGE_KEYS } from "@/constants";

export async function Get<T>(url: string, params?: unknown, headers?: Record<string, string>): Promise<T> {
  const authToken = getToken();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
  const config: AxiosRequestConfig = {
    method: "GET",
    headers: {
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ...headers,
    },
    params,
  };

  try {
    const response = await axios.get<T>(BASE_URL + url, config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const responseData = axiosError.response?.data;
    const message = responseData?.message || axiosError.message || "Something went wrong";

    if (axiosError?.response?.status === STATUS.UNAUTHORIZED) {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/login";
      }
    } else {
      setToast({ message, type: "error" });
    }
    throw new Error(message);
  }
}
