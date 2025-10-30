import { theme } from "@/constants/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  icon: ReactNode;
  focused: boolean;
};

export const TabBarIcon = ({ icon, focused = false }: Props) => {
  return (
    <View style={[styles.wrapper, focused ? styles.wrapperFocused : null]}>
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 30,
    width: 72,
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperFocused: {
    backgroundColor: theme.color.background.pressed,
  },
});
