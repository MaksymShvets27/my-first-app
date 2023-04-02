import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
const MainTab = createBottomTabNavigator();

export default Home = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          tabBarActiveTintColor: null,
          headerRight: () => (
            <Ionicons
              onPress={signOut}
              name="exit-outline"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 16 }}
            />
          ),
          tabBarIcon: ({ focused, size, color }) => {
            return <Ionicons name="grid-outline" size={24} color="black" />;
          },
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          title: "Создать публикацию",
          headerTitleAlign: "center",
          tabBarActiveTintColor: null,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons
                name="add"
                size={size}
                color="white"
                style={{
                  backgroundColor: "orange",
                  width: 75,
                  height: 40,
                  borderRadius: 20,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              />
            );
          },
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          title: "Ваш профиль",
          headerTitleAlign: "center",
          tabBarActiveTintColor: null,
          tabBarIcon: ({ focused, size, color }) => {
            return <AntDesign name="user" size={24} color="black" />;
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
