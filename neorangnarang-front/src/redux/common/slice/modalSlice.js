import { createSlice } from "@reduxjs/toolkit";

const modalInitState = {
  profileOpen: false,
  insertOpen: false,
  readOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitState,
  reducers: {
    openProfileModal: (state, action) => {
      state.profileOpen = true;
    },
    closeProfileModal: (state, action) => {
      state.profileOpen = false;
    },
    openInsertModal: (state, action) => {
      state.insertOpen = true;
    },
    closeInsertModal: (state, action) => {
      state.insertOpen = false;
    },
    openReadModal: (state, action) => {
      state.readOpen = true;
    },
    closeReadModal: (state, action) => {
      state.readOpen = false;
    },
  },
});

export const {
  openProfileModal,
  closeProfileModal,
  openInsertModal,
  closeInsertModal,
  openReadModal,
  closeReadModal,
} = modalSlice.actions;

export default modalSlice.reducer;
