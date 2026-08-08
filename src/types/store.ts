import { AuthState } from "./auth";

export interface ModalState {
  isModalOpen: {
    open: boolean;
    type?: string;
    data?: unknown;
  };
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  duration?: number;
}

export interface SetToastParams {
  message: string;
  type: "success" | "error" | "info";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  duration?: number;
}

export interface ToastState {
  toasts: ToastMessage[];
}

export interface RootState {
  auth: AuthState;
  modal: ModalState;
  toast: ToastState;
}
