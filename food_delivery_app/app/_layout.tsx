import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="select-location" options={{ headerShown: false }} />
        <Stack.Screen name="looking-driver" options={{ headerShown: false }} />
        <Stack.Screen
          name="feedback-driver"
          options={{ headerShown: true, title: "Rating" }}
        />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
