import axiosInstance from "@/api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Cart } from "../../../types/cart";
import CartItemCard from "../../component/CartItemCard";
const CartScreen: React.FC = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [customer, setCustomer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const navigation = useNavigation<any>();
    // ⚙️ Load thông tin customer từ AsyncStorage
    const loadCustomer = async () => {
        try {
            const stored = await AsyncStorage.getItem("customer");
            if (stored && stored !== "null") {
                const customerData = JSON.parse(stored);
                setCustomer(customerData);
                await fetchCart(customerData.customerId);
            } else {
                setCustomer(null);
                setCart(null);
            }
        } catch (error) {
            console.error("Error loading customer:", error);
            setCustomer(null);
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    // ⚙️ Gọi API lấy giỏ hàng
    const fetchCart = async (customerId: number) => {
        try {
            const response = await axiosInstance.get<Cart>(
                `/api/carts/${customerId}`
            );
            setCart(response.data);
            setSelectedItems([]); // reset khi reload
        } catch (error) {
            console.error("Error loading cart:", error);
            setCart(null);
        }
    };

    useEffect(() => {
        loadCustomer();
    }, []);

    // 🔁 Tự refresh khi quay lại màn hình
    useFocusEffect(
        useCallback(() => {
            if (customer) {
                fetchCart(customer.customerId);
            }
        }, [customer])
    );

    // 📦 Các hành động trên giỏ hàng
    const handleIncrease = async (id: number) => {
        try {
            await axiosInstance.put(`/api/carts/item/${id}/increase`);
            if (customer) fetchCart(customer.customerId);
        } catch (err) {
            console.error("Increase item error:", err);
        }
    };

    const handleDecrease = async (id: number) => {
        try {
            await axiosInstance.put(`/api/carts/item/${id}/decrease`);
            if (customer) fetchCart(customer.customerId);
        } catch (err) {
            console.error("Decrease item error:", err);
        }
    };

    const handleRemove = async (id: number) => {
        try {
            await axiosInstance.delete(`/api/carts/item/${id}`);
            if (customer) fetchCart(customer.customerId);
        } catch (err) {
            console.error("Remove item error:", err);
        }
    };

    // ✅ Chọn / bỏ chọn từng món
    const handleSelectChange = (id: number, value: boolean) => {
        setSelectedItems((prev) =>
            value ? [...prev, id] : prev.filter((i) => i !== id)
        );
    };

    //  Chọn tất cả
    const toggleSelectAll = () => {
        if (!cart) return;
        if (selectedItems.length === cart.cartItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart.cartItems.map((item) => item.cartItemId));
        }
    };

    //  Tính tổng tiền của các món được chọn
    const selectedTotal =
        cart?.cartItems
            .filter((item) => selectedItems.includes(item.cartItemId))
            .reduce((sum, item) => sum + (item.subTotal || 0), 0) || 0;

    //  Vuốt xuống để refresh
    const onRefresh = async () => {
        if (!customer) return;
        setRefreshing(true);
        await fetchCart(customer.customerId);
        setRefreshing(false);
    };

    //  Hiển thị loading
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#EAFBFF]">
                <ActivityIndicator size="large" color="#00BCD4" />
            </View>
        );
    }
    //  Nếu chưa đăng nhập
    if (!customer) {
        return (
            <View className="flex-1 justify-center items-center bg-[#EAFBFF]">
                <Text className="text-gray-500 text-lg">
                    Please log in to view your cart 🔐
                </Text>
            </View>
        );
    }

    // Giỏ hàng trống
    if (!cart || cart.cartItems.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-[#EAFBFF]">
                <Text className="text-gray-500 text-lg">Your cart is empty 🛒</Text>
            </View>
        );
    }

    //  Giao diện chính
    return (
        <View className="flex-1 bg-[#EAFBFF] p-4">
            <View className="flex-row items-center justify-between mb-3">
                <Text className="text-2xl font-bold text-cyan-800">My Cart</Text>

                {/* 🔘 Nút chọn tất cả */}
                <TouchableOpacity
                    className="flex-row items-center"
                    onPress={toggleSelectAll}
                >
                    <Checkbox
                        value={selectedItems.length === cart.cartItems.length}
                        onValueChange={toggleSelectAll}
                        color={
                            selectedItems.length === cart.cartItems.length
                                ? "#00BCD4"
                                : undefined
                        }
                    />
                    <Text className="ml-2 text-cyan-700 font-medium">Select All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={cart.cartItems}
                keyExtractor={(item) => item.cartItemId.toString()}
                renderItem={({ item }) => (
                    <CartItemCard
                        item={item}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        onRemove={handleRemove}
                        selected={selectedItems.includes(item.cartItemId)}
                        onSelectChange={handleSelectChange}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 120 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />

            {/* Footer */}
            <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 flex-row justify-between items-center shadow-lg">
                <Text className="text-lg font-bold text-cyan-700">
                    Total: ${selectedTotal.toFixed(2)}
                </Text>
                <TouchableOpacity
                    disabled={selectedItems.length === 0}
                    className={`rounded-2xl px-6 py-3 ${selectedItems.length > 0 ? "bg-cyan-500" : "bg-gray-300"
                        }`}
                    onPress={() => {
                        if (!cart) return;

                        const itemsToOrder = cart.cartItems
                            .filter(item => selectedItems.includes(item.cartItemId))
                            .map(item => ({
                                ...item,
                                price: item.subTotal / item.quantity, // giá 1 món đã tính option
                                id: item.cartItemId,                  // dùng id duy nhất cho cart item
                            }));

                        navigation.navigate("order-review", { items: itemsToOrder });
                    }}

                >
                    <Text className="text-white font-semibold text-base">Checkout</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default CartScreen;
