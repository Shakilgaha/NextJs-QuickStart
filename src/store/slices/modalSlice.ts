import { ModalState } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalState = {
  isModalOpen: { open: false },
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<{ open: boolean; type?: string; data?: unknown }>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setModalOpen } = ModalSlice.actions;

export default ModalSlice.reducer;
