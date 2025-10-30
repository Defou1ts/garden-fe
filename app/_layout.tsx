import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRalewayFonts } from "@/hooks/useRalewayFonts";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
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

  if (!areFontsLoaded && !errorFontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: Constants.statusBarHeight,
  },
});
