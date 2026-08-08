import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types";
import { STORAGE_KEYS } from "@/constants";

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const userStr = localStorage.getItem(STORAGE_KEYS.USER);
        let user: User | null = null;
        if (userStr) {
          try {
            user = JSON.parse(userStr);
          } catch {
            user = null;
          }
        }
        state.token = token;
        state.user = user;
        state.isAuthenticated = !!token;
        state.isHydrated = true;
      }
    },
    setSignin: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isHydrated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload.user));
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload));
      }
    },
    setSignOut: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    },
  },
});

export const { hydrateAuth, setSignin, setUser, setSignOut } = authSlice.actions;
export default authSlice.reducer;
