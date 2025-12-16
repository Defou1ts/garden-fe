import { api } from "./axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await api.post("/api/auth/login", data);
    return res.data;
  },

  register: async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    await api.post("/api/auth/register", data);
  },

  logout: async (refreshToken: string) => {
    await api.post("/api/auth/logout", { refreshToken });
  },
};
