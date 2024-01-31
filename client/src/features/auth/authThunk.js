import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { setUser } from "./authSlice";

export const attempRegister = (data) =>
  axiosInstance.post("auth/local/signup", data);

export const resendVerification = async (email) => {
  const res = await axiosInstance.post("auth/email/conformation", { email });
  toast.info(res.data.message);
};

export const attemptLoginThunk = async ({ data, navigate }, thunkAPI) => {
  const resp = await axiosInstance.post("auth/local/signin", data);
  thunkAPI.dispatch(setUser(resp.data.user));
  navigate("/profile");
};
export const activateAccountThunk = async ({ token, navigate }, thunkAPI) => {
  try {
    const resp = await axiosInstance.get(`auth/email/verify/${token}`);
    toast.success(resp.data.message);
    navigate("/login");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const googleSignUpThunk = async ({ code, navigate }, thunkAPI) => {
  try {
    const resp = await axiosInstance.post(`auth/google`, { code });
    toast.success(resp.data.message);
    thunkAPI.dispatch(setUser(resp.data.user));
    navigate("/profile");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const requestResetPasswordLink = (email) =>
  axiosInstance.post(`user/password/forgot`, email);

export const resetPassword = async ({ token, newPassword }, navigate) => {
  try {
    const resp = await axiosInstance.post(`user/password/reset/${token}`, {
      newPassword,
    });
    toast.success(resp.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    navigate("/login");
  }
};
