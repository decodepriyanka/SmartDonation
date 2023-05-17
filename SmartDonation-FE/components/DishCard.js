import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import { decrementCart, incrementCart } from "../slices/Actions/cartActions";

const DishCard = ({ imgUrl, title, description, price, id }) => {
  const [isClicked, setIsCLicked] = useState(false);
  const dispatch = useDispatch();
  const itemsValue = useSelector((state) => state.cart.cartValue?.[id]);
  const modeType = useSelector((state) => state.auth.appMode);

  return (
    <>
      <TouchableOpacity
        className={`bg-white border p-4 border-gray-200 ${
          isClicked && "border-b-0"
        }`}
        onPress={() => {
          if (modeType === "User") setIsCLicked(!isClicked);
        }}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{title}</Text>
            <Text className="text-gray-400">{description}</Text>
            <View className="flex-row items-center">
              <Text className="text-gray-400">{price}</Text>
              <Icon name="coins" className="text-gray-400 ml-2" />
            </View>
          </View>
          <View className="">
            <Image
              className="h-20 w-20 bg-gray-300"
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{ uri: imgUrl }}
            ></Image>
          </View>
        </View>
      </TouchableOpacity>
      {isClicked && (
        <View className="flex-row mb-1 items-center space-x-2 bg-white px-4">
          <TouchableOpacity
            onPress={() => {
              const value = 1;
              const cartObj = {
                imgUrl,
                title,
                description,
                price,
                id,
              };
              incrementCart(value, cartObj, dispatch);
            }}
          >
            <PlusCircleIcon size={35} color="#00CCBB" />
          </TouchableOpacity>
          <Text>{itemsValue ? (itemsValue >= 0 ? itemsValue : 0) : 0}</Text>
          <TouchableOpacity
            onPress={() => {
              decrementCart(id, dispatch);
            }}
          >
            <MinusCircleIcon size={35} color="#00CCBB" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DishCard;
