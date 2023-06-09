import React from "react";
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
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false), Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(`email:${email}, password:${password}`);
    setEmail("");
    setPassword("");
    keyboardHide();
    dispatch(authSignInUser({ email, password }));
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
              <Text style={styles.logTitle}>Войти</Text>
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
                      Войти
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={styles.link}
                      onPress={() => {
                        navigation.navigate("Registration");
                      }}
                    >
                      Нет аккаунта? Зарегистрироваться
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
    paddingTop: 32,
    paddingBottom: 144,
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
