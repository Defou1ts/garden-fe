import { AdvicePhoto } from "@/api/advice.types";
import { useAdvice } from "@/api/hooks/advice/useAdvice";
import { useCreateAdvice } from "@/api/hooks/advice/useCreateAdvice";
import { useUpdateAdvice } from "@/api/hooks/advice/useUpdateAdvice";
import { theme } from "@/constants/theme";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { TextBox } from "@/shared/ui/text-box";
import { ThemedButton } from "@/shared/ui/themed-button";
import { Typography } from "@/shared/ui/Typography";
import { getPhotoUrl } from "@/utils/getPhotoUrl";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ParamValue = string | string[] | undefined;

const toString = (value: ParamValue) => {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
};

export default function NewTip() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const adviceId = toString(params.id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<AdvicePhoto | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const adviceQuery = useAdvice(adviceId ?? "");
  const createAdvice = useCreateAdvice();
  const updateAdvice = useUpdateAdvice();

  const isEditing = Boolean(adviceId);
  const isSaving = createAdvice.isPending || updateAdvice.isPending;

  const isPrefilledRef = useRef(false);
  const isAdvicePrefilledRef = useRef(false);

  const fallbackTitle = useMemo(() => toString(params.title) ?? "", [params]);
  const fallbackDescription = useMemo(
    () => toString(params.description) ?? "",
    [params]
  );
  const fallbackPhotoUrl = useMemo(() => toString(params.photoUrl), [params]);

  useEffect(() => {
    if (adviceQuery.data && !isAdvicePrefilledRef.current) {
      setTitle(adviceQuery.data.title);
      setDescription(adviceQuery.data.description);
      if (!photo) {
        setPhotoPreview(
          adviceQuery.data.photoUrl
            ? getPhotoUrl(adviceQuery.data.photoUrl)
            : null
        );
      }
      isAdvicePrefilledRef.current = true;
      isPrefilledRef.current = true;
    }
  }, [adviceQuery.data, photo]);

  useEffect(() => {
    if (isPrefilledRef.current || adviceQuery.data) return;

    setTitle(fallbackTitle);
    setDescription(fallbackDescription);
    setPhotoPreview((prev) =>
      fallbackPhotoUrl ? getPhotoUrl(fallbackPhotoUrl) : prev
    );
    isPrefilledRef.current = true;
  }, [fallbackTitle, fallbackDescription, fallbackPhotoUrl, adviceQuery.data]);

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Нет доступа",
        "Разрешите доступ к галерее, чтобы выбрать фото"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.length) return;

    const asset = result.assets[0];

    setPhoto({
      uri: asset.uri,
      name: asset.fileName ?? "photo.jpg",
      type: asset.mimeType ?? "image/jpeg",
    });
    setPhotoPreview(asset.uri);
  };

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      Alert.alert("Заполните поля", "Укажите заголовок и описание");
      return;
    }

    const payload = {
      title: trimmedTitle,
      description: trimmedDescription,
      ...(photo ? { photo } : {}),
    };

    if (isEditing && adviceId) {
      updateAdvice.mutate(
        { id: adviceId, data: payload },
        {
          onSuccess: () => router.back(),
          onError: () =>
            Alert.alert(
              "Ошибка",
              "Не удалось обновить совет. Попробуйте еще раз"
            ),
        }
      );
      return;
    }

    createAdvice.mutate(payload, {
      onSuccess: () => router.back(),
      onError: () =>
        Alert.alert("Ошибка", "Не удалось сохранить совет. Попробуйте еще раз"),
    });
  };

  return (
    <>
      <Stack.Screen
        options={buildDefaultHeaderOptions({
          title: isEditing ? "Редактировать совет" : "Новый совет",
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
          {isEditing && adviceQuery.isLoading ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator color={theme.color.background.usual} />
              <Typography style={{ marginTop: 8 }}>
                Загружаем данные совета...
              </Typography>
            </View>
          ) : (
            <>
              <View style={styles.spacer16} />
              <Typography style={styles.label} type="default">
                Введите заголовок:
              </Typography>
              <TextBox
                placeholder="Заголовок"
                value={title}
                onChangeText={setTitle}
                editable={!isSaving}
              />
              <View style={styles.spacer24} />
              <Typography style={styles.label} type="default">
                Добавьте фотографию:
              </Typography>
              <Pressable
                style={styles.photoPlaceholder}
                onPress={handlePickImage}
                disabled={isSaving}
              >
                {photoPreview ? (
                  <Image
                    source={photoPreview}
                    style={styles.photo}
                    contentFit="cover"
                  />
                ) : (
                  <View style={styles.plusWrapper}>
                    <Text style={styles.plus}>+</Text>
                  </View>
                )}
              </Pressable>
              <Typography type="label" style={styles.photoHelper}>
                Нажмите, чтобы выбрать или обновить фото
              </Typography>
              <View style={styles.spacer24} />
              <Typography style={styles.label} type="default">
                Введите описание:
              </Typography>
              <TextBox
                placeholder="Описание"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!isSaving}
              />
              <View style={{ height: 32 }} />
              <ThemedButton
                onPress={handleSave}
                textAlign="center"
                disabled={isSaving}
              >
                {isSaving ? "Сохраняем..." : "Сохранить"}
              </ThemedButton>
            </>
          )}
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
    width: 160,
    height: 160,
    borderRadius: 20,
    backgroundColor: theme.color.background.usual,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    overflow: "hidden",
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
  photo: {
    width: "100%",
    height: "100%",
  },
  photoHelper: {
    marginTop: 8,
    color: theme.color.text,
  },
  spacer16: { height: 16 },
  spacer24: { height: 24 },
  loadingWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 48,
  },
});
