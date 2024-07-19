import { Stack } from "expo-router";

const ProtectLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default ProtectLayout;
