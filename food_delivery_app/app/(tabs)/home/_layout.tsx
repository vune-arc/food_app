import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="category-detail"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
          },
          headerTintColor: "#000",
          headerTitleAlign: "left",
        }}
      />

      <Stack.Screen
        name="food-detail"
        options={{
          title: "Food",
          headerShown: false,
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
          },
          headerTintColor: "#000", // icon back màu đen
        }}
      />
      <Stack.Screen name="restaurant/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="food-listing" options={{ headerShown: false }} />
    </Stack>
  );
}
