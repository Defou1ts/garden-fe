import { EditIcon } from "@/assets/icons/EditIcon";
import { theme } from "@/constants/theme";
import { TextBox } from "@/shared/ui/text-box";
import { ThemedButton } from "@/shared/ui/themed-button";
import { Typography } from "@/shared/ui/Typography";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

function isEmailRegistered(email: string): boolean {
  return true;
}

function handleLogin(email: string, password: string): boolean {
  return true;
}

function handleRegister(email: string, password: string): boolean {
  return true;
}

// Password validation functions
function validatePasswordLength(password: string): boolean {
  return password.length >= 8;
}

function validatePasswordCase(password: string): boolean {
  // Проверяем, что есть хотя бы одна строчная и одна заглавная буква
  const hasLowercase = /[a-zа-яё]/.test(password);
  const hasUppercase = /[A-ZА-ЯЁ]/.test(password);
  return hasLowercase && hasUppercase;
}

function validatePasswordLetters(password: string): boolean {
  return /^[a-zA-Zа-яёА-ЯЁ0-9]*$/.test(password);
}

function validatePasswordDigit(password: string): boolean {
  return /\d/.test(password);
}

function isPasswordValid(password: string): boolean {
  return (
    validatePasswordLength(password) &&
    validatePasswordCase(password) &&
    validatePasswordLetters(password) &&
    validatePasswordDigit(password)
  );
}

type AuthStatus = "init" | "login" | "register";

export default function AuthPage() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("init");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [regitserError, setRegisterError] = useState<string | undefined>(
    undefined
  );

  const router = useRouter();

  const handleContinueClick = () => {
    console.log(email);

    const isRegistered = isEmailRegistered(email);

    if (isRegistered) {
      setAuthStatus("login");
    } else {
      setAuthStatus("register");
    }
  };

  const handleBackClick = () => {
    setAuthStatus("init");
  };

  const handleContinueLogin = () => {
    const success = handleLogin(email, password);
    if (success) {
      router.push("/(tabs)");
    } else {
      setLoginError("Пароль не совпадает!");
    }
  };

  const handleContinueRegister = () => {
    const success = handleRegister(email, password);
    if (success) {
      router.push("/(tabs)");
    } else {
      setRegisterError("Ошибка");
    }
  };

  return (
    <ScrollView>
      <Image
        source={require("../assets/images/auth-bg.png")}
        style={styles.image}
      />
      {authStatus === "init" && (
        <AuthBlock
          onContinueClick={handleContinueClick}
          email={email}
          setEmail={setEmail}
        />
      )}
      {authStatus === "login" && (
        <LoginBlock
          handleBackClick={handleBackClick}
          handleContinueLogin={handleContinueLogin}
          error={loginError}
          password={password}
          setPassword={setPassword}
        />
      )}{" "}
      {authStatus === "register" && (
        <RegisterBlock
          handleBackClick={handleBackClick}
          handleContinueRegister={handleContinueRegister}
          error={regitserError}
          email={email}
          password={password}
          setPassword={setPassword}
        />
      )}
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  image: {
    height: "45%",
  },
  title: {
    fontSize: 21,
  },
  text: {
    marginTop: 16,
    fontSize: 18,
  },
  auth: {
    marginVertical: 64,
    marginHorizontal: 32,
  },
  loginWrapper: {
    marginTop: 24,
    flexDirection: "column",
    gap: 24,
  },
  otherwise: {
    textAlign: "center",
    marginVertical: 24,
  },
  socialLoginWrapper: {
    flexDirection: "column",
    gap: 16,
  },
  passwordRequirements: {
    borderWidth: 1,
    borderColor: theme.color.background.usual,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 14,
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 14,
    zIndex: 1,
  },
  emailWrapper: {
    position: "relative",
  },
  emailEditButton: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  emailEditText: {
    color: theme.color.background.usual,
    fontSize: 12,
  },
});

const CheckIcon = ({ isCheck }: { isCheck: boolean }) => {
  if (isCheck) {
    return (
      <Svg width={16} height={16} viewBox="0 0 16 16">
        <Circle
          cx="8"
          cy="8"
          r="7"
          fill="green"
          stroke="green"
          strokeWidth="1"
        />
        <Path
          d="M5 8 L7 10 L11 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  } else {
    return (
      <Svg width={16} height={16} viewBox="0 0 16 16">
        <Circle cx="8" cy="8" r="7" fill="red" stroke="red" strokeWidth="1" />
        <Path
          d="M5 5 L11 11"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M11 5 L5 11"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    );
  }
};

const EyeIcon = ({ show }: { show: boolean }) => {
  if (show) {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          stroke={theme.color.text}
          strokeWidth="1.5"
          fill="none"
        />
      </Svg>
    );
  } else {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          d="M1 1l22 22M9 9.27C8.57 9.53 8.25 9.89 8.1 10.31M3.27 3.27C1.73 4.83.5 6.73.5 9a13.91 13.91 0 001.61 6M17 18.73c.43-.26.75-.62.9-1.04M21.73 21.73C20.27 20.27 19 18.27 19 15.5c0-.98.15-1.92.41-2.81"
          stroke={theme.color.text}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    );
  }
};

