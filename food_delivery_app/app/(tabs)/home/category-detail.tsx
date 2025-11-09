import axiosInstance from "@/api/axiosInstance";
import FoodCart from "@/app/component/foodcard";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "../../../global.css";
const tags = [
  { label: "Freeship", value: "FREESHIP" },
  { label: "Favorite", value: "FAVORITE" },
  { label: "Popular", value: "POPULAR" },
  { label: "Near you", value: "NEAR_YOU" },
  { label: "Healthy", value: "HEALTHY" }, // hoặc bỏ nếu backend chưa có "PARTNER"
];

export default function CategoryDetail() {
  const params = useLocalSearchParams();
  const [restaurants, setRestaurant] = useState<any[]>([]);
  const [filter, setFilter] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const title = params.title;

  const backendURL = "http://192.168.1.154:8085";
useEffect(() => {
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/restaurants/category/${params.id}`);
      setRestaurant(res.data);
    } catch (error: any) {
      console.error("Lỗi khi fetch dữ liệu:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchRestaurants();
}, []);

  const filterRestaurantByTags = useMemo(() => {
    if (filter.length === 0) return restaurants;
    return restaurants.filter((r) =>
      filter.every((tag) => r.tags.includes(tag))
    );
  }, [filter, restaurants]);

  const visibleRestaurants = showAll
    ? filterRestaurantByTags
    : filterRestaurantByTags.slice(0, 4);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#14b8a6" />
        <Text className="mt-3 text-gray-500">Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Custom Header */}
      <View className="flex-row items-center px-4 pt-[20px] pb-3 bg-white ">
        <TouchableOpacity onPress={() => router.back()} className="pr-4">
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">{title}</Text>
      </View>

      {/* Filter fixed */}
      <View className="px-4 pt-3 pb-2 bg-white">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          <Pressable
            onPress={() => setFilter([])}
            className={`px-7 py-1 rounded-full mr-2  ${
              filter.length === 0 ? "bg-cyan-100" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-sm ${
                filter.length === 0
                  ? "text-cyan-600 font-medium"
                  : "text-gray-500 font-medium"
              }`}
            >
              All
            </Text>
          </Pressable>
          {tags.map((t, index) => (
            <Pressable
              onPress={() =>
                setFilter((prev) =>
                  prev.includes(t.value)
                    ? prev.filter((i) => i !== t.value)
                    : [...prev, t.value]
                )
              }
              key={index}
              className={`px-3 py-1 rounded-full mr-2 ${
                filter.includes(t.value) ? "bg-cyan-100" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-sm ${
                  filter.includes(t.value)
                    ? "text-cyan-600 font-medium"
                    : "text-gray-500 font-medium"
                }`}
              >
                {t.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Content scrollable */}
      <ScrollView className="flex-1 px-4 mt-4">
        {/* Restaurant list */}
        {visibleRestaurants.map((item) => (
          <FoodCart key={item.restaurantId} item={item} />
        ))}

        {/* See all */}
        {!showAll && (
          <TouchableOpacity
            className="bg-cyan-100 py-3 rounded-xl mb-6"
            onPress={() => setShowAll(true)}
          >
            <Text className="text-center text-cyan-600 font-semibold">
              See all
            </Text>
          </TouchableOpacity>
        )}

        {/* Banner */}
        <View className="mb-6">
          <Image
            source={require("../../../assets/images/background-tasty.png")}
            style={{
              width: "100%",
              height: 120,
              borderRadius: 16,
              marginHorizontal: "auto",
            }}
          />
        </View>

        {/* Recommended */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Recommended for you</Text>
          <TouchableOpacity>
            <Text className="text-cyan-500">View all</Text>
          </TouchableOpacity>
        </View>
        {restaurants.map((item) => (
          <FoodCart key={item.restaurantId} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
