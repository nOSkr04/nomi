import { Stack } from "expo-router";

export default function DetailStack() {
  return (
    <Stack>
      <Stack.Screen name="[vid]" options={{ headerShown: false }} />
    </Stack>
  );
}