const AuthBlock = ({
  onContinueClick,
  email,
  setEmail,
}: {
  onContinueClick: () => void;
  email: string;
  setEmail: (email: string) => void;
}) => {
  return (
    <View style={styles.auth}>
      <Typography style={styles.title} type="title">
        Войти или зарегистрироваться
      </Typography>
      <Typography style={styles.text} type="default">
        Вы получите возможность создавать и организовывать растения на своём
        огороде и подоконниках, отслеживать стадии роста ваших растений и многое
        другое
      </Typography>
      <View style={styles.loginWrapper}>
        <TextBox
          placeholder="Адрес электронной почты"
          value={email}
          onChangeText={setEmail}
        />
        <ThemedButton onPress={onContinueClick} textAlign="center">
          Продолжить
        </ThemedButton>
      </View>
      <Typography style={styles.otherwise} type="default">
        или
      </Typography>
      <View style={styles.socialLoginWrapper}>
        <ThemedButton
          icon={
            <EditIcon
              width={16}
              height={16}
              fill={theme.color.background.default}
            />
          }
        >
          Продолжить с Google
        </ThemedButton>
        <ThemedButton
          icon={
            <EditIcon
              width={16}
              height={16}
              fill={theme.color.background.default}
            />
          }
        >
          Продолжить с учетной записью Microsoft
        </ThemedButton>
      </View>
    </View>
  );
};

type LoginBlockProps = {
  handleBackClick: () => void;
  handleContinueLogin: () => void;
  error?: string;
  password: string;
  setPassword: (password: string) => void;
};

const LoginBlock = ({
  handleBackClick,
  handleContinueLogin,
  error,
  password,
  setPassword,
}: LoginBlockProps) => {
  return (
    <View style={styles.auth}>
      <Typography style={styles.title} type="title">
        С возвращением!
      </Typography>
      <Typography style={styles.text} type="default">
        Для продолжения введите ваш пароль
      </Typography>
      <View style={styles.loginWrapper}>
        <TextBox
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error && <Typography type="label">{error}</Typography>}
        <ThemedButton onPress={handleContinueLogin} textAlign="center">
          Продолжить
        </ThemedButton>
        <ThemedButton onPress={handleBackClick} textAlign="center">
          Назад
        </ThemedButton>
      </View>
    </View>
  );
};

type RegisterBlockProps = {
  handleBackClick: () => void;
  handleContinueRegister: () => void;
  error?: string;
  email: string;
  password: string;
  setPassword: (password: string) => void;
};

const RegisterBlock = ({
  handleBackClick,
  handleContinueRegister,
  error,
  email,
  password,
  setPassword,
}: RegisterBlockProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [emailValue, setEmailValue] = useState(email);

  const passwordValidations = [
    {
      isValid: validatePasswordLength(password),
      text: "не менее 8 символов;",
    },
    {
      isValid: validatePasswordCase(password),
      text: "как минимум одна заглавная и одна строчная буква;",
    },
    {
      isValid: validatePasswordLetters(password),
      text: "только латинские или кириллические буквы;",
    },
    {
      isValid: validatePasswordDigit(password),
      text: "как минимум одна цифра;",
    },
  ];

  const isFormValid = isPasswordValid(password);

  return (
    <View style={styles.auth}>
      <Typography style={styles.title} type="title">
        Создайте вашу учетную запись
      </Typography>
      <Typography style={styles.text} type="default">
        Для продолжения задайте пароль
      </Typography>
      <View style={styles.loginWrapper}>
        <View style={styles.emailWrapper}>
          <TextBox
            placeholder="Email"
            value={emailValue}
            onChangeText={setEmailValue}
            editable={editEmail}
          />
          <TouchableOpacity
            style={styles.emailEditButton}
            onPress={() => setEditEmail(!editEmail)}
          >
            <Typography type="default" style={styles.emailEditText}>
              {editEmail ? "Готово" : "Редактировать"}
            </Typography>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.passwordWrapper}>
            <TextBox
              placeholder="Пароль"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <EyeIcon show={showPassword} />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordRequirements}>
            <Typography type="label" style={{ marginBottom: 12 }}>
              Ваш пароль должен содержать:
            </Typography>
            {passwordValidations.map((req, index) => (
              <View key={index} style={styles.requirementRow}>
                <CheckIcon isCheck={req.isValid} />
                <Typography type="default" style={styles.requirementText}>
                  {req.text}
                </Typography>
              </View>
            ))}
          </View>
        </View>
        {error && <Typography type="label">{error}</Typography>}
        <ThemedButton
          onPress={handleContinueRegister}
          textAlign="center"
          disabled={!isFormValid}
        >
          Продолжить
        </ThemedButton>
        <ThemedButton onPress={handleBackClick} textAlign="center">
          Назад
        </ThemedButton>
      </View>
    </View>
  );
};
