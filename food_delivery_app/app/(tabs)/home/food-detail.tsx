import axiosInstance from "@/api/axiosInstance";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FoodDetailScreen() {
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [size, setSize] = useState<string>("");
  const [toppings, setToppings] = useState<string[]>([]);
  const [spiciness, setSpiciness] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);

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

        const res = await axiosInstance.get(`/api/favorites/${customerData.customerId}`);
        setFavorites(Array.isArray(res.data) ? res.data : []);
      } else {
        setCustomer(null);
      }
    } catch (error: any) {
      console.error("Error loading customer:", error.response?.data || error.message);
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!params.id) return;

    const fetchFoodDetail = async () => {
      try {
        setLoading(true);

        // Fetch food info
        const foodRes = await axiosInstance.get(`/api/foods/${params.id}`);
        setFood(foodRes.data);

        // Fetch food options
        const optionRes = await axiosInstance.get(`/api/food-options/food/${params.id}`);
        const optionData = optionRes.data;

        // Lọc trùng option (theo optionType + optionName)
        const uniqueOptions = Array.from(
          new Map(optionData.map((opt: any) => [`${opt.optionType}_${opt.optionName}`, opt])).values()
        );
        setOptions(uniqueOptions);

        // Gán giá trị mặc định (nếu có)
        const defaultSize = optionData.find((opt: any) => opt.optionType === "SIZE");
        if (defaultSize) setSize(defaultSize.optionName);

        const defaultSpicy = optionData.find((opt: any) => opt.optionType === "SPICINESS");
        if (defaultSpicy) setSpiciness(defaultSpicy.optionName);
      } catch (error: any) {
        console.error("Lỗi khi fetch dữ liệu:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetail();
  }, [params.id]);

  const isFavorite = favorites.some(
    (fav) => fav.food && fav.food.foodId === food.foodId
  );

  const handleAddFavorite = async () => {
    try {
      await axiosInstance.post(`/api/favorites/food/${customer.customerId}/${food.foodId}`);
      setFavorites([...favorites, { food }]);
    } catch (error: any) {
      console.error("Lỗi khi thêm yêu thích:", error.response?.data || error.message);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await axiosInstance.delete(`/api/favorites/food/${customer.customerId}/${food.foodId}`);
      setFavorites(favorites.filter((fav) => fav.food?.foodId !== food.foodId));
    } catch (error: any) {
      console.error("Lỗi khi xóa yêu thích:", error.response?.data || error.message);
    }
  };

  const toggleTopping = (topping: string) => {
    setToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  // === Tách nhóm option theo loại ===
  const sizeOptions = options.filter((o) => o.optionType === "SIZE");
  const toppingOptions = options.filter((o) => o.optionType === "TOPPING");
  const spicinessOptions = options.filter((o) => o.optionType === "SPICINESS");

  const calcTotal = () => {
    let total = food?.price || 0;

    const selectedSize = sizeOptions.find((s) => s.optionName === size);
    if (selectedSize) total += selectedSize.additionalPrice || 0;

    toppings.forEach((t) => {
      const topping = toppingOptions.find((tp) => tp.optionName === t);
      if (topping) total += topping.additionalPrice || 0;
    });

    return total * quantity;
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">Loading...</Text>
      </SafeAreaView>
    );
  }
  const handleAddToCart = async () => {
    if (!customer) {
      router.replace("/login");
      return;
    }

    try {
      // Chuẩn bị payload
      const payload = {
        foodId: food.foodId,
        quantity,
        // Nếu chọn size/spiciness là FoodOption thì lấy id
        selectedOptions: {
        size,
        spiciness,
        toppings
      }
    };

      // Gọi API backend
      await axiosInstance.post(`/api/carts/${customer.customerId}/items`, payload);

      // alert("Added to cart successfully!");
    } catch (error: any) {
      console.error("Lỗi khi thêm vào giỏ:", error.response?.data || error.message);
      // alert("Failed to add to cart!");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View className="relative">
          <Image
            source={{ uri: food?.image }}
            className="w-full h-48"
            resizeMode="cover"
          />
          <TouchableOpacity className="absolute top-0 left-4 bg-gray-800/50 rounded-full p-2">
            <Feather
              name="x"
              size={20}
              color="white"
              onPress={() => router.back()}
            />
          </TouchableOpacity>
        </View>

        {/* Favorite button */}
        <TouchableOpacity
          onPress={isFavorite ? handleRemoveFavorite : handleAddFavorite}
          className={`mx-auto p-2 mt-2 rounded-lg flex-row items-center gap-2 ${isFavorite ? "bg-gray-300" : "bg-red-500"
            }`}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={18}
            color={isFavorite ? "red" : "white"}
          />
          <Text className={`font-bold ${isFavorite ? "text-red-600" : "text-white"}`}>
            {isFavorite ? "Remove Favorite" : "Add to Favorite"}
          </Text>
        </TouchableOpacity>

        {/* Info */}
        <View className="p-4">
          <View className="flex-row justify-between mb-1">
            <Text className="text-2xl font-semibold text-gray-900">{food?.name}</Text>
            <View className="items-end">
              <Text className="text-lg font-semibold text-gray-900">${food?.price}</Text>
              <Text className="text-xs text-gray-400">Base price</Text>
            </View>
          </View>
          <Text className="text-gray-500 mb-6">{food?.description}</Text>

          {/* Size */}
          {sizeOptions.length > 0 && (
            <View className="mb-4">
              <Text className="font-semibold mb-1">
                Size <Text className="text-gray-400 text-xs">(Pick 1)</Text>
              </Text>
              {sizeOptions.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  className="flex-row justify-between items-center py-2 border-b border-gray-200"
                  onPress={() => setSize(s.optionName)}
                >
                  <Text className="text-gray-700">{s.optionName}</Text>
                  <View className="flex-row items-center">
                    {s.additionalPrice > 0 && <Text className="text-gray-400 mr-3">+${s.additionalPrice}</Text>}
                    <View className={`w-5 h-5 rounded-full border ${size === s.optionName ? "bg-cyan-500 border-cyan-500" : "border-gray-400"}`} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Topping */}
          {toppingOptions.length > 0 && (
            <View className="mb-4">
              <Text className="font-semibold mb-1">
                Topping <Text className="text-gray-400 text-xs">(Optional)</Text>
              </Text>
              {toppingOptions.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  className="flex-row justify-between items-center py-2 border-b border-gray-200"
                  onPress={() => toggleTopping(t.optionName)}
                >
                  <Text className="text-gray-700">{t.optionName}</Text>
                  <View className="flex-row items-center">
                    {t.additionalPrice > 0 && <Text className="text-gray-400 mr-3">+${t.additionalPrice}</Text>}
                    <View className={`w-5 h-5 rounded-md border justify-center items-center ${toppings.includes(t.optionName) ? "bg-cyan-500 border-cyan-500" : "border-gray-400"}`}>
                      {toppings.includes(t.optionName) && <Feather name="check" size={12} color="white" />}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Spiciness */}
          {spicinessOptions.length > 0 && (
            <View className="mb-4">
              <Text className="font-semibold mb-1">
                Spiciness <Text className="text-gray-400 text-xs">(Pick 1)</Text>
              </Text>
              {spicinessOptions.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  className="flex-row justify-between items-center py-2 border-b border-gray-200"
                  onPress={() => setSpiciness(s.optionName)}
                >
                  <Text className="text-gray-700">{s.optionName}</Text>
                  <View className={`w-5 h-5 rounded-full border ${spiciness === s.optionName ? "bg-cyan-500 border-cyan-500" : "border-gray-400"}`} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Note */}
          <Text className="font-semibold mb-1">Note for restaurant</Text>
          <TextInput
            placeholder="Special note"
            className="border border-gray-200 rounded-md p-2 mb-4 text-gray-700"
            multiline
          />
        </View>
      </ScrollView>

      {/* Quantity + Add to cart */}
      <View className="flex-row items-center justify-center mb-6">
        <TouchableOpacity
          className="w-8 h-8 bg-gray-100 justify-center items-center rounded"
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Text className="text-xl font-bold text-gray-600">−</Text>
        </TouchableOpacity>

        <Text className="mx-6 text-lg font-semibold">{quantity}</Text>

        <TouchableOpacity
          className="w-8 h-8 bg-cyan-500 justify-center items-center rounded"
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text className="text-xl font-bold text-white">+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-cyan-500 p-4 justify-center items-center"
        onPress={handleAddToCart}
      >
        <Text className="text-white font-semibold text-lg">
          Add to cart (${calcTotal()})
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
