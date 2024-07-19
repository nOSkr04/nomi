import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../interfaces/auth";
import { IUser } from "../interfaces/user";

const initialState: IAuth = {
  user : null,
  token: null,
};

const authSlice = createSlice({
  name    : "auth",
  initialState,
  reducers: {
    authLogin: (state, { payload }: { payload: IAuth }) => {
      state.token = payload.token;
      return state;
    },
    authLogout: (state) => {
      state.user = null;
      state.token = null;
      return state;
      
    },
    authMe: (state, { payload }: { payload: IUser}) => {
      state.user = payload;
      return state;
    }
  },
});

export const authReducer = authSlice.reducer;

export const { authLogin, authMe, authLogout } = authSlice.actions;