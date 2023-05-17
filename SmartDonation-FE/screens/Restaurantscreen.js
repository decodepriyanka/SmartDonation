import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowLeftCircleIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import DishCard from "../components/DishCard";
import CartSticker from "../components/CartSticker";
import { useDispatch, useSelector } from "react-redux";
// import { addItemsToCart } from "../slices/cartCountSlice";
import { setRestaurant } from "../slices/restaurantSlice";
import { getAllDonationItems } from "../components/api/Auth";

export default function Restaurantscreen() {
  const itemsInCart = useSelector((state) => state.cart.cartDetail);
  const itemsValue = useSelector((state) => state.cart.cartValue);
  const ngoData = useSelector((state) => state.ngo.ngoDetails);

  const [donationItems, setDonationItems] = useState([]);

  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const {
    params: {
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
    },
  } = useRoute();

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown: false,
    });

    getAllDonationItems()
      .then((res) => {
        setDonationItems(res);
      })
      .catch((err) => {
        console.log("Error in fetching items", err);
      });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [dispatch]);
  return (
    <>
      <ScrollView>
        <View className="relative">
          <Image
            className="h-52 w-full bg-gray-300 p-4"
            source={{ uri: imgUrl }}
          />
          <TouchableOpacity
            className="absolute top-8 left-2 bg-gray-100 rounded-full"
            onPress={() => {
              Navigation.goBack();
            }}
          >
            <ArrowLeftCircleIcon color="#00CCBB" size={42} />
          </TouchableOpacity>
        </View>

        <View className="bg-white p-4">
          <Text className="font-bold text-3xl">{title}</Text>

          <View className="flex-row space-x-1 my-1">
            <View className="flex-row items-center space-x-1 ">
              <StarIcon color="green" size={22} opacity={0.5} fill="green" />
              <Text className="text-xs text-green-500">{rating}</Text>
              <Text className="text-xs text-gray-500"> . {genre}</Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <MapPinIcon color="gray" size={22} opacity={0.4} fill="gray" />
              <Text className="text-xs text-gray-500">Nearby . {address}</Text>
            </View>
          </View>

          <View className="pt-2">
            <Text>{short_description}</Text>
          </View>
        </View>

        <View className="flex-row justify-between m-2 bg-white p-2">
          <View className="flex-row">
            <TouchableOpacity>
              <QuestionMarkCircleIcon size={20} color="green" />
            </TouchableOpacity>
            <Text className="font-semibold text-md ml-3">
              want to know more about this NGO?
            </Text>
          </View>

          <View>
            <TouchableOpacity>
              <ChevronRightIcon size={20} color="green" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text className="font-extrabold text-3xl m-2">ITEMS</Text>
          {donationItems?.map((item) => {
            return (
              <DishCard
                key={item?._id}
                id={item?._id}
                imgUrl={item?.urlToImage}
                title={item?.title}
                description={item?.description}
                price={item?.price}
              />
            );
          })}
        </View>
      </ScrollView>
      {itemsInCart?.length > 0 && <CartSticker />}
    </>
  );
}
