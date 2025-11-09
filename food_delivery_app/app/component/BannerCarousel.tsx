import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  {
    title: "Join Party",
    price: "$1",
    color: "bg-purple-200",
    image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  },
  {
    title: "Free Delivery",
    price: "Today Only",
    color: "bg-yellow-200",
    image: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
  },
  {
    title: "50% OFF Pizza",
    price: "Special Deal",
    color: "bg-pink-200",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  },
  {
    title: "Buy 1 Get 1",
    price: "Drinks",
    color: "bg-green-200",
    image: "https://cdn-icons-png.flaticon.com/512/3515/3515042.png",
  },
];

export default function BannerCarousel() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000); // đổi hình mỗi 3s

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <View className="mt-4">
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <View
            className={`${item.color} rounded-2xl mx-4 p-4 flex-row justify-between items-center`}
            style={{ width: width - 32 }}
          >
            <View>
              <Text className="text-lg font-semibold">{item.title}</Text>
              <Text className="text-2xl font-bold">{item.price}</Text>
              <TouchableOpacity className="bg-cyan-400 mt-2 px-3 py-1 rounded-full">
                <Text className="text-white text-sm">SEE MORE</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: item.image }}
              className="w-20 h-20"
              resizeMode="contain"
            />
          </View>
        )}
      />

      {/* Dots indicator */}
      <View className="flex-row justify-center mt-2">
        {banners.map((_, i) => (
          <View
            key={i}
            className={`h-2 w-2 rounded-full mx-1 ${
              i === currentIndex ? "bg-cyan-500" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
