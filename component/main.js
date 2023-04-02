import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/authScreens/LoginScreen";
import RegistrationScreen from "../Screens/authScreens/RegistrationScreen";
import Home from "../Screens/mainScreens/Home";
import { authStateChangeUser } from "../redux/auth/authOperations";

const AuthStack = createStackNavigator();

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  return (
    <NavigationContainer>
      {!stateChange ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
        </AuthStack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
