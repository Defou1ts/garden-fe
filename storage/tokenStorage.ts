import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const tokenStorage = {
  getAccessToken: () => SecureStore.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => SecureStore.getItem(REFRESH_TOKEN_KEY),

  setTokens: (accessToken: string, refreshToken: string) => {
    SecureStore.setItem(ACCESS_TOKEN_KEY, accessToken);
    SecureStore.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clear: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  },
};
