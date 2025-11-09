import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axiosInstance from "../api/axiosInstance";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      // Gửi request login
      const res = await axiosInstance.post("/api/auth/login", {
        username,
        password,
      });

      const user = res.data;

      // Lấy chi tiết customer
      const detailRes = await axiosInstance.get(
        `/api/customers/username/${user.username}`
      );

      const customerData = detailRes.data;

      // Lưu vào AsyncStorage
      await AsyncStorage.setItem("customer", JSON.stringify(customerData));

      Alert.alert("Success", "Login successful!");
      router.replace("/(tabs)/home");
    } catch (err) {
      Alert.alert("Error", "Invalid username or password");
      console.error("❌ Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <LinearGradient colors={["#06b6d4", "#0891b2", "#0e7490"]} className="flex-1">
        <TouchableOpacity
          onPress={() => router.replace("/home")}
          activeOpacity={0.7}
          className="absolute top-5 left-6 bg-white/20 rounded-full p-2 z-10"
        >
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="mt-[100px]"
        >
          <View className="flex-1 justify-center px-8 py-12">
            <View className="mb-12">
              <View className="bg-white/20 rounded-full w-20 h-20 items-center justify-center mb-6 self-center">
                <Text className="text-5xl">🔐</Text>
              </View>
              <Text className="text-4xl font-bold text-white text-center mb-2">
                Welcome Back
              </Text>
              <Text className="text-cyan-50 text-center text-base">
                Sign in to continue
              </Text>
            </View>

            <View className="bg-white rounded-3xl p-6 shadow-2xl">
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2 ml-1">
                  Username
                </Text>
                <View className="bg-gray-50 rounded-xl border border-gray-200">
                  <TextInput
                    placeholder="Enter your username"
                    placeholderTextColor="#9CA3AF"
                    className="p-4 text-gray-800"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2 ml-1">
                  Password
                </Text>
                <View className="bg-gray-50 rounded-xl border border-gray-200">
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    className="p-4 text-gray-800"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className={`rounded-xl p-4 shadow-lg ${
                  isLoading ? "bg-gray-400" : "bg-cyan-500"
                }`}
                activeOpacity={0.8}
              >
                <Text className="text-white text-center font-bold text-lg">
                  {isLoading ? "Logging in..." : "Login"}
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="px-4 text-gray-500 text-sm">OR</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              <TouchableOpacity
                onPress={() => router.push("/register")}
                className="bg-cyan-50 rounded-xl p-4 border border-cyan-200"
                activeOpacity={0.7}
              >
                <Text className="text-cyan-600 text-center font-semibold">
                  Create New Account
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-cyan-50 text-center mt-8 text-sm">
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
