import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllDonationItems } from "../components/api/Auth";
import DishCard from "../components/DishCard";

const SuperAdminHomeScreen = () => {
  const [donationItems, setDonationItems] = useState([]);

  useEffect(() => {
    getAllDonationItems()
      .then((res) => {
        setDonationItems(res);
      })
      .catch((err) => {
        console.log("Error in fetching items", err);
      });
  }, []);
  return (
    <ScrollView className="bg-gray-100">
      <Text className="font-extrabold text-3xl m-2">Items being donated</Text>
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
    </ScrollView>
  );
};

export default SuperAdminHomeScreen;
