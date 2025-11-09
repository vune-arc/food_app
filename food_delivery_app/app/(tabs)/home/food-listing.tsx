import axiosInstance from "@/api/axiosInstance";
import FoodCartItem from "@/app/component/foodcard-item";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const tags = [
  { label: "Freeship", value: "FREESHIP" },
  { label: "Favorite", value: "FAVORITE" },
  { label: "Popular", value: "POPULAR" },
  { label: "Near you", value: "NEAR_YOU" },
  { label: "Healthy", value: "HEALTHY" },
];

export default function RestaurantList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurant] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchRestaurants = async () => {
        try {
          if (search.trim() === "") return;

          const res = await axiosInstance.get(
            `/api/restaurants/search?keyword=${search}`
          );

          setRestaurant(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
          console.error("Error fetching:", error);
        }
      };

      fetchRestaurants();
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  // Lọc theo search + filter
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const nameMatch = r.name.toLowerCase().includes(search.toLowerCase());
      const descMatch = r.description
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchSearch = nameMatch || descMatch;

      const matchFilter =
        selectedFilter.length === 0 ||
        selectedFilter.every((tag) => r.tags.includes(tag));

      return matchSearch && matchFilter;
    });
  }, [search, selectedFilter, restaurants]);

  return (
    <View className="flex-1 bg-white">
      {/* Header với thanh tìm kiếm */}
      <View className="px-4 pt-12 pb-3 bg-white border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#666" />
          </Pressable>
          <TextInput
            placeholder="Search here..."
            value={search}
            onChangeText={setSearch}
            className="flex-1 ml-2 text-gray-800 text-base"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
          <TouchableOpacity className="ml-2">
            <Ionicons name="options-outline" size={24} color="#00BCD4" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter buttons */}
      <View className="px-4 pt-3 pb-2 border-b border-gray-100 bg-white">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {/* Nút All */}
          <Pressable
            onPress={() => setSelectedFilter([])}
            className={`px-7 py-1 rounded-full mr-2 ${
              selectedFilter.length === 0 ? "bg-cyan-100" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-sm ${
                selectedFilter.length === 0
                  ? "text-cyan-600 font-medium"
                  : "text-gray-500 font-medium"
              }`}
            >
              All
            </Text>
          </Pressable>

          {/* Các filter */}
          {tags.map((t, index) => (
            <Pressable
              key={index}
              onPress={() =>
                setSelectedFilter((prev) =>
                  prev.includes(t.value)
                    ? prev.filter((i) => i !== t.value)
                    : [...prev, t.value]
                )
              }
              className={`px-3 py-1 rounded-full mr-2 ${
                selectedFilter.includes(t.value) ? "bg-cyan-100" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-sm ${
                  selectedFilter.includes(t.value)
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

      {/* Số kết quả */}
      <View className="px-4 py-3 bg-white">
        <Text className="text-gray-600 text-sm">
          {filteredRestaurants.length} results for &apos;{search}&apos;
        </Text>
      </View>

      {/* Danh sách nhà hàng */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((item) => (
            <FoodCartItem key={item.restaurantId} item={item} />
          ))
        ) : (
          <Text className="text-center text-gray-500 mt-10">
            No restaurants found 😕
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
