import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Typography } from "../Typography";

type Props = {
  imageSrc: string;
  title: string;
  label: string;
  imageSize?: number;
  textColor?: string;
  backgroundColor?: string;
  padding?: number;
  cornerRadius?: number;
  imageCornerRadius?: number;
  maxTitleLines?: number;
  maxLabelLines?: number;
};

export const Card = ({
  imageSrc,
  title,
  label,
  imageSize = 116,
  textColor = theme.color.text,
  backgroundColor = "transparent",
  padding = 16,
  cornerRadius = 20,
  imageCornerRadius = 0,
  maxTitleLines = 1,
  maxLabelLines = 2,
}: Props) => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: backgroundColor,
          padding: padding,
          borderRadius: cornerRadius,
        },
      ]}
    >
      <View
        style={[
          styles.iconWrapper,
          { maxWidth: imageSize, maxHeight: imageSize },
        ]}
      >
        <Image
          source={imageSrc}
          style={[styles.icon, { borderRadius: imageCornerRadius }]}
        />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Typography
          style={{ color: textColor }}
          type="title"
          numberOfLines={maxTitleLines}
          ellipsizeMode="tail"
        >
          {title}
        </Typography>
        <Typography
          style={[styles.label, { color: textColor }]}
          type="label"
          numberOfLines={maxLabelLines}
          ellipsizeMode="tail"
        >
          {label}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 16,
  },
  iconWrapper: {
    maxWidth: 116,
    maxHeight: 116,
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  label: {
    marginTop: 8,
  },
  icon: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});
