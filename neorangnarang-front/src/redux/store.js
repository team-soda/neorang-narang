import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import authReducer from "./user/slice/authSlice";
import userReducer from "./user/slice/userSlice";
import reviewReducer from "./user/slice/reviewSlice";
import modalReducer from "./common/slice/modalSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    user: userReducer,
    review: reviewReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
