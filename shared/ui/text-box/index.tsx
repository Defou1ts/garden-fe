import { theme } from "@/constants/theme";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export const TextBox = ({ editable = true, ...props }: TextInputProps) => {
  return (
    <TextInput
      style={[styles.input, !editable ? styles.inputDisabled : null]}
      editable={editable}
      {...props}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 8,
    borderColor: theme.color.background.usual,
    borderWidth: 2,
    borderRadius: 20,

    fontSize: 14,
    fontWeight: "regular",
    fontFamily: "Raleway_400Regular",
    color: theme.color.text,
  },
  inputDisabled: {
    borderColor: theme.color.background.disabled,
  },
});
