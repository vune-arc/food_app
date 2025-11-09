import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ModelEditProfile = ({
  isEditModalVisible,
  setIsEditModalVisible,
  setEditForm,
  handleUpdateProfile,
  editForm,
  handleUsernameChange,
}: any) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 h-5/6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-gray-800">
                Edit Profile
              </Text>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Username */}
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2 ml-1">
                  Username
                </Text>
                <View className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <TextInput
                    placeholder="Username"
                    value={editForm?.username}
                    onChangeText={handleUsernameChange}
                    className="text-gray-800 font-medium"
                  />
                </View>
              </View>
              {/* Avatar Input */}
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2 ml-1">
                  Avatar URL
                </Text>
                <View className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <TextInput
                    placeholder="https://example.com/avatar.jpg"
                    value={editForm?.avatar}
                    onChangeText={(text) =>
                      setEditForm({ ...editForm!, avatar: text })
                    }
                    className="text-gray-800"
                  />
                </View>
                {editForm?.avatar && (
                  <View className="mt-3 items-center">
                    <Image
                      source={{ uri: editForm.avatar }}
                      className="w-24 h-24 rounded-full"
                    />
                  </View>
                )}
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2 ml-1">
                  Email
                </Text>
                <View className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <TextInput
                    placeholder="Email"
                    value={editForm?.email}
                    onChangeText={(text) =>
                      setEditForm({ ...editForm!, email: text })
                    }
                    keyboardType="email-address"
                    className="text-gray-800"
                  />
                </View>
              </View>

              {/* Address */}
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2 ml-1">
                  Address
                </Text>
                <View className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <TextInput
                    placeholder="Address"
                    value={editForm?.address}
                    onChangeText={(text) =>
                      setEditForm({ ...editForm!, address: text })
                    }
                    className="text-gray-800"
                  />
                </View>
              </View>

              {/* Phone */}
              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2 ml-1">
                  Phone
                </Text>
                <View className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <TextInput
                    placeholder="Phone"
                    value={editForm?.phone}
                    onChangeText={(text) =>
                      setEditForm({ ...editForm!, phone: text })
                    }
                    keyboardType="phone-pad"
                    className="text-gray-800"
                  />
                </View>
              </View>

              {/* Save Button */}
              <TouchableOpacity
                onPress={handleUpdateProfile}
                className="bg-cyan-500 rounded-xl p-4 shadow-lg mb-4"
              >
                <Text className="text-white text-center font-bold text-lg">
                  Save Changes
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ModelEditProfile;
