import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log(posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Image source={{ uri: item.photo }} style={styles.image} />
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
                    navigation.navigate("Comments");
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
    height: 240,
  },
  text: {
    color: "black",
    height: 20,
  },
  title: {
    height: 30,
    marginTop: 30,
    borderColor: "#e8e8e8",
    borderBottomWidth: 1,
  },
  item: {
    borderWidth: 3,
    borderColor: "red",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  post_item_bottom_bar: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
});
