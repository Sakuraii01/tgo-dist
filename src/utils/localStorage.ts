import { useMemo } from "react";

export const clearToken = async () => {
  return (
    localStorage.removeItem("user_account"),
    localStorage.removeItem("user_google_account")
  );
};

export const useToken = () => {
  return useMemo(() => {
    return JSON.parse(localStorage.getItem("user_account") ?? "{}") as {
      token: string;
      role: string;
    };
  }, []);
};

export const useGoogleData = () => {
  return useMemo(() => {
    return JSON.parse(
      localStorage.getItem("user_google_account") ?? "{}"
    ) as string;
  }, []);
};
