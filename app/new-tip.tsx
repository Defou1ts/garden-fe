import { theme } from "@/constants/theme";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { TextBox } from "@/shared/ui/text-box";
import { ThemedButton } from "@/shared/ui/themed-button";
import { Typography } from "@/shared/ui/Typography";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function NewTip() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={buildDefaultHeaderOptions({ title: "Новый совет" })}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.color.background.default }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.spacer16} />
          <Typography style={styles.label} type="default">
            Введите заголовок:
          </Typography>
          <TextBox placeholder="Заголовок" />
          <View style={styles.spacer24} />
          <Typography style={styles.label} type="default">
            Добавьте фотографию:
          </Typography>
          <Pressable style={styles.photoPlaceholder}>
            <View style={styles.plusWrapper}>
              <Text style={styles.plus}>+</Text>
            </View>
          </Pressable>
          <View style={styles.spacer24} />
          <Typography style={styles.label} type="default">
            Введите описание:
          </Typography>
          <TextBox placeholder="Описание" />
          <View style={{ height: 32 }} />
          <ThemedButton onPress={() => router.back()} textAlign="center">
            Сохранить
          </ThemedButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.color.background.default,
    paddingHorizontal: 24,
    paddingBottom: 32,
    minHeight: "100%",
  },

  label: {
    marginBottom: 7,
  },

  photoPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 20,
    backgroundColor: theme.color.background.usual,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  plusWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    color: "#455953",
    fontSize: 60,
    marginTop: 12,
    fontWeight: "400",
  },
  spacer16: { height: 16 },
  spacer24: { height: 24 },
});
