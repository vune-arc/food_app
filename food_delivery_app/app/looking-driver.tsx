import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

const LookingDriver = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Nội dung chính */}
      <View className="flex-1 items-center justify-start mt-[80px] px-6">
        {/* Biểu tượng xác nhận */}
        <Ionicons name="checkmark-circle-outline" size={48} color="#3B82F6" />
        <Text className="text-gray-600 text-[16px] mt-3">Order confirmed</Text>

        {/* Tiêu đề */}
        <Text className="text-2xl font-bold text-gray-900 mt-6">
          Looking for driver
        </Text>

        {/* Hình kính lúp */}
        <View className="mt-12 mb-8">
          <View className="w-40 h-40 rounded-full bg-white items-center justify-center">
            <Ionicons name="search" size={120} color="#06B6D4" />
          </View>
        </View>

        {/* Thanh tiến trình */}
        <View className="w-full mb-8">
          {/* Dòng chấm + line */}
          <View className="flex-row items-center justify-between px-4 mb-2">
            {[
              { active: true },
              { active: true },
              { active: false },
              { active: false },
              { active: false },
            ].map((step, index, arr) => (
              <React.Fragment key={index}>
                <View
                  className={`w-4 h-4 rounded-full ${
                    step.active ? "bg-cyan-500" : "bg-gray-200"
                  }`}
                />
                {index < arr.length - 1 && (
                  <View
                    className={`flex-1 h-[2px] mx-1 ${
                      arr[index + 1].active && step.active
                        ? "bg-cyan-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Nhãn tên bước */}
          <View className="flex-row justify-between px-2">
            {[
              "Confirm\norder",
              "Look for\ndriver",
              "Prepare\nfood",
              "Deliver",
              "Arrived",
            ].map((label, index) => (
              <Text
                key={index}
                className={`text-xs text-center ${
                  index <= 1 ? "text-gray-600" : "text-gray-400"
                }`}
                style={{ width: 60 }}
              >
                {label}
              </Text>
            ))}
          </View>
        </View>

        {/* Nút bấm */}
        <View className="w-full">
          <TouchableOpacity className="w-full py-4 border border-cyan-500 rounded-lg mb-4">
            <Text className="text-cyan-500 text-center font-semibold text-base">
              Need help?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-center py-2">
            <Ionicons name="close" size={18} color="#9CA3AF" />
            <Text className="text-gray-400 text-base ml-2">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LookingDriver;
