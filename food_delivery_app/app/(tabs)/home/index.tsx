import axiosInstance from "@/api/axiosInstance";
import BannerCarousel from "@/app/component/BannerCarousel";
import UserLogo from "@/app/component/userlogo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const categories = [
  { id: 1, name: "Rice", icon: "bowl-mix-outline" },
  { id: 2, name: "Healthy", icon: "leaf-outline" },
  { id: 3, name: "Drink", icon: "glass-cocktail" },
  { id: 4, name: "Fastfood", icon: "food-outline" },
  { id: 5, name: "Snack", icon: "cookie-outline" },
];

const collections = [
  {
    title: "FREESHIP",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "DEAL $1",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "NEAR YOU",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
];

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [customer, setCustomer] = useState<any>(null);
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const fetchData = async () => {
    try {
      const [resRestaurant, resFood] = await Promise.all([
        axiosInstance.get("/api/restaurants"),
        axiosInstance.get("/api/foods"),
      ]);

      setRestaurants(resRestaurant.data);
      setFoods(resFood.data);
    } catch (error: any) {
      console.error("Error fetching data:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  const loadCustomer = async () => {
    try {
      const stored = await AsyncStorage.getItem("customer");
      if (stored && stored !== "null") {
        const customerData = JSON.parse(stored);
        setCustomer(customerData);

        // fetch cart
        const res = await axiosInstance.get(`/api/carts/${customerData.customerId}`);
        setCart(res.data);

        // tính tổng số lượng
        const total = res.data.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;
        setTotalQuantity(total);

      } else {
        setCustomer(null);
        setCart(null);
        setTotalQuantity(0);
      }
    } catch (error) {
      console.error("Error loading customer/cart:", error);
      setCustomer(null);
      setCart(null);
      setTotalQuantity(0);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCustomer();
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header cố định */}
      <View className="absolute top-0 left-0 right-0 bg-cyan-500 px-4 pt-5 pb-4 z-10 mb-5">
        <UserLogo loadCustomer={loadCustomer} customer={customer} />

        {/* Search + Cart */}
        <View className="flex-row items-center mt-4">
          {/* Search Box */}
          <View className="flex-1 flex-row bg-white rounded-full px-3 py-2 items-center">
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              placeholder="Search restaurants..."
              className="flex-1 ml-2 text-gray-700"
            />
          </View>

          {/* Cart Button */}
          <Pressable
            style={{ position: "relative" }}
            className="ml-3 bg-cyan-600 p-3 rounded-full"
            onPress={() => router.push("/(tabs)/my-order/CartScreen")}
          >
            <Ionicons name="cart" size={24} color="white" />
            {totalQuantity > 0 && (
              <View
                style={{ position: "absolute", top: -4, right: -4, width: 20, height: 20, borderRadius: 10, backgroundColor: "red", alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>{totalQuantity}</Text>
              </View>
            )}
          </Pressable>

        </View>
      </View>


      {/* Scrollable content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 120, paddingBottom: 50 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Banner */}
        <BannerCarousel />

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16, paddingHorizontal: 16 }}>
          {categories.map((c) => (
            <View key={c.id} style={{ alignItems: "center", marginRight: 24 }}>
              <Pressable
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: "#cffafe",
                  borderRadius: 28,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 4,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/home/category-detail",
                    params: { id: c.id, title: c.name },
                  })
                }
              >
                <MaterialCommunityIcons name={c.icon as any} size={26} color="#00BCD4" />
              </Pressable>
              <Text style={{ fontSize: 12 }}>{c.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Vouchers */}
        <View style={{ backgroundColor: "#e0f2fe", paddingVertical: 12, marginTop: 16, marginHorizontal: 16, borderRadius: 12, alignItems: "center" }}>
          <Text style={{ color: "#06b6d4", fontWeight: "500" }}>0 vouchers</Text>
        </View>

        {/* Collections */}
        <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
          <Text style={{ fontWeight: "600", fontSize: 18, marginBottom: 12 }}>Collections</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {collections.map((item, i) => (
              <View key={i} style={{ backgroundColor: "#f3f4f6", width: "48%", height: 80, borderRadius: 12, marginBottom: 12, justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ position: "absolute", width: "100%", height: "100%", borderRadius: 12, opacity: 0.7 }}
                />
                <View style={{ position: "absolute", backgroundColor: "rgba(255,255,255,0.7)", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}>
                  <Text style={{ fontWeight: "500", color: "#374151" }}>{item.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recommended */}
        <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>Recommended for you</Text>
            <Text style={{ color: "#06b6d4" }}>View all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {restaurants.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  width: 192,
                  marginRight: 16,
                  borderRadius: 24,
                  padding: 12,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/home/restaurant/[id]",
                    params: { id: item.restaurantId },
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: "100%", height: 112, borderRadius: 16, marginBottom: 8 }}
                />
                <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>
                  ⭐ {item.rating} • ${item.priceRange}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ marginTop: 24, paddingHorizontal: 16, marginBottom: 32 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>Combo Deals</Text>
            <Text style={{ color: "#06b6d4" }}>View all</Text>
          </View>

          {/* Combo List */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {foods.map((combo) => (
              <TouchableOpacity
                key={combo.id}
                style={{
                  backgroundColor: "#fff",
                  width: 192,
                  marginRight: 16,
                  borderRadius: 24,
                  padding: 12,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/home/food-detail",
                    params: { id: combo.foodId },
                  })
                }
              >
                <Image
                  source={{ uri: combo.image }}
                  style={{ width: "100%", height: 112, borderRadius: 16, marginBottom: 8 }}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontWeight: "600" }}>{combo.name}</Text>
                  <Text style={{ color: "#06b6d4", fontWeight: "700" }}>${combo.price}</Text>
                </View>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>
                  ⭐ {combo.ratingTotal} • {combo.reviews || 10} reviews
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#06b6d4",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
    zIndex: 10,
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 8,
  },
});
