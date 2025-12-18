import { useCreateAdvice } from "@/api/hooks/advice/useCreateAdvice";
import { useUpdateAdvice } from "@/api/hooks/advice/useUpdateAdvice";
import { theme } from "@/constants/theme";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { TextBox } from "@/shared/ui/text-box";
import { ThemedButton } from "@/shared/ui/themed-button";
import { Typography } from "@/shared/ui/Typography";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NewTip() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    description?: string;
  }>();
  const adviceId = params.id ? String(params.id) : undefined;

  const [title, setTitle] = useState(params.title ? String(params.title) : "");
  const [description, setDescription] = useState(
    params.description ? String(params.description) : ""
  );
  const [photo, setPhoto] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const createAdviceMutation = useCreateAdvice();
  const updateAdviceMutation = useUpdateAdvice();

  const isEditing = Boolean(adviceId);

  useEffect(() => {
    // Пока нет отдельного запроса по id, данные для редактирования
    // разумно будет подтягивать с пред. экрана или добавить хук useAdvice(id)
    // Здесь оставим заглушку: если пришли через редактирование, текст можно ввести заново.
  }, [adviceId]);

  const handlePickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.[0]?.uri) {
      return;
    }

    const asset = result.assets[0];
    const uri = asset.uri;
    const name = uri.split("/").pop() || "photo.jpg";

    setPhoto({
      uri,
      name,
      type: asset.mimeType || "image/jpeg",
    });
  };

  const handleSave = async () => {
    if (!title || !description) return;

    try {
      if (isEditing && adviceId) {
        console.log("update", photo, title, description);
        await updateAdviceMutation.mutateAsync(
          {
            id: adviceId,
            data: {
              title,
              description,
              photo: photo as any,
            },
          },
          {
            onError(e) {
              console.log("error");
            },
          }
        );
      } else {
        console.log("create", photo, title, description);
        await createAdviceMutation.mutateAsync({
          title,
          description,
          // photo обязателен на бэке
          photo: photo as any,
        });
      }
      router.back();
    } catch {
      // можно вывести тост/ошибку позже
    }
  };
  return (
    <>
      <Stack.Screen
        options={buildDefaultHeaderOptions({
          title: isEditing ? "Редактирование совета" : "Новый совет",
        })}
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
          <TextBox
            placeholder="Заголовок"
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.spacer24} />
          <Typography style={styles.label} type="default">
            Добавьте фотографию:
          </Typography>
          <TouchableOpacity
            style={styles.photoPlaceholder}
            onPress={handlePickPhoto}
          >
            {photo ? (
              <Image source={{ uri: photo.uri }} style={styles.photoPreview} />
            ) : (
              <View style={styles.plusWrapper}>
                <Text style={styles.plus}>+</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.spacer24} />
          <Typography style={styles.label} type="default">
            Введите описание:
          </Typography>
          <TextBox
            placeholder="Описание"
            multiline
            value={description}
            onChangeText={setDescription}
          />
          <View style={{ height: 32 }} />
          <ThemedButton
            onPress={handleSave}
            textAlign="center"
            disabled={
              !title ||
              !description ||
              createAdviceMutation.isPending ||
              updateAdviceMutation.isPending
            }
          >
            {createAdviceMutation.isPending || updateAdviceMutation.isPending
              ? "Сохраняем..."
              : "Сохранить"}
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
  photoPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
