import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default CreatePostsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [photo, setPhoto] = useState("");
  const [camera, setCamera] = useState(null);
  const [locationSet, setLocationSet] = useState({});

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false), Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const photoCam = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(photoCam.uri);
    console.log(location);
    setLocationSet({
      latitube: location.coords.latitude,
      longitube: location.coords.longitude,
    });
  };

  const publish = () => {
    navigation.navigate("DefaultScreen", { photo, title, place, locationSet });
    clearState();
    keyboardHide();
  };

  const clearState = () => {
    setTitle("");
    setPlace("");
    setPhoto("");
    setCamera(null);
  };
  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <KeyboardAvoidingView // определяем ОС и настраиваем поведение клавиатуры
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          {!isShowKeyboard && (
            <Camera
              style={styles.camera}
              ref={setCamera}
              type={CameraType.back}
            >
              <TouchableOpacity style={styles.camera_btn} onPress={takePhoto}>
                <FontAwesome name="camera" size={24} color="black" />
              </TouchableOpacity>
              {photo && (
                <View>
                  <Image
                    sourse={{ uri: photo }}
                    style={{ height: 100, width: 200 }}
                  />
                </View>
              )}
            </Camera>
          )}

          <Text style={styles.text}>Загрузите фото</Text>

          <TextInput
            style={styles.title}
            placeholder={"Название..."}
            onFocus={() => setIsShowKeyboard(true)}
            value={title}
            onChangeText={(text) => setTitle(text)}
          ></TextInput>

          <TextInput
            style={styles.title}
            placeholder={"Местность..."}
            onFocus={() => setIsShowKeyboard(true)}
            value={place}
            onChangeText={(text) => setPlace(text)}
          ></TextInput>
          <TouchableOpacity onPress={publish}>
            <Text style={styles.btn}>Опубликовать</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trush_btn} onPress={clearState}>
            <Feather name="trash-2" size={24} color="grey" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: "black",
    color: "black",
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  camera_btn: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  foto_img: {
    width: 100,
    height: 100,
  },
  text: {
    color: "#BDBDBD",
    height: 20,
  },
  title: {
    height: 30,
    marginTop: 30,
    borderColor: "#e8e8e8",
    borderBottomWidth: 1,
  },
  btn: {
    height: 50,
    paddingVertical: 16,
    backgroundColor: "#ff6c00",
    color: "#fff",
    borderRadius: 100,
    marginTop: 32,
    textAlign: "center",
  },
  trush_btn: {
    width: 70,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 70,
  },
});
