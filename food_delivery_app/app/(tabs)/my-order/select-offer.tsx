import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SelectOffer() {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    useCallback(() => {
      // Ẩn tab bar khi vào màn hình này
      const parent = navigation.getParent(); // stack cha
      const tabParent = parent?.getParent(); // navigator chứa tab
      tabParent?.setOptions({ tabBarStyle: { display: "none" } });

      return () => {
        // Hiện lại tab bar khi rời màn hình
        tabParent?.setOptions({
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 0,
            elevation: 4,
            shadowColor: "#000",
            height: 60,
            paddingBottom: 5,
          },
        });
      };
    }, [navigation])
  );


  const offers = [
    { id: 0, title: '-10%', available: true, color: 'bg-cyan-50', icon: 'ticket-alt' },
    { id: 1, title: '+$1 shipping fee', available: true, color: 'bg-cyan-50', icon: 'truck' },
    { id: 2, title: '-10% for E-wallet', available: true, color: 'bg-purple-50', icon: 'wallet' },
    { id: 3, title: '-30% for bill over $50', available: false, color: 'bg-gray-50', icon: 'tag' },
    { id: 4, title: 'Freeship', available: false, color: 'bg-gray-50', icon: 'gift' },
  ];

  const filteredOffers = offers.filter(o =>
    o.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: typeof offers[0] }) => (
    <TouchableOpacity
      onPress={() => item.available && setSelectedOffer(item.id)}
      disabled={!item.available}
      className={`
        flex-row items-center justify-between p-4 rounded-xl border-2 mb-3
        ${selectedOffer === item.id && item.available ? 'border-cyan-400 bg-cyan-50' : item.available ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'}
      `}
    >
      <View className={`w-10 h-10 rounded-lg mr-3 flex items-center justify-center`}>
        <FontAwesome5
          name={item.icon as any}
          size={24}
          color={item.available
            ? (item.color === 'bg-purple-50' ? '#9C27B0' : '#00BCD4')
            : '#ccc'}
        />
      </View>
      <Text className={`${item.available ? 'text-gray-800' : 'text-gray-400'} flex-1 text-base`}>
        {item.title}
      </Text>
      <View className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOffer === item.id && item.available ? 'border-cyan-400' : 'border-gray-300'}`}>
        {selectedOffer === item.id && item.available && <View className="w-3 h-3 rounded-full bg-cyan-400" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">

      {/* Search */}
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Add or search for voucher"
        className="bg-gray-100 rounded-xl px-4 py-3 mb-4 text-gray-600 text-sm"
      />

      {/* Offers List */}
      <FlatList
        data={filteredOffers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {/* Use Now Button */}
      <TouchableOpacity
        className="bg-cyan-400 py-4 rounded-xl items-center mt-4"
        onPress={() => {
          if (selectedOffer !== null) {
            // Truyền selectedOffer về màn hình trước nếu cần
            router.back(); // quay về màn hình trước đó
            // hoặc nếu muốn dùng push: router.push("/(tabs)/my-order/index");
          } else {
            // alert("Please select an offer first!");
          }
        }}
      >
        <Text className="text-white font-semibold text-base">Use now</Text>
      </TouchableOpacity>
    </View>
  );
}
