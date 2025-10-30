import { ArrowDownIcon } from "@/assets/icons/ArrowDownIcon";
import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import { useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

const deals = ["Сделать отчёт", "Позвонить клиенту", "Проверить почту"];

export const TodayDeals = () => {
  const [expanded, setExpanded] = useState(false);

  const animation = useRef(new Animated.Value(0)).current; // 0 - закрыт, 1 - открыт

  // --- Для анимации поворота стрелки ---
  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  // --- Для плавного Layout Animation (Android поддержка) ---
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  // --- Высота анимированного контейнера ---
  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, deals.length * 40], // каждый элемент ~40px
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} activeOpacity={0.8}>
        <View style={styles.wrapper}>
          <Typography type="default" style={styles.text}>
            Сегодня есть дела!
          </Typography>

          <Animated.View style={{ transform: [{ rotate }] }}>
            <ArrowDownIcon />
          </Animated.View>
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[styles.listContainer, { height, overflow: "hidden" }]}
      >
        {deals.map((deal, index) => (
          <View key={index} style={styles.dealItem}>
            <Typography type="default" style={styles.dealText}>
              {deal}
            </Typography>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: theme.color.background.usual,
    overflow: "hidden",
  },
  wrapper: {
    paddingLeft: 20,
    paddingRight: 32,
    paddingVertical: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: theme.color.background.default,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  dealItem: {
    height: 40,
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.background.default + "33",
  },
  dealText: {
    color: theme.color.background.default,
  },
});
