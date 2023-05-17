import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
const Categories = (props) => {
  const { categories } = props;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 12,
      }}
    >
      {categories?.map((cat) => {
        return (
          <CategoryCard
            key={cat?.id}
            imgURL="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1527&q=80"
            title={cat?.name}
          />
        );
      })}
    </ScrollView>
  );
};

export default Categories;
