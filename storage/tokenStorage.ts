import { createMMKV } from "react-native-mmkv";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const storage = createMMKV();

export const tokenStorage = {
  getAccessToken: () => storage.getString(ACCESS_TOKEN_KEY),
  getRefreshToken: () => storage.getString(REFRESH_TOKEN_KEY),

  setTokens: (accessToken: string, refreshToken: string) => {
    storage.set(ACCESS_TOKEN_KEY, accessToken);
    storage.set(REFRESH_TOKEN_KEY, refreshToken);
  },

  clear: () => {
    storage.clearAll();
  },
};
