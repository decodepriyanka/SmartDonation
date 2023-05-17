import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
} from "react-native";
import React from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import { getRestaurant } from "../slices/restaurantSlice";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import * as MailComposer from 'expo-mail-composer';


import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const restName = useSelector(getRestaurant);
  const ngoData = useSelector((state) => state.ngo.ngoDetails);
  const navigation = useNavigation();
  
  const openGmail = async (email) => {
    const recipientEmail = email;
    const subject = 'Enquiry regarding my donation';
  
    try {
      await MailComposer.composeAsync({
        recipients: [recipientEmail],
        subject: subject,
      });
    } catch (error) {
      console.error('Failed to open email composer:', error);
    }
  };
  

  return (
    <View className="bg-[#00ccbb] flex-1">
      <View className="flex-row justify-between p-2">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <XMarkIcon size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            className="text-white text-lg"
            onPress={() => openGmail(ngoData?.addedBy?.email)}
          >
            Need Help?
          </Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white p-6 mx-5 my-2 rounded-md shadow-md z-50">
        <View className="flex-row">
          <View>
            <Text className="text-lg text-gray-400 mx-2 mt-2">
              reaching out to you soon!
            </Text>
            <Text className="text-lg font-semibold m-2">
              you just donated smiles :)
            </Text>
          </View>
          <Image
            source={{ uri: "https://links.papareact.com/fls" }}
            className="h-20 w-20"
          />
        </View>
        <Progress.Bar size={30} indeterminate={true} color="#00ccbb" />
        <Text className="text-xs m-2">
          your donation at NGO{restName.title} is being processed
        </Text>
      </View>
      {/* 
      <MapView
        initialRegion={{
          latitude: restName.lat,
          longitude: restName.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restName.lat,
            longitude: restName.long,
          }}
          title={restName.title}
          description={restName.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView> */}

      <Animatable.Image
        source={{
          uri: "https://media.giphy.com/media/G5MDBwmdTrVMpuRJix/giphy.gif",
        }}
        className="h-80 w-80 ml-5"
        iterationCount={1}
        animation="slideInUp"
      />

      {/* <Animatable.Text
        className="text-white font-medium text-lg my-10 ml-5"
        iterationCount={1}
        animation="slideInUp"
      ></Animatable.Text> */}

      <View className="bg-white flex-row space-x-5 h-28 absolute bottom-0 w-full items-center">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-12 w-12 bg-gray-300 p=4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-xs">{ngoData?.addedBy?.email}</Text>
          <Text className="text-gray-400">NGO</Text>
        </View>
        <Text
          className="text-[#00CCBB] text-sm mr-5 font-bold"
          onPress={() => openGmail(ngoData?.addedBy?.email)}
        >
          Contact us
        </Text>
      </View>
    </View>
  );
};

export default DeliveryScreen;
