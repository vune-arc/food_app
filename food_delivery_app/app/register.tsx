import { Ionicons } from "@expo/vector-icons";
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
import axiosInstance from "../api/axiosInstance"; // import axios instance

export default function RegisterScreen({ navigation }: any) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!form.username || !form.password || !form.email || !form.phone) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/register", form);

      Alert.alert("Success", "Account created successfully!");
      router.push("/login");
    } catch (err: any) {
      console.error("Register error:", err.response?.data || err.message);
      if (err.response?.status === 400) {
        Alert.alert("Error", err.response.data || "Username already exists");
      } else {
        Alert.alert("Error", "Server error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    {
      key: "username",
      label: "Username",
      icon: <Ionicons name="person-outline" size={20} color="black" />,
      placeholder: "Choose a username",
    },
    {
      key: "password",
      label: "Password",
      icon: <Ionicons name="lock-closed-outline" size={20} color="black" />,
      placeholder: "Create a strong password",
    },
    {
      key: "email",
      label: "Email",
      icon: <Ionicons name="mail-outline" size={20} color="black" />,
      placeholder: "your@email.com",
    },
    {
      key: "phone",
      label: "Phone",
      icon: <Ionicons name="call-outline" size={20} color="black" />,
      placeholder: "Your phone number",
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <LinearGradient
        colors={["#0891b2", "#06b6d4", "#22d3ee"]}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-8 py-7">
            {/* Header Section */}
            <View className="mb-8">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-white/20 rounded-full w-10 h-10 items-center justify-center mb-6"
              >
                <Text className="text-white text-xl">←</Text>
              </TouchableOpacity>
              <View className="bg-white/20 rounded-full w-20 h-20 items-center justify-center mb-4 self-center">
                <Text className="text-5xl">✨</Text>
              </View>
              <Text className="text-4xl font-bold text-white text-center mb-2">
                Create Account
              </Text>
              <Text className="text-cyan-50 text-center text-base">
                Join us today!
              </Text>
            </View>

            {/* Form Section */}
            <View className="bg-white rounded-3xl p-6 shadow-2xl">
              {inputFields.map((field) => (
                <View key={field.key} className="mb-4">
                  <View className="flex-row items-center mb-2 ml-1">
                    <Text className="text-lg mr-2">{field.icon}</Text>
                    <Text className="text-gray-700 font-semibold">
                      {field.label}
                    </Text>
                  </View>
                  <View className="bg-gray-50 rounded-xl border border-gray-200">
                    <TextInput
                      placeholder={field.placeholder}
                      placeholderTextColor="#9CA3AF"
                      className="p-4 text-gray-800"
                      secureTextEntry={field.key === "password"}
                      value={(form as any)[field.key]}
                      onChangeText={(v) =>
                        setForm({ ...form, [field.key]: v })
                      }
                      autoCapitalize={
                        field.key === "email" ? "none" : "sentences"
                      }
                      keyboardType={
                        field.key === "email"
                          ? "email-address"
                          : field.key === "phone"
                          ? "phone-pad"
                          : "default"
                      }
                    />
                  </View>
                </View>
              ))}

              {/* Register Button */}
              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading}
                className={`rounded-xl p-4 mt-2 shadow-lg ${
                  isLoading ? "bg-gray-400" : "bg-cyan-500"
                }`}
                activeOpacity={0.8}
              >
                <Text className="text-white text-center font-bold text-lg">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <TouchableOpacity
                onPress={() => router.push("/login")}
                className="mt-6"
              >
                <Text className="text-gray-600 text-center">
                  Already have an account?{" "}
                  <Text className="text-cyan-600 font-semibold">Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
