import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import FeatureCard from "./FeatureCard";

const FeaturedContent = ({ description, title, id, ngoData }) => {
  return (
    <View>
      <View className="flex-row justify-between mt-4 px-4 items-center">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color="#00CCBB" />
      </View>

      <Text className="px-4 text-xs text-gray-500">{description}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="pt-4"
      >
        {ngoData?.map((ngo) => {
          return (
            <FeatureCard
              key={ngo?._id}
              id={ngo?._id}
              imgUrl={ngo?.urlToImage}
              title={ngo?.title}
              rating={4.5}
              lat={25.381926}
              long={87.0904168}
              dishes={[]}
              short_description={ngo?.content}
              address="240 yemen road Yemen"
              genre="NGO"
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedContent;
