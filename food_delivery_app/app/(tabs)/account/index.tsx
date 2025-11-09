import ModelEditProfile from "@/app/component/model-edit-profile";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const backendURL = "http://192.168.1.154:8085";

interface Customer {
  customerId: number;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
}

interface Order {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  deliveryFee: number;
  promotionDiscount: number;
  paymentMethod: string;
  restaurant: {
    restaurantId: number;
    restaurantName: string;
  };
  orderDetails: OrderDetail[];
}

interface OrderDetail {
  id: number;
  quantity: number;
  unitPrice: number;
  food: {
    foodId: number;
    foodName: string;
    imageUrl: string;
  };
}

const Account = () => {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  // const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [editForm, setEditForm] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    loadCustomer();
  }, []);

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
        setEditForm(customerData);
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

  const loadOrders = async () => {
    if (!customer) return;

    setLoadingOrders(true);
    try {
      const res = await fetch(
        `${backendURL}/api/orders/customer/${customer.customerId}`
      );
      if (res.ok) {
        const data = await res.json();
        setOrders(
          data.sort(
            (a: Order, b: Order) =>
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          )
        );
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      Alert.alert("Error", "Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!editForm) return;

    if (
      !editForm.username ||
      !editForm.email ||
      !editForm.phone ||
      !editForm.address
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(
        `${backendURL}/api/customers/${customer?.customerId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        }
      );

      if (res.status === 409) {
        const msg = await res.text();
        Alert.alert("Error", msg || "Username already exists");
        return;
      }

      if (res.ok) {
        const updatedCustomer = await res.json();
        setCustomer(updatedCustomer);
        await AsyncStorage.setItem("customer", JSON.stringify(updatedCustomer));
        setIsEditModalVisible(false);
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Server error");
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("customer");
          setCustomer(null);
          router.replace("/login");
        },
      },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCustomer();
    if (customer) {
      await loadOrders();
    }
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "PREPARING":
        return "bg-purple-100 text-purple-700";
      case "ON_DELIVERY":
        return "bg-orange-100 text-orange-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  const handleUsernameChange = async (text: string) => {
    setEditForm({ ...editForm!, username: text });

    if (text.trim().length > 2) {
      const res = await fetch(`${backendURL}/api/customers/exists/${text}`);
      const exists = await res.json();
      if (exists && text !== customer?.username) {
        Alert.alert("Warning", "This username is already taken!");
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#06B6D4" />
      </SafeAreaView>
    );
  }

  if (!customer) return null;

  return (
    <LinearGradient
      colors={["#06b6d4", "#0891b2", "#0e7490"]}
      className="flex-1"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header với Gradient Effect */}
        <View className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-5 pt-5 mt-32 pb-24">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-3xl font-bold text-white">My Account</Text>
            <TouchableOpacity
              onPress={() => setIsEditModalVisible(true)}
              className="w-10 h-10 rounded-full bg-white/30 justify-center items-center"
            >
              <Ionicons name="pencil" size={25} color="blue" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Card */}
        <View className="-mt-20 px-5">
          <View className="bg-white rounded-3xl p-6 shadow-lg">
            {/* Avatar & Basic Info */}
            <View className="items-center mb-6">
              <View className="relative">
                <Image
                  source={{
                    uri: customer.avatar || "https://i.pravatar.cc/150?img=1",
                  }}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
                <View className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800 mt-4">
                {customer.username}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                ID: #{customer.customerId}
              </Text>
            </View>

            {/* Contact Info Grid */}
            <View className="space-y-3">
              <View className="flex-row items-center bg-cyan-50 p-4 rounded-xl">
                <View className="w-10 h-10 bg-cyan-100 rounded-full items-center justify-center">
                  <Ionicons name="mail" size={20} color="#06B6D4" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-xs text-gray-500 mb-1">Email</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {customer.email}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center bg-cyan-50 p-4 rounded-xl">
                <View className="w-10 h-10 bg-cyan-100 rounded-full items-center justify-center">
                  <Ionicons name="call" size={20} color="#06B6D4" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-xs text-gray-500 mb-1">Phone</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {customer.phone}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center bg-cyan-50 p-4 rounded-xl">
                <View className="w-10 h-10 bg-cyan-100 rounded-full items-center justify-center">
                  <Ionicons name="locate" size={20} color="#06B6D4" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-xs text-gray-500 mb-1">Address</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {customer.address}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Quick Actions
          </Text>

          {/* Settings */}
          <TouchableOpacity className="bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-center">
            <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center">
              <Ionicons name="settings" size={24} color="#A855F7" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-base font-semibold text-gray-800">
                Settings
              </Text>
              <Text className="text-sm text-gray-500">
                Preferences & privacy
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Help & Support */}
          <TouchableOpacity className="bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-center">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
              <Ionicons name="help-circle" size={24} color="#3B82F6" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-base font-semibold text-gray-800">
                Help & Support
              </Text>
              <Text className="text-sm text-gray-500">Get assistance</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View className="px-5 mt-6 mb-8">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-50 border border-red-200 rounded-2xl p-4 flex-row justify-center items-center"
          >
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
            <Text className="text-red-500 font-bold text-base ml-2">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <ModelEditProfile
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        setEditForm={setEditForm}
        handleUpdateProfile={handleUpdateProfile}
        editForm={editForm}
        handleUsernameChange={handleUsernameChange}
      />
    </LinearGradient>
  );
};

export default Account;
