import axiosInstance from "@/api/axiosInstance"; //  dùng axiosInstance
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import "../../global.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"ALL" | "FOOD" | "RESTAURANT">("ALL");
  const router = useRouter();

  const loadCustomer = async () => {
    try {
      const stored = await AsyncStorage.getItem("customer");
      if (stored && stored !== "null") {
        const customerData = JSON.parse(stored);
        setCustomer(customerData);

        const res = await axiosInstance.get(
          `/api/favorites/${customerData.customerId}`
        );
        setFavorites(Array.isArray(res.data) ? res.data : []);
      } else {
        setCustomer(null);
      }
    } catch (error) {
      console.error("Error loading customer:", error);
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomer();
  }, []);

  // Nếu chưa đăng nhập thì quay lại login
  useEffect(() => {
    if (!loading && !customer) {
      router.replace("/login");
    }
  }, [loading, customer]);

  const filteredFavorites = favorites.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "FOOD") return item.type === "FOOD";
    if (filter === "RESTAURANT") return item.type === "RESTAURANT";
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCustomer();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#14b8a6" />
        <Text className="mt-3 text-gray-500 text-base">
          Đang tải danh sách yêu thích...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-5 pt-[20px] pb-4 bg-white shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="pr-3">
          <Ionicons name="chevron-back" size={26} color="#14b8a6" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-gray-800">Yêu thích</Text>
      </View>

      {/* Filter Tabs */}
      <View className="flex-row justify-center mt-3 mb-1">
        {[
          { type: "ALL", icon: "heart", label: "Tất cả" },
          { type: "FOOD", icon: "fast-food", label: "Món ăn" },
          { type: "RESTAURANT", icon: "storefront", label: "Nhà hàng" },
        ].map((tab) => (
          <Pressable
            key={tab.type}
            onPress={() => setFilter(tab.type as any)}
            className={`flex-row items-center px-4 py-2 mx-2 rounded-full ${
              filter === tab.type ? "bg-cyan-500" : "bg-gray-200"
            }`}
          >
            <Ionicons
              name={tab.icon as any}
              size={16}
              color={filter === tab.type ? "#fff" : "#555"}
              style={{ marginRight: 5 }}
            />
            <Text
              className={`text-[14px] font-medium ${
                filter === tab.type ? "text-white" : "text-gray-700"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* List */}
      <ScrollView
        className="flex-1 px-4 mt-2"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((fav, index) => {
            const key = `${fav.type}-${index}`;
            const item = fav.type === "FOOD" ? fav.food : fav.restaurant;
            if (!item) return null;

            return (
              <Animated.View key={key}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="bg-white rounded-3xl shadow-md mb-4 overflow-hidden"
                  onPress={() => {
                    if (fav.type === "RESTAURANT")
                      router.push({
                        pathname: "/(tabs)/home/restaurant/[id]",
                        params: { id: item.restaurantId },
                      });
                    if (fav.type === "FOOD")
                      router.push({
                        pathname: "/home/food-detail",
                        params: { id: item.foodId },
                      });
                  }}
                >
                  <Image source={{ uri: item.image }} className="w-full h-44" />
                  <View className="absolute top-3 right-3 bg-white rounded-full p-2">
                    <Ionicons name="heart" size={20} color="#ef4444" />
                  </View>

                  <View className="p-4">
                    <Text className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </Text>

                    <Text className="text-gray-500 text-sm mt-1">
                      ⭐ {item.ratingTotal || item.rating}{" "}
                      {fav.type === "FOOD" && `• $${item.price}`}
                    </Text>

                    {item.description && (
                      <Text
                        className="text-gray-600 text-sm mt-1"
                        numberOfLines={2}
                      >
                        {item.description}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })
        ) : (
          <View className="flex-1 justify-center items-center mt-20">
            <Ionicons name="heart-outline" size={70} color="#ccc" />
            <Text className="mt-3 text-gray-500 text-base">
              Bạn chưa có sản phẩm yêu thích nào
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
