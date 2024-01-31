import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";

export const requestResetPasswordLink = async (email) => {
  const res = await axiosInstance.post(`user/password/forgot`, email);
  toast.success(res.data.message);
};

export const resetPassword = async ({ token, newPassword }) => {
  const resp = await axiosInstance.post(`user/password/reset/${token}`, {
    newPassword,
  });
  toast.success(resp.data.message);
};
