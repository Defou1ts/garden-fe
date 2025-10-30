import { CheckMarkIcon } from "@/assets/icons/CheckMark";
import { CrossIcon } from "@/assets/icons/CrossIcon";
import { EditIcon } from "@/assets/icons/EditIcon";
import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MOCK_FLOWERS = [
  {
    id: 1,
    title: "Эхеверия",
    light: "6–8 ч/день",
    temp: "18–24°C",
    water: "Летом поливают 2–3 раза в неделю, зимой — 2–3 раза в месяц.",
    good: "алое, другие суккуленты и кактусы",
    bad: "папоротник, мята, петунии, бегонии",
    desc: "Эхеверия — удивительный суккулент с мясистыми, изящными листьями, образующими розетки. Это идеальный выбор для тех, кто ценит не только красоту, но и неприхотливость.",
    image: require("@/assets/images/bed.png"),
  },
  {
    id: 2,
    title: "Толстянка",
    light: "8–10 ч/день",
    temp: "20–28°C",
    water: "Поливают раз в 10 дней, зимой — раз в 3 недели.",
    good: "суккуленты, алоэ, кактусы",
    bad: "папоротники, сенполия",
    desc: "Толстянка — знаменитое денежное дерево! Символ материального благополучия и невероятная простота ухода.",
    image: require("@/assets/images/sun.png"),
  },
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.32;

export default function AdminModerationPage() {
  const [queue] = useState(MOCK_FLOWERS);
  const [current, setCurrent] = useState(0);

  const position = useRef(new Animated.ValueXY()).current;

  const handleSwipeAction = (dir: "left" | "right" | "down") => {
    console.log(`Action: ${dir}`, queue[current]?.id);
    Animated.timing(position, {
      toValue:
        dir === "right"
          ? { x: SCREEN_WIDTH * 1.1, y: 0 }
          : dir === "left"
            ? { x: -SCREEN_WIDTH * 1.1, y: 0 }
            : { x: 0, y: 300 },
      useNativeDriver: false,
      duration: 220,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      setCurrent((i) => (i + 1 < queue.length ? i + 1 : 0));
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          handleSwipeAction("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          handleSwipeAction("left");
        } else if (gesture.dy > 95 && Math.abs(gesture.dx) < 40) {
          handleSwipeAction("down");
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const flower = queue[current];
  if (!flower)
    return (
      <View style={styles.empty}>
        <Typography type="title">Нет цветков для модерации</Typography>
      </View>
    );

  const icons = [
    {
      key: "cross",
      color: "#DD5353",
      emoji: "✗",
      icon: <CrossIcon width={30} height={30} fill="#F75C71" />,
    },
    {
      key: "edit",
      color: "#556C64",
      emoji: "✎",
      icon: <EditIcon width={40} height={40} fill="#5C83F7" />,
    },
    {
      key: "check",
      color: "#719A7E",
      emoji: "✓",
      icon: <CheckMarkIcon width={30} height={30} stroke="#799A8E" />,
    },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                {
                  rotate: position.x.interpolate({
                    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                    outputRange: ["-18deg", "0deg", "18deg"],
                  }),
                },
              ],
              shadowOpacity: position.x.interpolate({
                inputRange: [0, SWIPE_THRESHOLD],
                outputRange: [0.06, 0.13],
                extrapolate: "clamp",
              }),
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Image
            source={flower.image}
            style={[styles.photo, { height: PHOTO_HEIGHT }]}
            resizeMode="cover"
          />
          <View style={[styles.infoBlock, { height: INFO_BLOCK_HEIGHT }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Typography type="title" style={styles.title}>
                {flower.title}
              </Typography>
              <View style={styles.row}>
                <Text style={styles.emoji}>☀️</Text>
                <Typography style={styles.textInfo}>{flower.light}</Typography>
                <Text style={styles.emoji}>🌡️</Text>
                <Typography style={styles.textInfo}>{flower.temp}</Typography>
              </View>
              <View style={styles.row}>
                <Text style={styles.emoji}>💧</Text>
                <Typography style={styles.textInfo}>{flower.water}</Typography>
              </View>
              <Typography style={styles.goodBadLabel}>
                Хорошо сочетается:{" "}
                <Text style={styles.goodText}>{flower.good}</Text>
              </Typography>
              <Typography style={styles.goodBadLabel}>
                Стоит избегать: <Text style={styles.badText}>{flower.bad}</Text>
              </Typography>
              <Typography style={styles.desc}>{flower.desc}</Typography>
            </ScrollView>
            <View style={styles.gradientOverlay} pointerEvents="none" />
          </View>
        </Animated.View>
      </View>
      <View style={styles.iconsRow}>
        {icons.map((ic, index) => (
          <Pressable
            key={ic.key}
            style={[
              styles.iconBtn,
              {
                width: index % 2 == 1 ? 110 : 80,
                height: index % 2 == 1 ? 110 : 80,
              },
            ]}
            onPress={() => {
              if (ic.key === "cross") handleSwipeAction("left");
              if (ic.key === "check") handleSwipeAction("right");
              if (ic.key === "edit") handleSwipeAction("down");
            }}
          >
            <Text style={[styles.icon, { color: ic.color }]}>{ic.icon}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const CARD_WIDTH = SCREEN_WIDTH * 0.91;
const CARD_HEIGHT = CARD_WIDTH * 1.6;

const PHOTO_HEIGHT = CARD_HEIGHT * 0.5; // 50% высоты карточки — можно регулировать
const INFO_BLOCK_HEIGHT = CARD_HEIGHT - PHOTO_HEIGHT;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 92,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: theme.color.background.default,
    borderRadius: 28,
    shadowColor: "#a2a1a1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.11,
    shadowRadius: 6,
    elevation: 8,
    alignItems: "stretch",
    overflow: "hidden",
  },
  photo: {
    width: CARD_WIDTH,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  infoBlock: {
    padding: 20,
    backgroundColor: theme.color.background.default,
  },
  title: {
    color: theme.color.text,
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  emoji: { fontSize: 20, marginRight: 5 },
  textInfo: {
    color: theme.color.text,
    fontSize: 15,
    marginRight: 12,
  },
  goodBadLabel: {
    color: theme.color.text,
    fontSize: 14,
    marginTop: 1,
    marginBottom: 2,
  },
  goodText: { color: "#86A54A" },
  badText: { color: "#BD7878" },
  desc: {
    color: theme.color.text,
    fontSize: 14,
    marginTop: 10,
    lineHeight: 19,
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    alignItems: "center",
    marginVertical: 18,
    alignSelf: "center",
  },
  iconBtn: {
    width: 80,
    height: 80,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C4D2CC",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 38,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    backgroundColor: theme.color.background.default,
    opacity: 0.69,
  },
  icon: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
