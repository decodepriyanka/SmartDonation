import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { moderateScale, scale } from "react-native-size-matters";
import { updateAppModeType } from "../slices/Actions/authActions";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#34eb74",
  },
  text: {
    color: "#000a04",
  },
  lightGray5: {
    color: "#40403b",
  },
  primary: {
    color: "#000a04",
  },
  dark: {
    color: "#e3e2d3",
  },
  loginMain: {
    flex: 1,
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    marginTop: "50%",
  },
  headerContainer: {
    height: Dimensions.get("window").height / 4,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000a04",
    lineHeight: 35,
    letterSpacing: 0.4,
  },
  buttonContainer: {},
  signInText: {
    color: "#FFFFFF",
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: "500",
    lineHeight: 20,
  },
  headerText: {
    color: "#9ea9b3",
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: "500",
    lineHeight: 20,
  },
});

const SelectUserType = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.loginMain}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.headerText}>
            Select your mode you want to use
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "#00CCBB",
              height: scale(50),
              borderRadius: scale(10),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: scale(40),
            }}
            onPress={() => {
              updateAppModeType("Admin", dispatch);
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.signInText}>JOIN AS ADMIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#00CCBB",
              height: scale(50),
              borderRadius: scale(10),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: scale(40),
            }}
            onPress={() => {
              updateAppModeType("NGO", dispatch);
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.signInText}>JOIN AS NGO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#00CCBB",
              height: scale(50),
              borderRadius: scale(10),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              updateAppModeType("User", dispatch);
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.signInText}>JOIN AS USER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectUserType;
