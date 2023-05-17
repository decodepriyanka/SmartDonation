import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminHomeScreen from "../screens/AdminHomeScreen";
import AdminSettings from "./AdminSettings";
import AdminNotifications from "./AdminNotifications";
import AdminProfile from "./AdminProfile";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

const NgoTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#00CCBB",
        tabBarInactiveTintColor: "#232323",
        tabBarHideOnKeyboard: false,
        tabStyle: {
          marginVertical: moderateScale(5),
        },
        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={AdminHomeScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <Ionicons name="home-sharp" size={size} color={color} />
            ) : (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={AdminNotifications}
        options={{
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <Ionicons name="notifications-sharp" size={size} color={color} />
            ) : (
              <Ionicons
                name="notifications-outline"
                size={size}
                color={color}
              />
            ),
        }}
      />
      {/* <Tab.Screen
        name="Settings"
        component={AdminSettings}
        options={{
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <Ionicons name="settings" size={size} color={color} />
            ) : (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Profile"
        component={AdminProfile}
        options={{
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <Ionicons name="person" size={size} color={color} />
            ) : (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default NgoTabs;
