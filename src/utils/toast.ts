import store from "@/store/store";
import { showToast } from "@/store/slices/toastSlice";
import { SetToastParams } from "@/types";

export const setToast = (params: SetToastParams) => {
  store.dispatch(showToast(params));
};
