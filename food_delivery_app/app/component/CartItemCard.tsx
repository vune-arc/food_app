import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CartItem } from "../../types/cart";

interface Props {
  item: CartItem;
  onIncrease?: (id: number) => void;
  onDecrease?: (id: number) => void;
  onRemove?: (id: number) => void;
  selected?: boolean;
  onSelectChange?: (id: number, value: boolean) => void;
}

const CartItemCard: React.FC<Props> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  selected = false,
  onSelectChange,
}) => {
  return (
    <View className="flex-row items-center bg-white rounded-2xl p-3 mb-3 shadow-sm">
      {/* ✅ Checkbox */}
      <Checkbox
        value={selected}
        onValueChange={(value) => onSelectChange?.(item.cartItemId, value)}
        color={selected ? "#00BCD4" : undefined}
        style={{ marginRight: 8 }}
      />

      {/* 🖼 Hình ảnh */}
      <Image source={{ uri: item.food.image }} className="w-20 h-20 rounded-xl" />

      {/* 🧾 Thông tin */}
      <View className="flex-1 ml-3">
        <Text className="text-lg font-semibold">{item.food?.name}</Text>
        <Text className="text-cyan-600">
          ${item.food?.price ? item.food.price.toFixed(2) : "0.00"}
        </Text>

        {item.options && item.options.length > 0 && (
          <View className="mt-1">
            {item.options.map((opt, idx) => (
              <Text key={idx} className="text-gray-500 text-xs">
                • {opt.foodOption.optionType}: {opt.foodOption.optionName}
              </Text>
            ))}
          </View>
        )}

        {/* ➕➖ */}
        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            onPress={() => onDecrease?.(item.cartItemId)}
            className="bg-cyan-100 rounded-full p-1"
          >
            <Ionicons name="remove" size={18} color="#00BCD4" />
          </TouchableOpacity>

          <Text className="mx-3 text-base font-medium">{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => onIncrease?.(item.cartItemId)}
            className="bg-cyan-100 rounded-full p-1"
          >
            <Ionicons name="add" size={18} color="#00BCD4" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 💰 */}
      <View className="items-end">
        <Text className="text-cyan-800 font-bold">
          ${item.subTotal ? item.subTotal.toFixed(2) : "0.00"}
        </Text>
        <TouchableOpacity onPress={() => onRemove?.(item.cartItemId)} className="mt-2">
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={20}
            color="#E57373"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItemCard;
