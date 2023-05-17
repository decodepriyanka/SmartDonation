import { View, Text, Touchable, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon, MapPinIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Restaurantscreen from "../screens/Restaurantscreen";
import { resetCart } from "../slices/Actions/cartActions";
import { useDispatch } from "react-redux";
import { setNgoData } from "../slices/Actions/ngoActions";

const FeatureCard = ({
  id,
  imgUrl,
  title,
  rating,
  lat,
  long,
  dishes,
  short_description,
  address,
  genre,
}) => {
  const image = require("../assets/profile-image-bg.jpg");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      className="shadow bg-white mr-4"
      onPress={() => {
        setNgoData(id, dispatch);
        // navigation.navigate("Restaurant");
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          lat,
          long,
          dishes,
          short_description,
          address,
          genre,
        });
        resetCart(0, {}, dispatch);
      }}
    >
      <Image
        source={{
          // uri:urlFor(imgUrl).url(),
          uri: imgUrl ?? image,
        }}
        className="h-36 w-64 rounded-sm"
      />

      <View>
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" size={22} opacity={0.5} />
          <Text className="text-xs text-green-500">{rating}</Text>
          <Text className="text-xs text-gray-500">. {genre}</Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" size={22} opacity={0.4} />
          <Text className="text-xs text-gray-500">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeatureCard;
