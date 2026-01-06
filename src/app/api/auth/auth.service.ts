import axios from "axios";
import { endpoints } from "../endpoints";
import { SignInOptions, signInResponse } from "./auth.types";
import { useAuthStore } from "@/app/stores/auth";


export const login = async ({
  email,
  password,
}: SignInOptions): Promise<signInResponse> => {
  const response = await axios.post(endpoints.auth.login, {
    email,
    password,
  });

  const { user, token } = response.data;

  if (!token) {
    throw new Error("No access token received");
  }

  useAuthStore.getState().setAuth(user, token);

  return { user, token };
};

