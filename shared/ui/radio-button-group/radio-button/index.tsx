import { theme } from "@/constants/theme";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../../Typography";

type Props = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export const RadioButton = ({
  label,
  checked,
  disabled = false,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={styles.wrapper}>
        <View
          style={[
            styles.roundWrapper,
            disabled ? styles.roundWrapperDisabled : null,
          ]}
        >
          {checked ? <View style={styles.round} /> : null}
        </View>
        <Typography type="default">{label}</Typography>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  roundWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderWidth: 2.5,
    borderColor: theme.color.background.pressed,
    borderRadius: "50%",
  },
  roundWrapperDisabled: {
    borderColor: theme.color.background.disabled,
  },
  round: {
    width: 17.5,
    height: 17.5,
    backgroundColor: theme.color.background.pressed,
    borderRadius: "50%",
  },
});
