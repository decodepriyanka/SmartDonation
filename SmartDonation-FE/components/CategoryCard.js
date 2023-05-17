import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
const CategoryCard = ({ imgURL, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{
          // uri: urlFor(imgURL).width(200).url(),
          uri: imgURL,
        }}
        className="h-24 w-24 rounded"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
