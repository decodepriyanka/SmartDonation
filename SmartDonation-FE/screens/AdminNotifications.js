import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const AdminNotifications = () => {
  const navigation = useNavigation();
  const notification = useSelector(
    (state) => state.notification.notificationArray
  );
  const [isClicked, setIsCLicked] = useState(true);
  // onPress={() => setIsCLicked(!isClicked)}

//     console.log("Donated By Name", item?.donatedBy?.name);
//     console.log("DONATED TO NGO", item?.donatedToNgo?.title);
//     console.log("DONATED Details", item?.donationDetails);

  console.log("NOTIFICATION", notification);
  return (
    <ScrollView className="p-5">
<View style={{ paddingHorizontal: 16 }}>
  <Text style={{fontSize: 24, marginVertical: 16 }}>ITEMS</Text>
  {notification?.map((item) => {
    console.log(item, "item");
    let donationCount = 0;
    item?.donationDetails?.map((item) => {
      donationCount = donationCount + item?.donationValue;
    });
    console.log("Donated Items count", donationCount);
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          marginVertical: 8,
          borderRadius: 8,
          elevation: 2,
        }}
        key={item?.donationId}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: isClicked ? 0 : 1,
            borderColor: '#00CCBB',
            borderRadius: 8,
          }}
        >
          <Text>
            {item?.donatedBy?.name} donated {donationCount} items to {item?.donatedToNgo?.title}
          </Text>
        </TouchableOpacity>
        {isClicked && (
          <View style={{ flexDirection: 'row', marginBottom: 4, alignItems: 'center', paddingHorizontal: 16 }}>
            <TouchableOpacity
              style={{ backgroundColor: '#00CCBB', padding: 8, borderRadius: 4 }}
              onPress={() => {
                navigation.navigate("AdminDonationDetails", { item });
              }}
            >
              <Text style={{ color: '#FFFFFF' }}>Show details</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  })}
</View>
     </ScrollView>
  );
};

export default AdminNotifications;
