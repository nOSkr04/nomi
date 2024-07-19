import { persistor, store } from "@/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SWRConfig } from "swr";
const Layout = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SWRConfig>
          <GestureHandlerRootView style={styles.root}>
            <SafeAreaProvider>
              <BottomSheetModalProvider>
                <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="home/index"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="home/image"
                    options={{
                      headerShown: false,
                      animation: "fade",
                      presentation: "transparentModal",
                      fullScreenGestureEnabled: true,
                    }}
                  />
                </Stack>
              </BottomSheetModalProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
