import { theme } from "@/constants/theme";
import { TextBox } from "@/shared/ui/text-box";
import React, { ReactNode } from "react";
import { StyleSheet, TextInputProps, View } from "react-native";

type Props = {
  placeholder?: string;
  left?: ReactNode;
  right?: ReactNode;
} & TextInputProps;

export const SearchBar = ({ placeholder, left, right, ...props }: Props) => {
  return (
    <View style={styles.wrapper}>
      {left ? <View style={styles.left}>{left}</View> : null}
      <View style={styles.inputWrapper}>
        <TextBox placeholder={placeholder} {...props} />
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  left: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.color.background.usual,
  },
  right: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.color.background.usual,
  },
});
