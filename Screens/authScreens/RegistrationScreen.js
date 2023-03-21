import React, { useEffect } from "react";
import { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function RegistrationScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false), Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(`name:${userName}, email:${email}, password:${password}`);
    setUserName("");
    setEmail("");
    setPassword("");
    keyboardHide();
    navigation.navigate("Home");
  };
  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/photoBG.jpg")}
          style={styles.imageBackground}
        >
          <KeyboardAvoidingView // определяем ОС и настраиваем поведение клавиатуры
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 0 : 78,
              }}
            >
              <Text style={styles.logTitle}>Регистрация</Text>
              <TextInput
                style={styles.inputUserName}
                placeholder={"Логин"}
                onFocus={() => setIsShowKeyboard(true)}
                value={userName}
                onChangeText={(text) => setUserName(text)}
              ></TextInput>
              <TextInput
                style={styles.inputEmail}
                placeholder={"Адрес элуктронной почты"}
                onFocus={() => setIsShowKeyboard(true)}
                value={email}
                onChangeText={(text) => setEmail(text)}
              ></TextInput>
              <TextInput
                style={styles.inputPassword}
                placeholder={"Пароль"}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              {!isShowKeyboard && (
                <View>
                  <TouchableOpacity>
                    <Text style={styles.btn} onPress={onSubmit}>
                      Зарегистрироваться
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Уже есть аккаунт? Войти
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logTitle: {
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    verticalAlign: "top",
    letterSpacing: 1,
    color: "#212121",
    marginBottom: 33,
  },
  inputUserName: {
    height: 50,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#f6f6f6",
    borderColor: "#e8e8e8",
    borderWidth: 1,
  },
  inputEmail: {
    height: 50,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#f6f6f6",
    borderColor: "#e8e8e8",
    borderWidth: 1,
  },
  inputPassword: {
    height: 50,

    padding: 16,
    borderRadius: 8,
    marginBottom: 43,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
  },
  btn: {
    paddingVertical: 16,
    backgroundColor: "#ff6c00",
    color: "#fff",
    borderRadius: 100,
    marginBottom: 16,
    textAlign: "center",
  },
  link: {
    color: "#1b4371",
    textAlign: "center",
  },
});
