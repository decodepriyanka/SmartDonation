import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

import { getRestaurant } from "../slices/restaurantSlice";
import Icon from "react-native-vector-icons/FontAwesome5";
import { removeItem } from "../slices/Actions/cartActions";
import { calculateTotalCoins } from "../utils/cartUtils";
import constants from "../components/constants";
import { sendEmail, sendNotification } from "../components/api/Auth";

const CartScreen = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const restaurantname = useSelector(getRestaurant);
  const dispatch = useDispatch();
  const { EXTRA_POINT, EMAIL_SUBJECT, EMAIL_TEXT } = constants;

  const navigation = useNavigation();
  const itemsInCart = useSelector((state) => state.cart.cartDetail);

  const itemsValue = useSelector((state) => state.cart.cartValue);
  const totalCoin = calculateTotalCoins(itemsInCart, itemsValue);
  const ngoData = useSelector((state) => state.ngo.ngoDetails);
  const user = useSelector((state) => state.auth.user);

  const sendNotificationToNgo = () => {
    setShowSpinner(true);
    let donationDetails = [];
    itemsInCart.map((item) => {
      let itemId = item?.id;
      let value = itemsValue?.[itemId];
      let obj = {
        donationId: itemId,
        donationValue: value,
      };
      donationDetails.push(obj);
    });

    let notificationData = {
      donationDetails,
      senderId: user?._id,
      recieverId: ngoData?.addedBy?._id,
      ngoId: ngoData?._id,
    };

    let emailData = {
      to: ngoData?.addedBy?.email,
      subject: EMAIL_SUBJECT,
      text: EMAIL_TEXT,
    };

    sendNotification(notificationData)
      .then((res) => {
        sendEmail(emailData)
          .then((res) => {
            setShowSpinner(false);
            navigation.navigate("PreparingOrder");
            console.log("EMAIL SENT SUCCEFULLY", res);
          })

          .catch((err) => {
            setShowSpinner(false);
            console.log("Error in sending email", err);
          });
        console.log("Check for send notification response", res);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log("Error in sending notification", err);
      });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="bg-gray-100 flex-1">
        <View className="flex-row bg-white p-5 border-b border-[#00CCBB] shadow-sm">
          <View className="flex-1">
            <Text className="text-lg font-bold text-center">
              Donation Details
            </Text>
            <Text className="text-center text-gray-400">
              {restaurantname.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon height={50} width={50} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex-row my-5 bg-white p-2">
            <View className="flex-row flex-1 space-x-2 items-center">
              <Image
                source={{ uri: "https://links.papareact.com/wru" }}
                className="h-8 w-8 rounded-full"
              />
              <Text className="font-medium">We will pick up your donation soon!</Text>
            </View>
            {/* <View className="items-center">
              <TouchableOpacity onPress={navigation.goBack}>
                <Text className="text-[#00ccbb] font-medium mt-2">
                  Change Selection
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {itemsInCart.map((items, idx) => (
            <View
              key={idx}
              className="flex-row justify-between p-5 content-center mb-2 bg-white"
            >
              <View className="flex-row space-x-2 items-center">
                <Text className="text-[#00CCBB] mr-1">
                  {itemsValue?.[items?.id]} X
                </Text>
                <Image
                  source={{ uri: items.imgUrl }}
                  className="h-10 w-10 rounded-full mr-2"
                />
                <Text className="text-md">{items.title}</Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Text className="text-gray-400">
                  <View className="flex-row items-center">
                    <Text className="text-gray-400 mr-2">
                      {itemsValue?.[items?.id] * items.price}
                    </Text>
                    <Icon name="coins" className="text-gray-400" />
                  </View>
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    removeItem(items?.id, dispatch);
                  }}
                >
                  <Text className="text-[#00CCBB]">Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="bg-gray-100 border-t-1 border-gray-400 z-20">
        <View className="flex-row justify-between px-5 py-2">
          <Text className="text-gray-400">Reward points</Text>

          <View className="flex-row items-center">
            <Text className="text-gray-400">{totalCoin}</Text>
            <Icon name="coins" className="text-gray-400 ml-2" />
          </View>
        </View>
        <View className="flex-row justify-between px-5 py-2">
          <Text className="text-gray-400">Extra points</Text>
          <View className="flex-row items-center">
            <Text className="text-gray-400">{EXTRA_POINT}</Text>
            <Icon name="coins" className="text-gray-400 ml-2" />
          </View>
        </View>
        <View className="flex-row justify-between px-5 py-2">
          <Text>Total points</Text>
          <View className="flex-row items-center">
            <Text className="font-bold">{totalCoin + EXTRA_POINT}</Text>
            <Icon name="coins" className="text-gray-400 ml-2" />
          </View>
        </View>
        <TouchableOpacity
          className="bg-[#00CCBB] p-3 mx-4 rounded-md mb-3"
          onPress={() => {
            // navigation.navigate("PreparingOrder");
            sendNotificationToNgo();
          }}
        >
          <Text className=" text-white text-center font-medium text-lg">
            Donate Now!
          </Text>
          {showSpinner && <ActivityIndicator color={"#fff"} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
