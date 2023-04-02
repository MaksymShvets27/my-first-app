import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

export default CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const { userName } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    const commentId = Date.now().toString();
    await setDoc(doc(db, "posts", `${postId}`, "comments", `${commentId}`), {
      comment,
      userName,
    });
  };

  const getAllComments = async () => {
    onSnapshot(collection(db, "posts", `${postId}`, `comments`), (data) => {
      setComments(data.docs.map((doc) => ({ ...doc.data() })));
    });
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false), Keyboard.dismiss();
  };

  const onSubmit = () => {
    setComment("");
    createComment();
    keyboardHide();
  };

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <View style={styles.container}>
        {!isShowKeyboard && (
          <SafeAreaView style={styles.container}>
            <FlatList
              data={comments}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => {
                return (
                  <View style={styles.comment_container}>
                    <Text style={styles.title}>Автор: {item.userName}</Text>
                    <Text style={styles.comment}>{item.comment}</Text>
                  </View>
                );
              }}
            />
          </SafeAreaView>
        )}
        <View>
          <TextInput
            style={styles.title}
            placeholder={"Ваш коментарий"}
            onFocus={() => setIsShowKeyboard(true)}
            value={comment}
            onChangeText={(text) => setComment(text)}
          ></TextInput>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.btn}>Опубликовать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  comment_container: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ff6c00",
    padding: 20,
    marginBottom: 20,
  },
  title: {
    height: 30,
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
});
