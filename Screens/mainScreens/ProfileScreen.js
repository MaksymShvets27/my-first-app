import { Feather, Ionicons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

export default ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, userName } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", userId.toString())
    );
    onSnapshot(q, (querySnapshot) => {
      let postsQuery = [];
      querySnapshot.forEach((doc) => {
        postsQuery.push(doc.data());
      });
      setUserPosts(postsQuery);
    });
  };

  useEffect(() => {
    getUserPosts();
    console.log(userPosts);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile_name}>
        <Text
          style={{
            fontSize: 40,
          }}
        >
          {userName}
        </Text>
      </View>

      <FlatList
        data={userPosts}
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
  },
  profile_name: {
    paddingVertical: 20,
    alignItems: "center",
  },
  image: {
    height: 100,
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
