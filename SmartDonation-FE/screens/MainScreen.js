import { FlatList, Text, View, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect } from "react";
import NavigationCard from "../components/NavigationCard";
const data = [
    {
        id:"1",
        title:"Donate Food",
        image:"https://links.papareact.com/28w",
        screen:"HomeScreen"
    },
    {
        id:"2",
        title:"Donate Clothes",
        image:"https://links.papareact.com/28w",
        screen:"ClothesScreen",
    },
    {
        id:"3",
        title:"Provide Education",
        image:"https://links.papareact.com/28w",
        screen:"ClothesScreen",
    },
    {
        id:"4",
        title:"Delivery Angel?",
        image:"https://links.papareact.com/28w",
        screen:"DeliveryScreen",
    }
]

const MainScreen = () => {
const navigation = useNavigation();

useLayoutEffect(()=> {
    navigation.setOptions({
        headerShown: false,
    })
},[]);


    return(
    //     <FlatList 
    //     data={data}
    //     keyExtractor={(item)=>
    //         item.id
    //         }
    //     horizontal
    //     renderItem={(item)=>(
    //         <TouchableOpacity className='p-2 pl-6 pb-8 pt-4 bg-gray-300 m-2 w-40'>
    //             <View>
    //                 <Image 
    //                  style={{height:100, width:100, resizeMode: 'contain'}}
    //                 source={{uri: item.item.image}}
    //                 />
    //             </View>
    //         </TouchableOpacity>
    // )}
    //     />
<View className='h-full w-full justify-center'>
<View className='flex-row flex-wrap p-3 justify-center'>
{data.map((item) => NavigationCard(item))}
</View>
<TouchableOpacity className='p-3 bg-gray-300 w-full items-center mb-3'>
    <Text>Are you a volunteer?</Text>
</TouchableOpacity>
<TouchableOpacity className='p-3 bg-gray-300 w-full items-center'>
<Text> Can you deliver on the way?</Text>
</TouchableOpacity>
</View>
    )
}

export default MainScreen;