import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function NavigationCard(item) {
  return (
    <View key={item.id}>
         <TouchableOpacity className='p-2 pl-6 pb-8 pt-4 bg-gray-300 m-2 w-40'>
              <View>
                     <Image 
                     style={{height:100, width:100, resizeMode: 'contain'}}
                    source={{uri: item.image}}
                    />
                </View>
                <Text className='font-bold'>{item.title}</Text>
            </TouchableOpacity>
    </View>
  )
}