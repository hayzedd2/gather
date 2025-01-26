import { useState } from "react";

export const useFormHelpers = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setError("");
    setSuccess("");
    setLoading(false);
  };

  return {
    error,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    resetState,
  };
};
