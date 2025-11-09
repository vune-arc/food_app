import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function CallScreen() {
  const navigation = useNavigation();
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
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  // Tăng giây mỗi giây
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      {/* Tên và thời gian */}
      <Text className="text-lg font-semibold text-gray-900 mb-1">Driver</Text>
      <Text className="text-gray-500 mb-6">{formatTime(seconds)}</Text>

      {/* Avatar */}
      <View className="w-24 h-24 bg-cyan-500 rounded-full justify-center items-center mb-10">
        <Feather name="user" size={40} color="white" />
      </View>

      {/* Nút điều khiển */}
      <View className="flex-row justify-between w-2/3 mb-10">
        <TouchableOpacity
          className={`items-center ${isSpeakerOn ? "opacity-100" : "opacity-70"}`}
          onPress={() => setIsSpeakerOn(!isSpeakerOn)}
        >
          <Feather name="volume-2" size={28} color="gray" />
          <Text className="text-gray-500 mt-1">Speaker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`items-center ${isMuted ? "opacity-100" : "opacity-70"}`}
          onPress={() => setIsMuted(!isMuted)}
        >
          <Feather name="mic-off" size={28} color="gray" />
          <Text className="text-gray-500 mt-1">Mute</Text>
        </TouchableOpacity>
      </View>

      {/* End Call */}
      <TouchableOpacity className="bg-red-500 p-4 rounded-full" onPress={() => router.back()}>
        <MaterialIcons name="call-end" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
