import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "../../utils/localStorage";

import {
  attemptLoginThunk,
  activateAccountThunk,
  googleSignUpThunk,
} from "./authThunk";
import { useSelector } from "react-redux";

export const loginUser = createAsyncThunk("auth/login", attemptLoginThunk);
export const activateAccount = createAsyncThunk(
  "auth/activateAccount",
  activateAccountThunk
);

export const googleSignUp = createAsyncThunk(
  "auth/googleSignUp",
  googleSignUpThunk
);

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
