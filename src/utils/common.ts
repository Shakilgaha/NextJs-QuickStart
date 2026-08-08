import { STORAGE_KEYS } from "@/constants";

export const Stringify = (value: object): string => {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
};

export const Storage = {
  getItem: (key: string): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
  clear: (): void => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
};

export const getToken = (): string => {
  return Storage.getItem(STORAGE_KEYS.TOKEN) || "";
};
