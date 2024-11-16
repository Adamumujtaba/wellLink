import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import { AuthState } from "./typings";

interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
}
export interface AuthState {
  user: User;
  success: boolean;
  token: string;
}
const initialState: AuthState = {
  user: { email: "", fullname: "", role: "", id: "" },
  token: "",
  success: false,
};

// Define the RootState type
interface RootState {
  auth: AuthState;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.success = action.payload.success;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = { email: "", fullname: "", role: "", id: "" };
      state.token = "";
      state.success = false;
      localStorage.clear();
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "success"],
};

const authReducer = authSlice.reducer;

export const useUserSlice = () => useSelector((state: RootState) => state.auth);

export default persistReducer(persistConfig, authReducer);
