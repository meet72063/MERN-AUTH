import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { logOut } from "../features/auth/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.authorization !== false) {
      const token = getUserFromLocalStorage()?.token;
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  // UnAuthorized
  if (error.response.status === 401) {
    thunkAPI.dispatch(logOut());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  } else {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export default axiosInstance;
