import axiosInstance from "@/api/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Types
type CartItemOption = {
  id: number;
  foodOption: {
    optionName: string;
    optionType: string;
    additionalPrice: number;
  };
};

type CartItem = {
  cartItemId: number;
  quantity: number;
  subTotal: number;
  food: {
    name: string;
    image: string;
  };
  options: CartItemOption[];
};

type OrderDetail = {
  id: number;
  quantity: number;
  unitPrice: number;
  cartItem: CartItem;
};

type Order = {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  orderDetails: OrderDetail[];
};

export default function MyOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const loadOrders = async () => {
    try {
      setLoading(true);
      const storedCustomer = await AsyncStorage.getItem("customer");
      if (storedCustomer) {
        const customer = JSON.parse(storedCustomer);
        const res = await axiosInstance.get(`/api/orders/customer/${customer.customerId}`);
        // 🔹 Sắp xếp theo orderId giảm dần
        const sortedOrders = res.data.sort((a: Order, b: Order) => b.orderId - a.orderId);
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };


  // 🔹 Tự động load lại khi màn hình focus
  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#06b6d4" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 text-lg">No orders found</Text>
      </View>
    );
  }

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
      <View className="flex-row justify-between mb-2">
        <Text className="font-semibold text-lg">Order #{item.orderId}</Text>
        <Text className="text-gray-500">
          {new Date(item.orderDate).toLocaleDateString()}
        </Text>
      </View>
      <Text className="text-gray-500 mb-2">Status: {item.status}</Text>

      {item.orderDetails.map((detail) => (
        <View key={detail.id} className="flex-row items-center mb-2">
          <Image
            source={{ uri: detail.cartItem.food.image }}
            className="w-16 h-16 rounded-lg mr-3"
          />
          <View className="flex-1">
            <Text className="font-medium">{detail.cartItem.food.name}</Text>
            {detail.cartItem.options.map((opt) => (
              <Text key={opt.id} className="text-gray-500 text-sm">
                • {opt.foodOption.optionType}: {opt.foodOption.optionName}
              </Text>
            ))}
          </View>
          <View className="items-end">
            <Text className="text-gray-600">{detail.quantity} x ${detail.unitPrice.toFixed(2)}</Text>
            <Text className="font-semibold">
              ${(detail.unitPrice * detail.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      ))}

      <View className="border-t border-gray-200 mt-2 pt-2 flex-row justify-between">
        <Text className="font-semibold">Total:</Text>
        <Text className="font-bold text-cyan-600">${item.totalAmount.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        className="mt-2 bg-cyan-500 py-2 rounded-lg"
        onPress={() => router.push("/(tabs)/my-order/order-tracking")}
      >
        <Text className="text-white text-center font-semibold">View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View
        className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200"
        style={{ backgroundColor: "#00BCD4" }}
      >
        <Text className="text-xl font-bold text-white">My Orders</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/my-order/CartScreen")}>
          <Ionicons name="cart-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item, index) => (item?.orderId ? item.orderId.toString() : index.toString())}
        renderItem={renderOrderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}
