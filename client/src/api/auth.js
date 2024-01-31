import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";

export const googleSignIn = async (code) => {
  const resp = await axiosInstance.post("auth/google", { code });
  toast.success(resp.data.message);
  return resp.data.user;
};

export const attemptRegister = (data) =>
  axiosInstance.post("auth/local/signup", data);

export const resendVerification = async (email) => {
  const res = await axiosInstance.post("auth/email/conformation", { email });
  toast.info(res.data.message);
};

export const activateAccount = async (token) => {
  const resp = await axiosInstance.get(`auth/email/verify/${token}`);
  toast.success(resp.data.message);
};

export const attemptLogin = async (data) => {
  const resp = await axiosInstance.post("auth/local/signin", data);
  toast.success(resp.data.message);
  return resp.data.user;
};
