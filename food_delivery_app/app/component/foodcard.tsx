import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const FoodCart = ({ item }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      key={item.restaurantId}
      className="flex-row mb-6 items-center bg-white rounded-xl overflow-hidden"
      onPress={() =>
        router.push({
          pathname: "/home/restaurant/[id]",
          params: {
            id: item.restaurantId,
          },
        })
      }
    >
      <Image source={{ uri: item.image }} className="w-20 h-20 rounded-lg" />
      <View className="flex-1 ml-3 justify-center">
        <Text className="text-base font-semibold">{item.name}</Text>
        <Text className="text-gray-500">{item.description}</Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-gray-400">
            {item.deliveryTimeMin + " mins"} ·{" "}
          </Text>
          <Text className="text-gray-400">{item.rating} ⭐</Text>
        </View>
        <View className="flex-row mt-1">
          {item.tags.map((t: any) => (
            <Text
              key={t}
              className={`text-xs   px-2 py-0.5 rounded mr-1 ${
                t === "NEAR_YOU"
                  ? "text-cyan-600 bg-cyan-100"
                  : t === "FREESHIP"
                  ? "text-green-500 bg-green-100"
                  : t === "POPULAR"
                  ? "text-yellow-500 bg-yellow-100"
                  : t === "HEALTHY"
                  ? "text-blue-500 bg-blue-100"
                  : t === "FAVORITE"
                  ? "text-red-500 bg-red-100"
                  : "text-orange-500 bg-orange-100"
              }`}
            >
              {t === "NEAR_YOU"
                ? "Near you"
                : t === "FREESHIP"
                ? "Freeship"
                : t === "POPULAR"
                ? "Popular"
                : t === "HEALTHY"
                ? "Healthy"
                : t === "FAVORITE"
                ? "Favorite"
                : t === "DRINKS"
                ? "Drinks"
                : t === "COFFE"
                ? "Coffee"
                : "Unknown"}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCart;
