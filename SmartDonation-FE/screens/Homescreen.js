import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, BackHandler } from "react-native";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedContent from "../components/FeaturedContent";
import * as React from "react";
import { getAllCategories, getNgoByCategoryId } from "../components/api/Auth";
import { useSelector, useDispatch } from "react-redux";

const Homescreen = () => {
  const Navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown: false,
    });
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getAllCategories()
      .then(async (res) => {
        let categoriesArray = [];
        let categories = res;

        for (let i = 0; i < categories.length; i++) {
          const cat = categories[i];
          let id = cat._id;
          const response = await getNgoByCategoryId(id);
          let obj = {
            id: cat._id,
            name: cat.category_name,
            ngoData: response,
          };
          categoriesArray.push(obj);
        }

        setCategories(categoriesArray);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log("Error in fetching category", err);
      });
  };
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("User logged in: ", loggedIn);
  const navigationState = useNavigation((state) => state);
  console.log("Navigation state: ", navigationState);
  const currentRoute = useRoute().name;

  useEffect(() => {
    // const currentIndex = navigationState.index;
    // console.log("Current index: ", currentIndex);
    console.log("Current route: ", currentRoute);
    const handleBackPress = () => {
      if (loggedIn && currentRoute === "Home") {
        // Prevent going back to the login screen by returning true
        return true;
      }
      // Allow default back button behavior for other screens
      return false;
    };

    // Add event listener for back button press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Clean up event listener on component unmount
    return () => {
      backHandler.remove();
    };
  }, [navigationState, loggedIn]);

  return (
    <SafeAreaView style={styles.AndroidSafeArea} className="bg-white">
      <View className="flex-row items-center space-x-2 pb-3 mx-4">
        <View>
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
        </View>

        <View className="flex-1">
          <Text className="font-bold text-xl">Donate now</Text>

          <View className="flex-row"></View>
        </View>
        <TouchableOpacity>
          <UserIcon
            size={35}
            color="#00CCBB"
            onPress={() => Navigation.navigate("Register")}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <Categories categories={categories} />
        {categories?.map((cat) => {
          return (
            <View key={cat?.id}>
              {cat?.ngoData?.length > 0 && (
                <FeaturedContent
                  key={cat?.id}
                  description="We have divided Ngo in categories"
                  title={cat?.name}
                  ngoData={cat?.ngoData}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Homescreen;
