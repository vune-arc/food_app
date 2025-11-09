import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

const UserLogo = ({ loadCustomer, customer }: any) => {
  const router = useRouter();

  useEffect(() => {
    loadCustomer();
  }, []);

  return (
    <View className="flex-row items-center justify-between">
      <Pressable
        className="flex flex-row gap-1 items-center"
        onPress={() => router.push("/select-location")}
      >
        <Ionicons name="location-outline" size={30} color="white" />
        <Text className="text-white text-lg font-semibold">
          {customer?.address || "Home"}
        </Text>
      </Pressable>
      {/* Nút UserLogo */}
      <TouchableOpacity
        onPress={() => router.push(customer ? "/account" : "/login")}
        className="flex-row items-center bg-cyan-500 px-3 py-1 rounded-full"
      >
        <Ionicons
          name={customer ? "person-circle" : "person-circle-outline"}
          size={28}
          color="white"
        />
        <Text className="text-white font-semibold ml-1">
          {customer ? `Hi, ${customer.username}` : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserLogo;
