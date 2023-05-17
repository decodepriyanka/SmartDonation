import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import {
  addNgo,
  getAllCategories,
  getNotification,
} from "../components/api/Auth";
import Icon from "react-native-vector-icons/AntDesign";
import { scale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import constants from "../components/constants";
import MapIcon from "react-native-vector-icons/FontAwesome";
import { PermissionsAndroid } from "react-native";
import * as Location from "expo-location";
import { setNotificationData } from "../slices/Actions/notificationActions";
import { useDispatch } from "react-redux";
const { CLOUD_NAME, UPLOAD_PRESET } = constants;

// import { cloudinary } from "cloudinary";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().max(250, "Content cannot exceed 250 characters"),
});

const AdminHomeScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const initialValues = {
    title: "",
    content: "",
  };
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [catergory, setCategory] = useState([]);

  const onDropdownOpen = useCallback(() => {
    //   setCompanyOpen(false);
  }, []);

  const uploadImageToCloudinary = async (base64Image) => {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const data = {
      file: base64Image,
      upload_preset: UPLOAD_PRESET,
    };

    try {
      const response = await fetch(cloudinaryUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const responseData = await response.json();
      return responseData.secure_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result?.canceled) {
      const imageUri = `data:image/jpg;base64,${result?.assets?.[0]?.base64}`;
      const imageUrl = await uploadImageToCloudinary(imageUri);
      console.log("IMAGE URL", imageUrl);
      setImageUrl(imageUrl);
    }
  };

  const polling = () => {
    getNotification(user?._id)
      .then((res) => {
        console.log("RESPONSE", res);
        setNotificationData(res, dispatch);
      })
      .catch((err) => {
        console.log("Error in fetching messages", err);
      });
  };

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        let categoriesArray = [];
        let categories = res;
        categories.map((cat) => {
          let obj = {
            id: cat?._id,
            name: cat.category_name,
          };
          categoriesArray.push(obj);
        });
        setCategory(categoriesArray);
      })
      .catch((err) => {
        console.log("Error in fetching category", err);
      });

    // setInterval(() => {
    polling();
    // },10000)
  }, []);

  const requestLocationAccess = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Smile App need Permission",
        message:
          "Smile App needs access to your GPS " +
          "so you can see nearby stations.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (granted) {
      let location = await Location.getCurrentPositionAsync({});
      console.log("++++LAT", location?.coords?.latitude);
      console.log("++++LAT", location?.coords?.longitude);
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Smile App need Permission",
          message: "Smile App needs access to your GPS",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
    }
  };

  return (
    <View className="flex justify-center bg-white p-4 h-full">
      <Text className="text-3xl font-bold">Welcome</Text>
      <Text className="text-base font-normal text-gray-600 mb-2">
        You can register your Ngo from here
      </Text>
      <View className="mt-10">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            setShowSpinner(true);
            let obj = {
              title: values?.title,
              content: values?.content,
              categoryId: dropdownValue,
              userId: user?._id,
              imageUrl: imageUrl,
            };
            addNgo(obj)
              .then((res) => {
                console.log("RES", res);
                setShowSpinner(false);
                setDropdownValue("");
                setImageUrl(null);
                resetForm({ values: initialValues });
              })
              .catch((err) => {
                console.log("ERRORT IN ADDING NGO", err);
                setShowSpinner(false);
              });
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("title")}
                value={values.title}
              />
              {errors.title && touched.title && (
                <Text style={styles.error}>{errors.title}</Text>
              )}

              <Text style={styles.label}>Content</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("content")}
                value={values.content}
                multiline={true}
              />
              {errors.content && touched.content && (
                <Text style={styles.error}>{errors.content}</Text>
              )}

              <Text style={styles.label}>Option</Text>

              <DropDownPicker
                style={styles.dropdown}
                open={dropdownOpen}
                value={dropdownValue} //genderValue
                items={catergory.map((cat) => ({
                  label: cat.name,
                  value: cat.id,
                }))}
                setOpen={setDropdownOpen}
                setValue={setDropdownValue}
                setItems={setCategory}
                placeholder="Select Category"
                placeholderStyle={styles.placeholderStyles}
                onOpen={onDropdownOpen}
                zIndex={9999}
              />
              <TouchableOpacity
                className="flex flex-row my-2"
                onPress={requestLocationAccess}
              >
                <MapIcon name="map-marker" size={20} color="red" />
                <Text className="text-red-600 ml-2 text-sm">
                  Auto Detect My Location
                </Text>
              </TouchableOpacity>

              {imageUrl ? (
                <View className="w-full h-40 border-2 border-solid border-gray-400 mb-2 relative p-6 rounded">
                  <Icon
                    name="close"
                    className="absolute top-0 text-2xl right-0"
                    onPress={() => {
                      setImageUrl(null);
                    }}
                  />
                  <Image
                    source={{ uri: imageUrl }}
                    className="w-full h-full object-cover"
                  />
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={pickImage}
                    style={{
                      backgroundColor: "#00CCBB",
                      height: scale(50),
                      borderRadius: scale(10),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", marginLeft: scale(5) }}>
                      Select Image
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: "#00CCBB",
                    height: scale(50),
                    borderRadius: scale(10),
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "#fff", marginLeft: scale(5) }}>
                    Submit
                  </Text>
                  {showSpinner && <ActivityIndicator color={"#fff"} />}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: "none",
  },

  error: {
    fontSize: 14,
    color: "red",
    marginBottom: 5,
  },
  image: {
    fontSize: 14,
    marginTop: 10,
  },
});
export default AdminHomeScreen;
