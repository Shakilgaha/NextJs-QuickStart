import { Post } from "./methods";
import { useMutations } from "./reactQuery";
import { API_URLS, QUERY_KEYS } from "@/constants";
import {
  LoginPayload,
  RegisterPayload,
  SendOtpPayload,
  VerifyOtpPayload,
  ResetPasswordPayload,
} from "@/types";

export const Mutations = {
  // ************ Auth Flow ***********
  useSignin: () =>
    useMutations<LoginPayload, unknown>([QUERY_KEYS.SIGNIN], (input) =>
      Post(API_URLS.LOGIN, input, false),
    ),

  useRegister: () =>
    useMutations<RegisterPayload, unknown>([QUERY_KEYS.REGISTER], (input) =>
      Post(API_URLS.REGISTER, input, false),
    ),

  useSendOtp: () =>
    useMutations<SendOtpPayload, unknown>([QUERY_KEYS.SEND_OTP], (input) =>
      Post(API_URLS.SEND_OTP, input, false),
    ),

  useVerifyOtp: () =>
    useMutations<VerifyOtpPayload, unknown>([QUERY_KEYS.VERIFY_OTP], (input) =>
      Post(API_URLS.VERIFY_OTP, input, false),
    ),

  useResetPassword: () =>
    useMutations<ResetPasswordPayload, unknown>(
      [QUERY_KEYS.RESET_PASSWORD],
      (input) => Post(API_URLS.RESET_PASSWORD, input, false),
    ),
};
