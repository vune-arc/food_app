import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import axiosInstance from "../api/axiosInstance"; // import axios instance

interface Customer {
  customerId?: string;
  address: string;
  [key: string]: any;
}

export default function SelectLocation() {
  const router = useRouter();
  const [address, setAddress] = useState<string>("Đang lấy địa chỉ...");
  const [selectedType, setSelectedType] = useState<string>("Home");
  const [loading, setLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const backendURL = "http://192.168.1.154:8085";

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const stored = await AsyncStorage.getItem("customer");
      if (stored && stored !== "null") {
        const customerData: Customer = JSON.parse(stored);
        setCustomer(customerData);
        setAddress(customerData.address || "Đang lấy địa chỉ...");
      } else {
        setCustomer(null);
      }
    } catch (error) {
      console.error("Error loading customer:", error);
      setCustomer(null);
    }
  };

  const handleConfirm = async () => {
    if (!address || address === "Đang lấy địa chỉ..." || address === "Lỗi khi lấy địa chỉ") {
      Alert.alert("Thông báo", "Hãy chọn một vị trí hợp lệ.");
      return;
    }

    setLoading(true);
    try {
      if (customer) {
        const updatedCustomer: Customer = { ...customer, address };
        await AsyncStorage.setItem("customer", JSON.stringify(updatedCustomer));
      } else {
        await AsyncStorage.setItem("selectedAddress", address);
      }

      Alert.alert("Thành công", "Địa chỉ đã được lưu!");
      router.push({
        pathname: "/order-tracking",
        params: { address },
      });
    } catch (err) {
      console.error("Lỗi lưu địa chỉ:", err);
      Alert.alert("Lỗi", "Không thể lưu địa chỉ");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!customer?.customerId) return;

    setLoading(true);
    try {
      const res = await axiosInstance.put(`/api/customers/${customer.customerId}`, {
        ...customer,
        address,
      });

      const updatedCustomer: Customer = res.data;
      setIsEdit(false);
      setCustomer(updatedCustomer);
      await AsyncStorage.setItem("customer", JSON.stringify(updatedCustomer));
      Alert.alert("Success", "Address updated successfully!");
    } catch (err: any) {
      console.error("Update error:", err.response?.data || err.message);
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to update address"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-white">
        <WebView
          source={{
            uri: `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15`,
          }}
          style={{ flex: 1 }}
        />

        <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-5 shadow-lg">
          <Text className="text-lg font-semibold mb-2">Select location</Text>

          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 mb-3">
            <TextInput
              readOnly={!isEdit}
              className="flex-1 py-3 text-gray-800"
              value={address}
              onChangeText={setAddress}
              editable={true}
            />
            {isEdit ? (
              <Pressable onPress={handleSave}>
                <Text className="text-cyan-400">Save</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => setIsEdit(!isEdit)}>
                <Text className="text-cyan-400">Edit</Text>
              </Pressable>
            )}
          </View>

          <View className="flex-row justify-around mb-4">
            {["Home", "Work", "Other"].map((type) => (
              <TouchableOpacity
                key={type}
                className={`flex-row items-center justify-center px-5 py-2 rounded-full border ${
                  selectedType === type ? "bg-cyan-500 border-cyan-500" : "border-gray-400"
                }`}
                onPress={() => setSelectedType(type)}
              >
                <Text className={`${selectedType === type ? "text-white font-semibold" : "text-gray-700"}`}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            disabled={loading}
            className={`py-3 rounded-lg ${loading ? "bg-gray-400" : "bg-cyan-500"}`}
            onPress={handleConfirm}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-center text-white font-semibold text-lg">
                Confirm
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
