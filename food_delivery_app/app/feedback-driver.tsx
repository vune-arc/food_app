import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const tagsData = [
  "Service",
  "Supportive",
  "Friendly",
  "Delivery",
  "Contactless",
];

export default function FeedBackToDriver() {
  const [rating, setRating] = useState(4);
  const [tags, setTags] = useState<string[]>([
    "Service",
    "Friendly",
    "Delivery",
  ]);
  const [comment, setComment] = useState("");

  const toggleTag = (tagN: string) => {
    setTags((prev) =>
      tags.includes(tagN) ? prev.filter((tag) => tag !== tagN) : [...prev, tagN]
    );
  };

  return (
    <View className="flex-1 justify-between bg-white p-8">
      {/* User Circle */}
      <View>
        <View className="w-[120px] h-[120px] mt-[40px] rounded-full bg-cyan-500 items-center justify-center mx-auto mb-6">
          <Ionicons name="person-outline" size={70} color="white" />
        </View>

        {/* Rate John Cooper */}
        <Text className="text-center text-[20px] font-semibold mb-3">
          Rate John Cooper
        </Text>

        {/* Stars */}
        <View className="flex-row justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              className="mx-1"
            >
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={28}
                color={star <= rating ? "#FACC15" : "#D1D5DB"} // Yellow and gray
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tags */}
        <Text className="text-gray-400 text-center text-[18px] mt-[30px]">
          Leave your feedback here
        </Text>
        <View className="flex-row flex-wrap mt-[30px] justify-center mb-7">
          {tagsData.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => toggleTag(tag)}
              className={`flex-row items-center px-4 py-1 rounded-full mr-3 mb-3 ${
                tags.includes(tag) ? "bg-cyan-100 " : "bg-gray-100 "
              }`}
            >
              <Ionicons
                name="checkmark-sharp"
                size={20}
                color={tags.includes(tag) ? "#06b6d4" : "#6b7280"}
              />
              <Text
                className={`${
                  tags.includes(tag) ? "text-cyan-500" : "text-gray-500"
                }`}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback input */}
        <Text className="text-gray-600 mt-[30px] text-[16px] font-bold mb-1">
          Care to share more?
        </Text>
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="Leave feedback about driver..."
          placeholderTextColor="#9CA3AF"
          value={comment}
          onChangeText={setComment}
          className="bg-gray-100 rounded-lg p-3 mb-7 min-h-[100px] text-gray-800 text-base"
          style={{ textAlignVertical: "top" }}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-cyan-500 rounded-lg py-3"
        activeOpacity={0.8}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
