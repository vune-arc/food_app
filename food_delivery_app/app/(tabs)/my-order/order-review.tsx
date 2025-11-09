import axiosInstance from "@/api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function OrderReviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Nhận danh sách các món đã chọn từ CartScreen
  const { items: initialItems } = route.params as { items: any[] };

  // State
  const [items, setItems] = useState(initialItems);
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // Load customer từ AsyncStorage
  const loadCustomer = async () => {
    try {
      const stored = await AsyncStorage.getItem("customer");
      if (stored && stored !== "null") {
        const customerData = JSON.parse(stored);
        setCustomer(customerData);
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

  useFocusEffect(
    useCallback(() => {
      loadCustomer();

      // Ẩn tab bar khi vào màn hình này
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });

      return () => {
        // Hiện lại tab bar khi rời màn hình
        navigation.getParent()?.setOptions({
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

  // Tăng / giảm số lượng món
  const increaseQty = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Tổng tiền
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2;
  const promotion = -3;
  const total = subtotal + deliveryFee + promotion;

  // Checkout order
  const handleCheckout = async () => {
    if (!customer) {
      Alert.alert("Error", "Customer not logged in!");
      return;
    }

    try {
      const payload = {
        customerId: customer.customerId,
        paymentMethod: "E-wallet",
        deliveryFee: deliveryFee,
        promotionDiscount: Math.abs(promotion),
        items: items.map(item => ({
          cartItemId: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await axiosInstance.post("/api/orders/checkout", payload);

      if (response.status === 201 || response.status === 200) {
        // Alert.alert("Success", "Order has been placed successfully!");
        router.push("/(tabs)/my-order")

      } else {
        Alert.alert("Error", "Failed to place order.");
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong!");
    }
  };

  // Gợi ý thêm món
  const alsoOrdered = [
    {
      name: "Sauté Chicken Rice",
      price: 15,
      image: "https://cdn-icons-png.flaticon.com/512/3480/3480690.png",
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Address */}
        <View className="mb-6">
          <Text className="text-gray-500 mb-1">Delivered to</Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-base font-medium">201 Katlian No.21 Street</Text>
              <Text className="text-gray-500">20 mins</Text>
            </View>
            <TouchableOpacity
            // onPress={() => router.push("/(tabs)/my-order/order-tracking")}
            >
              <Text className="text-cyan-500 font-medium">Change address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order details */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold">Order details</Text>
            <Text className="text-cyan-500">Add more</Text>
          </View>

          {items.map(item => (
            <View
              key={item.id}
              className="flex-row items-center justify-between py-3 border-b border-gray-100"
            >
              <Image source={{ uri: item.food.image }} className="w-14 h-14 rounded-xl mr-3" />
              <View className="flex-1">
                <Text className="font-semibold text-base">{item.food.name}</Text>
                {item.options && item.options.length > 0 && (
                  <View className="mt-1">
                    {item.options.map((opt: any) => (
                      <Text key={opt.id} className="text-gray-500 text-xs">
                        • {opt.foodOption.optionType}: {opt.foodOption.optionName}
                      </Text>
                    ))}
                  </View>
                )}
              </View>

              {/* Số lượng và subtotal */}
              <View className="flex-row items-center flex-col justify-end">
                <View className="flex-row items-center mb-1">
                  <TouchableOpacity
                    onPress={() => decreaseQty(item.id)}
                    className="bg-gray-200 rounded-md px-2 py-1"
                  >
                    <Text className="text-lg font-semibold">-</Text>
                  </TouchableOpacity>
                  <Text className="mx-2 font-semibold">{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQty(item.id)}
                    className="bg-cyan-400 rounded-md px-2 py-1"
                  >
                    <Text className="text-white text-lg font-semibold">+</Text>
                  </TouchableOpacity>
                </View>
                <Text className="text-gray-600 text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Also ordered */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Also ordered</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {alsoOrdered.map((food, i) => (
              <View
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-3 mr-3 w-36"
              >
                <Image source={{ uri: food.image }} className="w-full h-20 rounded-lg mb-2" />
                <Text className="font-medium">{food.name}</Text>
                <Text className="text-gray-500">${food.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Payment details */}
        <View className="border-t border-gray-200 pt-3">
          <Text className="text-lg font-semibold mb-3">Payment details</Text>
          <View className="flex-row justify-between py-2">
            <Text>Payment method</Text>
            <Text className="text-gray-600">E-wallet</Text>
          </View>
          <View className="flex-row justify-between py-2">
            <Text>Promotion</Text>
            <Text className="text-gray-600">-0% for bill over $50</Text>
          </View>
          <View className="flex-row justify-between py-1">
            <Text className="text-gray-500">Subtotal</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between py-1">
            <Text className="text-gray-500">Delivery fee</Text>
            <Text>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between py-1 mb-2">
            <Text className="text-gray-500">Promotion</Text>
            <Text>${promotion.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mt-2 mb-4">
            <Text className="text-lg font-semibold">Total</Text>
            <Text className="text-lg font-bold text-cyan-600">${total.toFixed(2)}</Text>
          </View>

          {/* Button chọn offer */}
          <TouchableOpacity
            className="bg-yellow-400 py-2 rounded-lg"
            onPress={() => router.push("/(tabs)/my-order/select-offer")}
          >
            <Text className="text-center font-semibold text-white">Choose Offer</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom button */}
      <View className="px-4 py-3 border-t border-gray-200 bg-white">
        <TouchableOpacity
          onPress={handleCheckout}
          className="bg-cyan-500 py-3 rounded-full"
        >
          <Text className="text-white text-center font-semibold text-lg">Order now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
