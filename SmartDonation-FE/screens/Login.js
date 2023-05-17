import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Formik } from "formik";
import { loginUser } from "../components/api/Auth";
import { setTokenInterceptor } from "../utils/setTokenInterceptor";
import Toast from "react-native-root-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserLogin,
  updateUserAccessToken,
} from "../slices/Actions/authActions";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import MailIcon from "react-native-vector-icons/Fontisto";
import EyeIcon from "react-native-vector-icons/Feather";
import { moderateScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";

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
    // backgroundColor: "#34eb74",
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
    color: "#000a04",
    lineHeight: 35,
    letterSpacing: 0.4,
  },
  signInText: {
    color: "#9ea9b3",
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: "500",
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
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.2,
    // lineHeight: 20,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    fontSize: moderateScale(12),
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

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is requred"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigation = useNavigation();
  const [toastMessage, setToastMessage] = useState({
    show: false,
    msg: "",
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const dispatch = useDispatch();
  const modeType = useSelector((state) => state.auth.appMode);

  return (
    <View style={styles.loginMain}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.signInText}>Log in to access more features.</Text>
        </View>

        <View style={styles.formContainer}>
          <Formik
            validationSchema={signInValidationSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              setShowSpinner(true);

              loginUser(values, modeType)
                .then(async (res) => {
                  updateUserLogin(res, true, dispatch);
                  updateUserAccessToken(res.token, dispatch);
                  setTokenInterceptor(res);
                  setShowSpinner(false);
                  resetForm({
                    values: {
                      email: "",
                      password: "",
                    },
                  });
                  setToastMessage({
                    show: true,
                    msg: "You have logged in succefully",
                  });


              // Store login data in SecureStore
              //  await SecureStore.setItemAsync('isLoggedIn', 'true');
              //  await SecureStore.setItemAsync('username', res.username);

                  setTimeout(function hideToast() {
                    setToastMessage({
                      show: false,
                      msg: "",
                    });
                    if (modeType === "NGO") {
                      navigation.navigate("NgoTabs");
                    } else if (modeType === "Admin") {
                      navigation.navigate("SuperAdminHomeScreen");
                    } else {
                      navigation.navigate("Home");
                    }
                  }, 1500);
                })
                .catch((err) => {
                  console.log("ERROR IN LOGIN", err.response.data.message);
                  setToastMessage({
                    show: true,
                    msg: err.response.data.message,
                  });

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
                        marginLeft: scale(5),
                        fontSize: 16,
                        fontWeight: "500",
                      }}
                    >
                      Login
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
            <Text style={styles.newUserText}>Dont have a account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View>
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

export default Login;
