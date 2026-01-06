import { useMutation } from "@tanstack/react-query";
import { login } from "./auth.service";
import { useAuthStore } from "@/app/stores/auth";

export const useLogin = () => {

  return useMutation({
    mutationFn: login,
  });
};
