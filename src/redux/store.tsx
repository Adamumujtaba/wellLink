import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import api from "./api/base";
import { AuthState, authSlice } from "./auth/authSlice";
import { symptomsReducer } from "./symptoms/symptomSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "symptoms"], // only auth and shop will be persisted
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  symptoms: symptomsReducer,
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = {
  auth: AuthState;
  [api.reducerPath]: ReturnType<typeof api.reducer>;
};

export type AppDispatch = typeof store.dispatch;
