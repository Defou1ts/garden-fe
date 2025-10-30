import { theme } from "@/constants/theme";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Tabs as SegmentedTabs } from "@/shared/ui/tabs";
import { TextBox } from "@/shared/ui/text-box";
import { ThemedButton } from "@/shared/ui/themed-button";
import { Typography } from "@/shared/ui/Typography";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const PLANT_TYPES = [
  { index: 0, label: "Цветы" },
  { index: 1, label: "Ягоды" },
  { index: 2, label: "Овощи" },
  { index: 3, label: "Деревья" },
];

export default function NewFlower() {
  const [type, setType] = useState(0);
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={buildDefaultHeaderOptions({ title: "Новое растение" })}
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
            Выберите тип растения:
          </Typography>
          <SegmentedTabs
            tabsItems={PLANT_TYPES}
            activeTabIndex={type}
            onChange={setType}
          />
          <Typography style={styles.label} type="default">
            Введите наименование нового растения:
          </Typography>
          <TextBox placeholder="Наименование" />
          <Typography style={styles.label} type="default">
            Вы можете добавить фотографию нового растения:
          </Typography>
          <Pressable style={styles.photoPlaceholder}>
            <View style={styles.plusWrapper}>
              <Text style={styles.plus}>+</Text>
            </View>
          </Pressable>
          <Typography style={styles.label} type="default">
            Введите необходимое количество часов солнца:
          </Typography>
          <TextBox placeholder="6-8" />
          <Typography style={styles.label} type="default">
            Введите рекомендуемую температуру:
          </Typography>
          <TextBox placeholder="18-24" />
          <Typography style={styles.label} type="default">
            Введите частоту полива:
          </Typography>
          <TextBox placeholder="Летом поливают 2–3 раза в неделю, зимой — 2–3 раза в месяц." />
          <Typography style={styles.label} type="default">
            Введите с какими растениями хорошо сочетается:
          </Typography>
          <TextBox placeholder="алоэ, другие суккуленты и кактусы" />
          <Typography style={styles.label} type="default">
            Введите с какими растениями плохо сочетается:
          </Typography>
          <TextBox placeholder="папоротник, мята, петуны, бегонии" />
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
    marginBottom: 8,
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
});
