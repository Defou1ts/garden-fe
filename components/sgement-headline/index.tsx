import { ArrowDownIcon } from "@/assets/icons/ArrowDownIcon";
import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import { Pressable, StyleProp, StyleSheet } from "react-native";

type Props = {
  onPress: () => void;
  title: string;
  style?: StyleProp<any>;
};

export const SegmentHeadline = ({ title, onPress, style }: Props) => {
  return (
    <Pressable style={[styles.tips, style]} onPress={onPress}>
      <Typography type="title">{title}</Typography>
      <ArrowDownIcon
        width={20}
        height={35}
        fill={theme.color.background.usual}
        style={{ transform: [{ rotate: "-90deg" }] }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tips: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
