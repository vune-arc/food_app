import axiosInstance from "@/api/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RestaurantDetail() {
  const params = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const router = useRouter();

  // Load thông tin khách hàng + danh sách yêu thích
  useEffect(() => {
    loadCustomer();
  }, []);

  // Nếu chưa đăng nhập thì quay lại login
  useEffect(() => {
    if (!loading && !customer) {
      router.replace("/login");
    }
  }, [loading, customer]);

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
    if (!params.id) return;

    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        // 1️⃣ Lấy thông tin nhà hàng
        const res = await axiosInstance.get(`/api/restaurants/${params.id}`);
        setRestaurant(res.data);

        // 2️⃣ Lấy món ăn
        const foodRes = await axiosInstance.get(
          `/api/foods/restaurant/${params.id}`
        );
        setFoodItems(foodRes.data);

        // 3️⃣ Lấy bình luận
        const commentRes = await axiosInstance.get(
          `/api/comments/restaurant/${params.id}`
        );
        setComments(commentRes.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [params.id]);

  const isFavorite = favorites.some(
    (fav) =>
      fav.restaurant && fav.restaurant.restaurantId === restaurant?.restaurantId
  );

  const handleAddFavorite = async () => {
    try {
      await axiosInstance.post(
        `/api/favorites/restaurant/${customer.customerId}/${restaurant.restaurantId}`
      );
      setFavorites([...favorites, { restaurant }]);
    } catch (error) {
      console.error("Lỗi khi thêm yêu thích:", error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await axiosInstance.delete(
        `/api/favorites/restaurant/${customer.customerId}/${restaurant.restaurantId}`
      );
      setFavorites(
        favorites.filter(
          (fav) => fav.restaurant?.restaurantId !== restaurant.restaurantId
        )
      );
    } catch (error) {
      console.error("Lỗi khi xóa yêu thích:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#14b8a6" />
        <Text className="mt-3 text-gray-500">Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">Không tìm thấy nhà hàng.</Text>
      </View>
    );
  }

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHour}${minutes > 0 ? `:${minutes}` : ""} ${period}`;
  };


  return (
    <View className="flex-1 bg-white">
      {/* Title */}
      <View className="relative">
        <Image
          source={{ uri: restaurant?.image }}
          className="w-full h-64"
          resizeMode="cover"
        />

        {/* View chứa khung trắng */}
        <View
          className="absolute p-3 flex flex-col bottom-[-70px] z-50 left-4 gap-2 bg-white mx-auto w-[90%] rounded-[10px]"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5, // hiệu ứng bóng cho Android
          }}
        >
          <View className="flex flex-row justify-center gap-2">
            {restaurant?.tags.map((t: any) => (
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
          <Text className="text-3xl font-bold mb-3 text-center">
            {restaurant?.name}
          </Text>
          <View className="flex-row items-center justify-center flex-wrap gap-x-4 gap-y-2 mb-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={18} color="#14b8a6" />
              <Text className="text-sm text-gray-600">
                {`${formatTime(restaurant?.openTime)} - ${formatTime(
                  restaurant?.closeTime
                )}`}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="location-outline" size={18} color="#14b8a6" />
              <Text className="text-sm text-gray-600">{2 + " km"}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="cash-outline" size={18} color="#14b8a6" />
              <Text className="text-sm text-gray-600">
                {restaurant?.priceRange}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={isFavorite ? handleRemoveFavorite : handleAddFavorite}
            className={`mx-auto p-2 rounded-lg flex-row items-center gap-2 ${
              isFavorite ? "bg-gray-300" : "bg-red-500"
            }`}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={18}
              color={isFavorite ? "red" : "white"}
            />
            <Text
              className={`font-bold ${
                isFavorite ? "text-red-600" : "text-white"
              }`}
            >
              {isFavorite ? "Remove Favorite" : "Add to Favorite"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Restaurant Name & Basic Info */}
        <View className="px-4 pt-4 pb-2 mt-[60px]">
          <TouchableOpacity className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={18} color="#facc15" />
              <Text className="text-sm font-semibold">
                {restaurant?.rating}
              </Text>
              <Text className="text-sm text-gray-500">
                {"(" + comments.length + " reviews)"}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View className="border border-gray-200 mx-4"></View>

        {/* Vouchers & Delivery */}
        <View className="px-4">
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center gap-3 flex-1">
              <Ionicons name="ticket-outline" size={22} color="#666" />
              <Text className="text-sm text-gray-700 flex-1">
                {restaurant?.vouchers || 2} discount voucher for restaurant
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          <View className="border border-gray-200"></View>
          <TouchableOpacity className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center gap-3 flex-1">
              <Ionicons name="bicycle-outline" size={22} color="#666" />
              <Text className="text-sm text-gray-700">
                Delivery on {restaurant?.deliveryTimeMin + " mins"}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="border border-gray-200 mx-4"></View>

        {/* For You Section */}
        <View className="px-4 py-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">For you</Text>
            <TouchableOpacity>
              <Text className="text-teal-600 text-sm">View all</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap justify-between">
            {foodItems &&
              foodItems.map((i: any) => (
                <Pressable
                  key={i.foodId}
                  className="w-[48%] bg-white rounded-2xl overflow-hidden mb-3 border border-gray-100"
                  onPress={() =>
                    router.push({
                      pathname: "/home/food-detail",
                      params: {
                        id: i.foodId,
                      },
                    })
                  }
                >
                  <Image
                    source={{ uri: i.image }}
                    className="w-full h-28"
                    resizeMode="cover"
                  />
                  <View className="p-3">
                    <Text
                      className="text-sm font-semibold mb-2"
                      numberOfLines={1}
                    >
                      {i.name}
                    </Text>
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center gap-1">
                        <Ionicons name="star" size={14} color="#facc15" />
                        <Text className="text-xs text-gray-600">
                          {i.ratingTotal} ({i?.reviews && 3})
                        </Text>
                      </View>
                      <Text className="text-base font-bold">${i.price}</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
          </View>
        </View>

        {/* Divider */}
        <View className="h-2 bg-gray-50" />

        {/* Menu Section */}
        <View className="px-4 py-4">
          <Text className="text-lg font-bold mb-4">Menu</Text>
          {foodItems.map((i: any) => (
            <Pressable
              key={i.foodId}
              className="flex-row gap-3 mb-4"
              onPress={() =>
                router.push({
                  pathname: "/home/food-detail",
                  params: {
                    id: i.foodId,
                  },
                })
              }
            >
              <Image
                source={{ uri: i.image }}
                className="w-24 h-24 rounded-2xl"
                resizeMode="cover"
              />
              <View className="flex-1 justify-between py-1">
                <View>
                  <Text className="text-base font-semibold mb-1">{i.name}</Text>
                  <Text className="text-xs text-gray-500 mb-2">
                    {i.description}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="star" size={14} color="#facc15" />
                    <Text className="text-xs text-gray-600">
                      {i.ratingTotal} ({i?.reviews || 2})
                    </Text>
                  </View>
                  <Text className="text-base font-bold">${i.price}</Text>
                </View>
              </View>
            </Pressable>
          ))}
          <TouchableOpacity className="bg-teal-50 py-3 rounded-xl items-center mt-2">
            <Text className="text-teal-600 font-semibold">See all</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="h-2 bg-gray-50" />

        {/* Reviews Section */}
        <View className="py-4">
          <View className="flex-row justify-between items-center mb-4 px-4">
            <Text className="text-lg font-bold">Reviews</Text>
            <TouchableOpacity>
              <Text className="text-teal-600 text-sm">View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {comments &&
              comments.map((review: any) => (
                <View
                  key={review.id}
                  className="w-72 bg-gray-50 rounded-2xl p-4 mr-3"
                >
                  <View className="flex-row items-center gap-3 mb-3">
                    <Image
                      source={{
                        uri:
                          review?.customer?.avatar ||
                          "https://i.pravatar.cc/150?img=1",
                      }}
                      className="w-12 h-12 rounded-full"
                    />
                    <View className="flex-1">
                      <Text className="text-sm font-semibold mb-1">
                        {review.customer.username}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {review.dateComment}
                      </Text>
                    </View>
                    <View className="flex-row gap-0.5">
                      {[...Array(Math.floor(review.rating))].map((_, i) => (
                        <Ionicons
                          key={i}
                          name={
                            i < Math.floor(review.rating)
                              ? "star"
                              : "star-outline"
                          }
                          size={14}
                          color="#facc15"
                        />
                      ))}
                    </View>
                  </View>
                  <Text className="text-sm text-gray-700 leading-5">
                    {review.title}
                  </Text>
                </View>
              ))}
          </ScrollView>
        </View>

        {/* Divider */}
        <View className="h-2 bg-gray-50" />

        {/* Combo Section */}
        <View className="px-4 py-4 pb-24">
          <Text className="text-lg font-bold mb-4">Combo</Text>
          {foodItems.map((combo: any) => (
            <Pressable
              key={combo.foodId}
              className="flex-row gap-3 mb-4"
              onPress={() =>
                router.push({
                  pathname: "/home/food-detail",
                  params: {
                    id: combo.foodId,
                  },
                })
              }
            >
              <Image
                source={{ uri: combo.image }}
                className="w-24 h-24 rounded-2xl"
                resizeMode="cover"
              />
              <View className="flex-1 justify-between py-1">
                <View>
                  <Text className="text-base font-semibold mb-1">
                    {combo.name}
                  </Text>
                  <Text className="text-xs text-gray-500 mb-2">
                    {combo.description}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="star" size={14} color="#facc15" />
                    <Text className="text-xs text-gray-600">
                      {combo.ratingTotal} ({combo?.reviews || 4})
                    </Text>
                  </View>
                  <Text className="text-base font-bold">${combo.price}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
