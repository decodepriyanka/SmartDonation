import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Formik } from "formik";
import { registerUser } from "../components/api/Auth";
import Toast from "react-native-root-toast";
import Icon from "react-native-vector-icons/AntDesign";
import MailIcon from "react-native-vector-icons/Fontisto";
import EyeIcon from "react-native-vector-icons/Feather";

import { Dimensions } from "react-native";
// import EstyleSheet from "react-native-extended-stylesheet";
import { moderateScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const styles = StyleSheet.create({
  loginMain: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
  },
  headerContainer: {
    height: Dimensions.get("window").height / 4,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#232323",
    lineHeight: 35,
    letterSpacing: 0.4,
  },
  signInText: {
    color: "#9ea9b3",
    fontSize: 15,
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  formContainer: {},
  inputContainer: {},
  wrapper: {
    marginTop: moderateScale(20),
  },

  input: {
    height: moderateScale(55),
    color: "#232323",
    borderWidth: moderateScale(1),
    borderColor: "#9ea9b3",
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    fontSize: 15,
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  btnContainer: {
    marginTop: "10%",
  },
  footerContainer: {
    height: Dimensions.get("window").height / 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  footerContainerInner: {
    flexDirection: "row",
  },
  signText: {
    marginLeft: moderateScale(5),
    color: "#00CCBB",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputIcon: {
    marginRight: 10,
    color: "#00CCBB",
  },
  input: {
    flex: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 2,
    paddingVertical: 10,
  },
  passwordicon: {
    marginHorizontal: 10,
    color: "#00CCBB",
  },
  passwordinput: {
    flex: 1,
    color: "#333",
  },
});

const signUpValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required("Password is required"),
});

const Register = () => {
  const navigation = useNavigation();
  const [toastMessage, setToastMessage] = useState({
    show: false,
    msg: "",
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const modeType = useSelector((state) => state.auth.appMode);

  return (
    <View style={styles.loginMain}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.signInText}>
            Create your account to access more features.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              setShowSpinner(true);

              registerUser(values, modeType)
                .then((res) => {
                  setShowSpinner(false);
                  resetForm({
                    values: {
                      name: "",
                      email: "",
                      password: "",
                    },
                  });
                  setToastMessage({
                    show: true,
                    msg: "Account created successfully",
                  });

                  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
                  setTimeout(function hideToast() {
                    setToastMessage({
                      show: false,
                      msg: "",
                    });
                    navigation.navigate("Login");
                  }, 1500);
                })
                .catch((err) => {
                  setToastMessage({
                    show: true,
                    msg: err.response.data.message,
                  });

                  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
                  setTimeout(function hideToast() {
                    setToastMessage({
                      show: false,
                      msg: "",
                    });
                  }, 1500);
                  setShowSpinner(false);
                });
            }}
          >
            {({
              handleSubmit,
              isValid,
              values,
              errors,
              handleChange,
              touched,
            }) => (
              <>
                <View className="mb-4">
                  <View style={styles.inputContainer}>
                    <Icon name="user" size={20} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Name"
                      name="name"
                      onChangeText={handleChange("name")}
                      placeholderTextColor={"#232323"}
                    />
                  </View>

                  {errors.name && touched.name && (
                    <Text
                      style={{
                        fontSize: scale(10),
                        color: "red",
                        marginTop: scale(5),
                      }}
                    >
                      {errors.name}
                    </Text>
                  )}
                </View>
                <View className="mb-4">
                  <View style={styles.inputContainer}>
                    <MailIcon name="email" size={20} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Email"
                      keyboardType="email-address"
                      name="email"
                      onChangeText={handleChange("email")}
                      placeholderTextColor={"#232323"}
                    />
                  </View>

                  {errors.email && touched.email && (
                    <Text
                      style={{
                        fontSize: scale(10),
                        color: "red",
                        marginTop: scale(5),
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View className="mb-4" style={styles.passwordContainer}>
                  <Icon name="lock" size={20} style={styles.passwordicon} />
                  <TextInput
                    placeholder="Enter Password"
                    secureTextEntry={showPassword}
                    name="password"
                    onChangeText={handleChange("password")}
                    placeholderTextColor={"#232323"}
                    style={styles.passwordinput}
                  />
                  {errors.password && touched.password && (
                    <Text
                      style={{
                        fontSize: scale(10),
                        color: "red",
                        marginTop: scale(5),
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={() => setShowPassword((prevState) => !prevState)}
                  >
                    <EyeIcon
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      style={styles.passwordicon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      backgroundColor: "#00CCBB",
                      height: scale(50),
                      borderRadius: scale(10),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "500",
                        fontSize: 16,
                      }}
                    >
                      Create Accont
                    </Text>

                    {showSpinner && <ActivityIndicator color={"#fff"} />}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerContainerInner}>
            <Text style={styles.newUserText}>Already have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signText}>Log In</Text>
            </TouchableOpacity>
            {toastMessage.show && (
              <Toast
                visible={toastMessage.show}
                position={-20}
                shadow={false}
                animation={true}
                hideOnPress={true}
                backgroundColor={"#00CCBB"}
              >
                {toastMessage.msg}
              </Toast>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
