import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostScreen from "../nestedScreen/DefaultPostScreen";
import MapScreen from "../nestedScreen/MapScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";

const NestedScreen = createStackNavigator();

export default PostScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultPostScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Местоположение" }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарии",
        }}
      />
    </NestedScreen.Navigator>
  );
};
