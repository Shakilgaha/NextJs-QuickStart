export const API_URLS = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  SEND_OTP: "/api/auth/send-otp",
  VERIFY_OTP: "/api/auth/verify-otp",
  RESET_PASSWORD: "/api/auth/reset-password",
  ME: "/api/auth/me",
  TRANSACTIONS: "/api/transactions",
} as const;
