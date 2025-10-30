import { theme } from "@/constants/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  onPress: () => void;
  isActive: boolean;
  disabled?: boolean;
};

export const Switch = ({ isActive, disabled = false, onPress }: Props) => {
  const thumbPosition = useRef(new Animated.Value(isActive ? 24 : 0)).current;

  // Анимация при изменении состояния
  useEffect(() => {
    Animated.timing(thumbPosition, {
      toValue: isActive ? 24 : 0, // перемещение вправо или влево
      duration: 200, // длительность анимации
      useNativeDriver: false, // т.к. анимируем layout (left)
    }).start();
  }, [isActive]);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <View style={styles.wrapper}>
        <View style={[styles.track, disabled && styles.trackDisabled]} />
        <Animated.View
          style={[
            styles.thumb,
            {
              left: thumbPosition,
              backgroundColor: disabled
                ? theme.color.background.disabled
                : theme.color.background.usual,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    width: 48,
    height: 32,
    justifyContent: "center",
  },
  track: {
    width: 48,
    height: 24,
    borderRadius: 20,
    backgroundColor: theme.color.background.usual,
  },
  trackDisabled: {
    backgroundColor: theme.color.background.disabled,
  },
  thumb: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.color.background.usual,
    outlineWidth: 2.5,
    outlineColor: theme.color.background.pressed,
    outlineStyle: "solid",
  },
});
