import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type InboxRoute = 
  | "/(tabs)/inbox/chat-driver"
  | "/(tabs)/inbox/call-driver";

const chats: { 
  id: string;
  type: "chat" | "call";
  title: string;
  description: string;
  icon: string;
  route: InboxRoute;
}[] = [
  {
    id: "1",
    type: "chat",
    title: "Chat driver",
    description: "Nhắn tin trực tiếp với tài xế",
    icon: "chatbubble-ellipses-outline",
    route: "/(tabs)/inbox/chat-driver",
  },
  {
    id: "2",
    type: "call",
    title: "Call driver",
    description: "Gọi trực tiếp tài xế",
    icon: "call-outline",
    route: "/(tabs)/inbox/call-driver",
  },
];


export default function MyInbox() {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof chats[0] }) => (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-xl p-4 mb-3 shadow-md"
      onPress={() => router.push(item.route)}
    >
      <View className="bg-cyan-100 p-3 rounded-full mr-4">
        <Ionicons name={item.icon as any} size={24} color="#00BCD4" />
      </View>
      <View className="flex-1">
        <Text className="font-semibold text-lg">{item.title}</Text>
        <Text className="text-gray-500 text-sm">{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Inbox</Text>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
