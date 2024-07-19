import { UserApi } from "@/src/apis";
import { IAuth } from "@/src/interfaces/auth";
import { IUser } from "@/src/interfaces/user";
import { authLogout, authMe } from "@/src/store/auth-slice";
import { Redirect, Stack } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

export default function AuthLayout() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: { auth: IAuth }) => state.auth);
  const { data } = useSWR<IUser>(
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

  if (data) {
    return <Redirect href={"/(home)"} />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
