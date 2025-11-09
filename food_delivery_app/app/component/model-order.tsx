{
  /* Orders Modal */
}
{
  /* <Modal
        visible={isOrderModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 h-5/6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-gray-800">
                My Orders
              </Text>
              <TouchableOpacity
                onPress={() => setIsOrderModalVisible(false)}
                className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {loadingOrders ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#06B6D4" />
              </View>
            ) : orders.length === 0 ? (
              <View className="flex-1 justify-center items-center">
                <Ionicons name="receipt-outline" size={80} color="#D1D5DB" />
                <Text className="text-gray-500 mt-4 text-lg">
                  No orders yet
                </Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {orders.map((order) => (
                  <View
                    key={order.orderId}
                    className="bg-gray-50 rounded-2xl p-4 mb-4"
                  >
                 
                    <View className="flex-row justify-between items-center mb-3">
                      <View>
                        <Text className="text-sm text-gray-500">
                          Order #{order.orderId}
                        </Text>
                        <Text className="text-xs text-gray-400 mt-1">
                          {formatDate(order.orderDate)}
                        </Text>
                      </View>
                      <View
                        className={`px-3 py-1 rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <Text className="text-xs font-semibold">
                          {order.status}
                        </Text>
                      </View>
                    </View>

                 
                    <View className="flex-row items-center mb-3">
                      <Ionicons name="restaurant" size={16} color="#06B6D4" />
                      <Text className="text-sm font-medium text-gray-700 ml-2">
                        {order.restaurant.restaurantName}
                      </Text>
                    </View>

                  
                    <View className="border-t border-gray-200 pt-3 mb-3">
                      {order.orderDetails.map((detail) => (
                        <View
                          key={detail.id}
                          className="flex-row items-center mb-2"
                        >
                          <Image
                            source={{ uri: detail.food.imageUrl }}
                            className="w-12 h-12 rounded-lg"
                          />
                          <View className="ml-3 flex-1">
                            <Text className="text-sm font-medium text-gray-800">
                              {detail.food.foodName}
                            </Text>
                            <Text className="text-xs text-gray-500">
                              x{detail.quantity}
                            </Text>
                          </View>
                          <Text className="text-sm font-semibold text-cyan-600">
                            {formatCurrency(detail.unitPrice * detail.quantity)}
                          </Text>
                        </View>
                      ))}
                    </View>
                    <View className="border-t border-gray-200 pt-3">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-base font-bold text-gray-800">
                          Total Amount
                        </Text>
                        <Text className="text-lg font-bold text-cyan-600">
                          {formatCurrency(order.totalAmount)}
                        </Text>
                      </View>
                      {order.promotionDiscount > 0 && (
                        <Text className="text-xs text-green-600 mt-1">
                          Saved {formatCurrency(order.promotionDiscount)}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal> */
  {
    /* My Orders Button */
  }
  {
    /* <TouchableOpacity
            onPress={() => {
              loadOrders();
              setIsOrderModalVisible(true);
            }}
            className="bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-center"
          >
            <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center">
              <Ionicons name="receipt" size={24} color="#F97316" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-base font-semibold text-gray-800">
                My Orders
              </Text>
              <Text className="text-sm text-gray-500">View order history</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity> */
  }
}
