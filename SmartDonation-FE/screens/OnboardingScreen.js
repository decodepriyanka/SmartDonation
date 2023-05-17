import React from "react";
import { View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
// import { styles } from "./styles";
// import { connect } from "react-redux";
import * as authAction from "../slices/Actions/authActions";
// import PropTypes from "prop-types";
import {
  isOnboardingDisabled,
  updateOnboarding,
} from "../slices/Actions/authActions";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00CCBB",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingStart: "8%",
    paddingRight: "8%",
  },
  title: {
    color: "#182952",
    fontSize: 25,
    //   fontWeight: "bold",
    textAlign: "center",
    //   fontWeight: 600,
    color: "#ffffff",
    lineHeight: 30,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  imageContainer: {
    flex: 3,
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingStart: "8%",
    paddingRight: "8%",
  },

  text: {
    textAlign: "center",
    //   fontWeight: 400,
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.4,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  skipTextColor: {
    color: "#ffffff",
    //   fontWeight: 500,
    fontSize: 12,
    lineHeight: 20,
  },
  skipView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const slides = [
    {
      key: "slide1",
      image: require("../assets/onboarding/frontal_home.png"),
      title: "Welcome to world of smile",
      text: "Here you can donate whatever yoy want. By registering to this application.",
    },
    {
      key: "slide2",
      image: require("../assets/onboarding/doodle_reading.png"),
      title: "Donate everything",
      text: "Donate everything at anywhere at any place just by connecting to the internet.",
    },
    {
      key: "slide3",
      image: require("../assets/onboarding/stting_on_floor.png"),
      title: "Add to favorite.",
      text: "Add to your favorite read list and also you can add comments.",
    },
  ];

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="arrow-forward-outline"
          color="rgba(255,255,255, .9 )"
          size={24}
        />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          s
          name="md-checkmark"
          color="rgba(255,255,255, .9 )"
          size={24}
        />
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={styles.skipView}>
        <Text style={styles.skipTextColor}>Skip</Text>
      </View>
    );
  };

  const _onEndReached = () => {
    updateOnboarding(true, dispatch);
    navigation.navigate("SelectUserType");
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={_renderItem}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      onDone={_onEndReached}
      onSkip={_onEndReached}
      dotClickEnabled={true}
      showNextButton={true}
      showDoneButton={true}
      showSkipButton={true}
    />
  );
};

// Onboarding.propTypes = {
//   isOnboardingDisabled: PropTypes.bool.isRequired,
//   updateOnboarding: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => {
//   return {
//     isOnboardingDisabled: state.auth.isOnboardingDisabled,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   updateOnboarding: (status) => dispatch(authAction.updateOnboarding(status)),
// });

export default Onboarding;

// import EStyleSheet from "react-native-extended-stylesheet";
// import Constant from "../../constants/index";

// const {
//   THEME: { primary, secondary },
// } = Constant;
