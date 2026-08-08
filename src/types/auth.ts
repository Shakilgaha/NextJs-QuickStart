import * as Yup from "yup";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/schemas";

export type LoginPayload = Yup.InferType<typeof loginSchema>;
export type RegisterPayload = Yup.InferType<typeof registerSchema>;
export type SendOtpPayload = Yup.InferType<typeof forgotPasswordSchema>;
export type ResetPasswordPayload = Yup.InferType<typeof resetPasswordSchema>;

export interface VerifyOtpPayload {
  email: string;
  otpCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
}
