import { configureStore } from "@reduxjs/toolkit";
import { authReducer, modalReducer, toastReducer } from "./slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    toast: toastReducer,
  },
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
