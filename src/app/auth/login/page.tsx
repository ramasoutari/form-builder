"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileText, Loader2 } from "lucide-react";
import { Card } from "@/app/components/UI/card";
import { Label } from "@/app/components/UI/label";
import { Input } from "@/app/components/UI/input";
import { Button } from "@/app/components/UI/button";
import { useLogin } from "@/app/api/auth/auth.api";

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login.mutateAsync({
        email: formData.email,
        password: formData.password,
      });
      toast.success("Signed in successfully!");
      router.push("/forms");
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Form Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
             Sign in to your account
          </p>
        </div>

        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={login.isPending}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={login.isPending}
                className="h-10"
              />
            </div>

            <Button
              type="submit"
              disabled={login.isPending}
              className="w-full h-10 font-medium"
            >
              {login.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign In</>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Don't have an account?
              <button
                type="button"
                onClick={() => {
                  setFormData({ email: "", password: "" });
                }}
                className="ml-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
               Sign up
              </button>
            </p>
          </div>
        </Card>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Demo credentials: test@example.com / P@ssw0rd
        </p>
      </div>
    </div>
  );
}
