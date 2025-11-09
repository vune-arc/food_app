import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

export default function OrderTracking() {
  const navigation = useNavigation<any>();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [address, setAddress] = useState<string>("Đang lấy địa chỉ...");

  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Lấy địa chỉ từ params hoặc AsyncStorage
  const googleMapsApiKey = "AIzaSyAIJAEwuK8zikpedN_s54X4JE4Dzc5rWhE"; //  YOUR ACTUAL KEY HERE

  const [region, setRegion] = useState<any>({
    latitude: 10.77653,
    longitude: 106.70098,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Ẩn tab bar khi vào trang này
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
      return () => {
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

  useEffect(() => {
    loadCustomer();
  }, []);

  useEffect(() => {
    if (!loading && !customer) {
      router.replace("/login");
    }
  }, [loading, customer]);

  const fetchAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}&language=vi`
      );
      const data = await response.json();
    } catch (error) {
      console.error("Lỗi lấy địa chỉ:", error);
      setAddress("Lỗi khi lấy địa chỉ");
    }
  };

  useEffect(() => {
    fetchAddressFromCoords(region.latitude, region.longitude);
  }, []);

  const loadCustomer = async () => {
    try {
      const stored = await AsyncStorage.getItem("customer");
      if (stored && stored !== "null") {
        const customerData = JSON.parse(stored);
        setCustomer(customerData);
        setAddress(customerData.address);
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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#06b6d4" />
        <Text className="mt-3 text-gray-600">Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center">
      {/* Bản đồ */}
      <View className="h-80 w-11/12 mt-5 rounded-2xl overflow-hidden shadow">
        <WebView
          originWhitelist={["*"]}
          source={{
            html: `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                          body, html { margin: 0; padding: 0; height: 100%; }
                          iframe { width: 100%; height: 100%; border: 0; }
                        </style>
                      </head>
                      <body>
                        <iframe
                          src="https://www.google.com/maps/embed/v1/view?key=${googleMapsApiKey}&center=${region.latitude},${region.longitude}&zoom=15"
                          allowfullscreen
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                      </body>
                    </html>
                  `,
          }}
          style={{ flex: 1 }}
        />
      </View>

      {/* Delivery Info */}
      <View className="w-11/12 mt-5 bg-white rounded-2xl p-5 shadow">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Delivery Tracking
        </Text>

        <View className="flex-row items-start mb-4">
          <View className="bg-cyan-50 rounded-full p-2 mr-3 mt-0.5">
            <Ionicons name="time-outline" size={18} color="#06b6d4" />
          </View>
          <View>
            <Text className="text-xs text-gray-400 mb-0.5">Delivery time</Text>
            <Text className="text-base font-semibold text-gray-900">
              15–20 mins
            </Text>
          </View>
        </View>

        <View className="flex-row items-start mb-3">
          <View className="bg-cyan-50 rounded-full p-2 mr-3 mt-0.5">
            <Ionicons name="location-sharp" size={18} color="#06b6d4" />
          </View>
          <View>
            <Text className="text-xs text-gray-400 mb-0.5">
              Delivery Address
            </Text>
            <Text className="text-base font-semibold text-gray-900">
              {address}
            </Text>
          </View>
        </View>

        <View className="h-px bg-gray-200 mt-3" />
      </View>

      {/* Driver Info */}
      <View className="absolute bottom-5 w-11/12 bg-white rounded-2xl p-4 flex-row justify-between items-center shadow-lg">
        <View className="flex-row items-center">
          <View className="bg-cyan-400 w-12 h-12 rounded-full justify-center items-center mr-3 shadow">
            <Text className="text-white text-lg font-bold">J</Text>
          </View>
          <View>
            <Text className="text-base font-bold text-gray-900">
              John Cooper
            </Text>
            <Text className="text-sm text-gray-400">Food Delivery</Text>
          </View>
        </View>

        <View className="flex-row space-x-3">
          <TouchableOpacity className="bg-cyan-50 rounded-full p-3" onPress={() => router.push("/(tabs)/inbox/call-driver")}>
            <Ionicons name="call" size={20} color="#06b6d4" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-cyan-50 rounded-full p-3" onPress={() => router.push("/(tabs)/inbox/chat-driver")}
          >
            <Ionicons name="chatbubbles" size={20} color="#06b6d4" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
