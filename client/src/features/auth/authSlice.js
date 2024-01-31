import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "../../utils/localStorage";

import { useSelector } from "react-redux";

const initialState = {
  user: getUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
      setUserToLocalStorage(payload);
    },

    logOut(state) {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
});

export const getUser = () => {
  return useSelector((state) => state.auth);
};

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
