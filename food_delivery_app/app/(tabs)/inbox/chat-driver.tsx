import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatDriver() {
  const navigation = useNavigation();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

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

  const messages = [
    {
      id: 1,
      sender: "driver",
      text: "Hi, the restaurant is quite busy now so the delivery may be late 15 mins. Please wait for me.",
      time: "12:03",
      avatar: "J",
    },
    {
      id: 2,
      sender: "user",
      text: "Sure! Thank you",
      time: "",
      hasAvatar: true,
    },
    {
      id: 3,
      sender: "user",
      text: "Could you please ask the restaurant to give me cutlery? I just need these items.",
      time: "",
      hasImage: true,
    },
    {
      id: 4,
      sender: "driver",
      text: "Yes, let me tell the restaurant.",
      time: "Just now",
      avatar: "J",
    },
  ];

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 10 }}
          >
            <Ionicons name="chevron-back" size={26} color="#333" />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#22d3ee",
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>J</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "600", color: "#111" }}>
              John Cooper
            </Text>
            <Text style={{ fontSize: 12, color: "#999" }}>Active now</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Feather name="video" size={22} color="#06b6d4" />
          <Feather name="phone" size={22} color="#06b6d4" />
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messages}
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.sender === "user" ? styles.userMessage : styles.driverMessage,
            ]}
          >
            {msg.sender === "driver" && (
              <View style={styles.avatar}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {msg.avatar}
                </Text>
              </View>
            )}
            <View style={{ maxWidth: "75%" }}>
              <View
                style={[
                  styles.bubble,
                  msg.sender === "user"
                    ? styles.userBubble
                    : styles.driverBubble,
                ]}
              >
                <Text style={{ fontSize: 14 }}>{msg.text}</Text>
              </View>
              {msg.hasImage && (
                <Image
                  source={{
                    uri: "https://placehold.co/150x100/f4c2c2/fff?text=Cutlery",
                  }}
                  style={styles.image}
                />
              )}
              {msg.time ? <Text style={styles.time}>{msg.time}</Text> : null}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputBar}>
        <TouchableOpacity>
          <FontAwesome name="smile-o" size={22} color="#06b6d4" />
        </TouchableOpacity>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          style={styles.textInput}
        />
        <TouchableOpacity>
          <Feather name="paperclip" size={20} color="#06b6d4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Feather name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  messages: { flex: 1, paddingHorizontal: 10 },
  messageRow: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "flex-end",
  },
  driverMessage: { justifyContent: "flex-start" },
  userMessage: { justifyContent: "flex-end" },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#22d3ee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  bubble: {
    borderRadius: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  driverBubble: { backgroundColor: "white" },
  userBubble: { backgroundColor: "#cffafe" },
  image: {
    marginTop: 6,
    borderRadius: 10,
    width: 150,
    height: 100,
  },
  time: { fontSize: 11, color: "#aaa", marginTop: 2 },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#06b6d4",
    padding: 10,
    borderRadius: 20,
  },
});
