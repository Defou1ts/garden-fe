import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export function HeaderBackButton({ onPress }: { onPress?: () => void }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={onPress ?? (() => router.back())}
      style={{ paddingHorizontal: 12, paddingVertical: 8 }}
      hitSlop={8}
    >
      <Image
        source={require("@/assets/images/arrow-left.png")}
        style={{
          width: 26,
          height: 26,
        }}
      />
    </Pressable>
  );
}

type HeaderOptionsArgs = {
  title: string;
};

export function buildDefaultHeaderOptions({ title }: HeaderOptionsArgs) {
  return {
    title,
    headerTitleStyle: { color: theme.color.text },
    headerStyle: { backgroundColor: theme.color.background.default },
    headerShadowVisible: false,
    headerLeft: () => <HeaderBackButton />,
  } as const;
}
