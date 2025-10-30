import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleProp, StyleSheet, View } from "react-native";

type MenuItemProps = {
  onPress?: () => void;
  imageSrc: string;
  title: string;
  style?: StyleProp<any>;
};

const MenuItem = ({ onPress, imageSrc, title, style }: MenuItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.menuItem, style]}>
        <View style={styles.menuItemImageContainer}>
          <Image
            source={imageSrc}
            contentFit="contain"
            style={styles.menuItemImage}
          />
        </View>
        <Typography type="default">{title}</Typography>
      </View>
    </Pressable>
  );
};

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <View>
      <Typography type="title">Профиль</Typography>
      <View style={styles.profileInfo}>
        <Image
          source={require("@/assets/images/profile.png")}
          style={styles.profilePhoto}
        />
        <Typography type="default">Щербакова Дарья</Typography>
      </View>
      <View style={styles.divider} />
      <MenuItem
        onPress={() => router.push("/featured")}
        style={styles.features}
        imageSrc={require("@/assets/images/featured.png")}
        title="Мои заметки"
      />
      <Typography style={styles.subtitle} type="title">
        Настройки
      </Typography>
      <MenuItem
        style={styles.menuItemDefault}
        imageSrc={require("@/assets/images/notifications.png")}
        title="Уведомления"
        onPress={() => router.push("/notifications")}
      />
      <MenuItem
        style={styles.menuItemDefault}
        imageSrc={require("@/assets/images/privacy.png")}
        title="Конфиденциальность"
        onPress={() => router.push("/privacy")}
      />
      <MenuItem
        style={styles.menuItemDefault}
        imageSrc={require("@/assets/images/language.png")}
        title="Язык"
        onPress={() => router.push("/language")}
      />
      <Typography style={styles.subtitle} type="title">
        Помощь
      </Typography>
      <MenuItem
        onPress={() => router.push("/help")}
        style={styles.menuItemDefault}
        imageSrc={require("@/assets/images/help.png")}
        title="Служба поддержки"
      />
      <MenuItem
        onPress={() => router.push("/about")}
        style={styles.menuItemDefault}
        imageSrc={require("@/assets/images/about.png")}
        title="О нас"
      />
      <Pressable onPress={() => {}}>
        <Typography style={styles.exit} type="default">
          Выход
        </Typography>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  profileInfo: {
    marginTop: 16,
    marginBottom: 32,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  divider: {
    height: 1,
    backgroundColor: theme.color.background.usual,
  },
  menuItem: {
    flexDirection: "row",
    gap: 40,
    marginLeft: 8,
    alignItems: "center",
  },
  menuItemDefault: {
    marginBottom: 12,
  },
  menuItemImage: {
    flex: 1,
    width: "100%",
  },
  menuItemImageContainer: {
    width: 30,
    height: 30,
  },
  features: {
    marginTop: 32,
    marginBottom: 55,
  },
  subtitle: {
    marginBottom: 24,
  },
  exit: {
    color: "red",
    marginTop: 32,
  },
});
