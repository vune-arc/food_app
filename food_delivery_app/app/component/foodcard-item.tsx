import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

const FoodCartItem = ({ item }: any) => {
  const router = useRouter();

  return (
    <View className="mb-6 bg-white rounded-xl overflow-hidden shadow-sm border-b border-gray-100 py-2">
      {/* Restaurant header */}
      <TouchableOpacity
        className="flex-row p-3"
        onPress={() =>
          router.push({
            pathname: "/home/restaurant/[id]",
            params: {
              id: item.restaurantId,
            },
          })
        }
      >
        {/* Ảnh nhà hàng */}
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            className="w-24 h-24 rounded-lg"
          />
        ) : (
          <View className="w-24 h-24 rounded-lg bg-gray-200" />
        )}

        {/* Thông tin */}
        <View className="flex-1 ml-3 justify-center">
          <Text className="text-lg font-semibold text-gray-800">
            {item.name}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">{item.description}</Text>

          <View className="flex-row items-center mt-2">
            <Text className="text-sm text-gray-600">{11 + " mins"}</Text>
            <Text className="mx-1 text-gray-400">•</Text>
            <Text className="text-sm text-gray-600">{item.rating}</Text>
            <Ionicons name="star" size={12} color="#FFB800" />
          </View>

          {/* Tag */}
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

      {/* Menu items */}
      {item?.foods.map((food: any) => (
        <Pressable
          key={food.foodId}
          className="flex-row items-center py-3 px-3 ml-[96px]"
          onPress={() =>
            router.push({
              pathname: "/home/food-detail",
              params: {
                id: food.foodId,
              },
            })
          }
        >
          {food.image ? (
            <Image
              source={{ uri: food.image }}
              className="w-16 h-16 rounded-lg"
            />
          ) : (
            <View className="w-16 h-16 rounded-lg bg-gray-200" />
          )}
          <View className="flex-1 ml-3">
            <Text className="text-base text-gray-800">{food.name}</Text>
            <Text className="text-base font-semibold text-gray-800 mt-1">
              ${food.price}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default FoodCartItem;
