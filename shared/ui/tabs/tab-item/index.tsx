import { theme } from "@/constants/theme";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../../Typography";

type Props = {
  isActive: boolean;
  label: string;
  onClick: () => void;
};

export const TabItem = ({ isActive, label, onClick }: Props) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={[styles.wrapper, isActive ? styles.active : null]}>
        <Typography type="label" style={styles.text}>
          {label}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 19,
    paddingVertical: 12.5,
    backgroundColor: theme.color.background.usual,
    borderRadius: 16,
  },
  active: {
    backgroundColor: theme.color.background.pressed,
  },
  text: {
    color: theme.color.background.default,
  },
});
