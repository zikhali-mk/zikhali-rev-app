import { Stack } from "expo-router";

export default function TradeLayout() {
  return (
    <Stack>
      {/* Trade details page - HIDE HEADER */}
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}