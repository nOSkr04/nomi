import { UserApi } from "@/apis";
import { IAuth } from "@/interfaces/auth";
import { IUser } from "@/interfaces/user";
import { persistor, store } from "@/store";
import { authLogout, authMe } from "@/store/auth-slice";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, Navigator } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import useSWR, { SWRConfig } from "swr";

const Layout = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: { auth: IAuth }) => state.auth);
  const { data: user } = useSWR<IUser>(
    ["swr.user.me", token],
    async () => {
      return await UserApi.authMe();
    },
    {
      onSuccess: (authData) => {
        dispatch(authMe(authData));
      },
      onError: (err) => {
        if (err.error.code === 401) {
          dispatch(authLogout());
        }
      },
    }
  );
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SWRConfig>
          <GestureHandlerRootView style={styles.root}>
            <SafeAreaProvider>
              <BottomSheetModalProvider>
                <Navigator>
                  <Stack.Screen
                    name="home/index"
                    options={{ headerShown: false }}
                    redirect={!!user}
                  />
                  <Stack.Screen
                    name="home/image"
                    options={{
                      headerShown: false,
                      animation: "fade",
                      presentation: "transparentModal",
                      fullScreenGestureEnabled: true,
                    }}
                    redirect={!!user}
                  />
                  <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                    redirect={!user}
                  />
                </Navigator>
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
