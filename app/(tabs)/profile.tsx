import { useLogout } from "@/api/hooks/auth/useLogout";
import { useUpdateUserProfile } from "@/api/hooks/user/useUpdateUserProfile";
import { useUserProfile } from "@/api/hooks/user/useUserProfile";
import { EditIcon } from "@/assets/icons/EditIcon";
import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import { TextBox } from "@/shared/ui/text-box";
import { ThemedButton } from "@/shared/ui/themed-button";
import { getPhotoUrl } from "@/utils/getPhotoUrl";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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
  const logoutMutation = useLogout();
  const profileQuery = useUserProfile();
  const updateProfileMutation = useUpdateUserProfile();

  const [fullName, setFullName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    if (profileQuery.data?.fullName) {
      setFullName(profileQuery.data.fullName);
      setIsEditingName(false);
    }
  }, [profileQuery.data?.fullName]);

  const profilePhoto = useMemo(() => {
    if (!profileQuery.data?.profilePhotoUrl)
      return require("@/assets/images/profile.png");
    return getPhotoUrl(profileQuery.data.profilePhotoUrl);
  }, [profileQuery.data?.profilePhotoUrl]);

  return (
    <View>
      <Typography type="title">Профиль</Typography>
      <View style={styles.profileInfo}>
        <Image source={profilePhoto} style={styles.profilePhoto} />
        <View style={styles.nameRow}>
          <Typography type="default" numberOfLines={1} style={styles.nameText}>
            {profileQuery.isLoading
              ? "Загружаем профиль..."
              : (profileQuery.data?.fullName ?? "—")}
          </Typography>
          <Pressable
            hitSlop={8}
            onPress={() => {
              setFullName(profileQuery.data?.fullName ?? "");
              setIsEditingName(true);
            }}
          >
            <EditIcon
              width={16}
              height={16}
              fill={theme.color.background.usual}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.divider} />

      <Typography style={styles.subtitle} type="title">
        Профиль
      </Typography>
      {isEditingName ? (
        <View style={styles.form}>
          <TextBox
            placeholder="Ваше имя"
            value={fullName}
            onChangeText={setFullName}
          />
          <View style={styles.formButtons}>
            <ThemedButton
              textAlign="center"
              onPress={() =>
                updateProfileMutation.mutate(
                  { fullName },
                  {
                    onSuccess: () => {
                      setIsEditingName(false);
                    },
                  }
                )
              }
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? "Сохраняем..." : "Сохранить"}
            </ThemedButton>
            <ThemedButton
              textAlign="center"
              onPress={() => {
                setFullName(profileQuery.data?.fullName ?? "");
                setIsEditingName(false);
              }}
              disabled={updateProfileMutation.isPending}
            >
              Отмена
            </ThemedButton>
          </View>
          {updateProfileMutation.isError ? (
            <Typography type="default" style={styles.error}>
              Не удалось сохранить профиль
            </Typography>
          ) : null}
        </View>
      ) : null}

      <MenuItem
        onPress={() => router.push("/featured")}
        style={styles.features}
        imageSrc={require("@/assets/images/featured.png")}
        title="Мои заметки"
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
      <Pressable
        onPress={() => {
          logoutMutation.mutate(undefined, {
            onSuccess: () => {
              router.replace("/auth");
            },
          });
        }}
        disabled={logoutMutation.isPending}
      >
        <Typography style={styles.exit} type="default">
          {logoutMutation.isPending ? "Выходим..." : "Выход"}
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
  form: {
    gap: 12,
    marginBottom: 32,
  },
  formButtons: {
    marginTop: 8,
    gap: 8,
  },
  exit: {
    color: "red",
    marginTop: 32,
  },
  error: {
    color: "red",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  nameText: {
    textAlign: "center",
  },
  editLink: {
    color: theme.color.background.usual,
  },
});
