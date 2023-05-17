import React from "react";
import Homescreen from "../screens/Homescreen";
import Restaurantscreen from "../screens/Restaurantscreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import CartScreen from "../screens/CartScreen";
import PreparingOrderScreen from "../screens/PreparingOrderScreen";
import DeliveryScreen from "../screens/DeliveryScreen";
import MainScreen from "../screens/MainScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import SelectUserType from "../screens/SelectUserType";
import AdminHomeScreen from "../screens/AdminHomeScreen";
import NgoTabs from "../screens/NgoTabs";
import { isOnboardingDisabled } from "../slices/Actions/authActions";
import Onboarding from "../screens/OnboardingScreen";
import AdminDonationDetails from "../screens/AdminDonationDetails";
import SuperAdminHomeScreen from "../screens/SuperAdminHomeScreen";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Onboarding"}
    >
      <Stack.Group
        screenOptions={{
          presentation: "fullScreenModal",
          headerShown: false,
          animation: "slide_from_bottom",
          statusBarTranslucent: false,
          statusBarHidden: false,
          statusBarColor: "#00CCBB",
        }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="NgoTabs" component={NgoTabs} />
        <Stack.Screen name="SelectUserType" component={SelectUserType} />
        <Stack.Screen name="Home" component={Homescreen} />
        {/* <Stack.Screen name="AdminHome" component={AdminHomeScreen} /> */}
        <Stack.Screen name="Restaurant" component={Restaurantscreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="AdminDonationDetails"
          component={AdminDonationDetails}
        />
        <Stack.Screen
          name="SuperAdminHomeScreen"
          component={SuperAdminHomeScreen}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: "fullScreenModal",
          headerShown: false,
          animation: "slide_from_bottom",
          statusBarTranslucent: false,
          statusBarHidden: false,
          statusBarColor: "#00CCBB",
        }}
      >
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Navigation;
