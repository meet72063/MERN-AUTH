import { useState } from "react";
import { toast } from "react-toastify";

const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setError(err.response.data);
    const errMsg =
      err.response?.data?.message || "Something went wrong,try again!";
    toast.error(errMsg);
  };

  return { error, handleError };
};

export default useErrorHandler;
