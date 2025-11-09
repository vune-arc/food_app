import { Stack } from "expo-router";

export default function MyOrderLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "My Orders",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="order-review"
        options={{
          title: "Order Review",
          headerShown: true,
          headerStyle: { backgroundColor: "#00BCD4" },
          headerTitleStyle: {
            color: "#fff",
            fontSize: 18,
            fontWeight: "600",
          },
          headerTintColor: "#fff",
          
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="order-tracking"
        options={{
          title: "Order Tracking",
          headerShown: true,
          headerStyle: { backgroundColor: "#00BCD4" },
          headerTitleStyle: {
            color: "#fff",
            fontSize: 18,
            fontWeight: "600",
          },
          headerTintColor: "#fff",
          
          presentation: "modal",
        }}
      />
      {/* <Stack.Screen
        name="select-offer"
        options={{
          title: "select-offer",
          headerShown: false,
          headerStyle: { backgroundColor: "#00BCD4" },
          headerTitleStyle: {
            color: "#fff",
            fontSize: 18,
            fontWeight: "600",
          },
          headerTintColor: "#fff",
          
          presentation: "modal",
        }}
      /> */}
      <Stack.Screen
        name="CartScreen"
        options={{
          title: "CartScreen",
          headerShown: true,
          headerStyle: { backgroundColor: "#00BCD4" },
          headerTitleStyle: {
            color: "#fff",
            fontSize: 18,
            fontWeight: "600",
          },
          headerTintColor: "#fff",
          
          presentation: "modal",
        }}
      />
    </Stack>
    
    
    
  );
}
