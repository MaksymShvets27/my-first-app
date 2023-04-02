import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

export default DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    onSnapshot(collection(db, "posts"), (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Image source={{ uri: item.photoURL }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.post_item_bottom_bar}>
                <View
                  style={{
                    flexDirection: "row-reverse",
                  }}
                >
                  <Text
                    style={styles.text}
                    onPress={() => {
                      navigation.navigate("Map", {
                        ...item.locationSet,
                        title: item.title,
                      });
                    }}
                  >
                    {item.place}
                  </Text>
                  <Feather name="map-pin" size={24} color="black" />
                </View>
                <Ionicons
                  name="chatbubble-outline"
                  size={24}
                  color="black"
                  onPress={() => {
                    navigation.navigate("Comments", { postId: item.id });
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: 150,
    borderRadius: 25,
  },
  text: {
    color: "black",
    height: 20,
  },
  title: {
    height: 30,
    marginTop: 30,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ff6c00",
    padding: 30,
    borderRadius: 25,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  post_item_bottom_bar: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
});
