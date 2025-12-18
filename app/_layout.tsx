import { theme } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRalewayFonts } from "@/hooks/useRalewayFonts";
import { queryClient } from "@/query/queryClient";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { areFontsLoaded, errorFontsLoaded } = useRalewayFonts();

  useEffect(() => {
    if (areFontsLoaded || errorFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [areFontsLoaded, errorFontsLoaded]);

  const navigationTheme =
    colorScheme === "dark"
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: theme.color.background.default,
            card: theme.color.background.default,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: theme.color.background.default,
            card: theme.color.background.default,
          },
        };

  if (!areFontsLoaded && !errorFontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={navigationTheme}>
        <Stack
          initialRouteName="auth"
          layout={(props) => <View style={styles.container} {...props} />}
        >
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.color.background.default,
  },
});
