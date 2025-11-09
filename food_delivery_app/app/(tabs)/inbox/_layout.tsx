import { Stack } from "expo-router";

export default function MyOrderLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Inbox",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chat-driver"
        options={{
          // title: "Order Review",
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
        name="call-driver"
        options={{
          // title: "Order Review",
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
      />
      
    </Stack>
    
    
  );
}
