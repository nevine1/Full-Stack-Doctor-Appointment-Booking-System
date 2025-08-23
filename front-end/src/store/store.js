
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import storage from 'redux-persist/lib/storage'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() { return Promise.resolve(null); },
    setItem() { return Promise.resolve(null); },
    removeItem() { return Promise.resolve(); },
  };
};

const storageFallback = typeof window !== "undefined" ? storage : createNoopStorage();

const persistConfig = {
  key: "root",
  storage: storageFallback,
};

/* const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["users"],
} */

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // we should use serializableCheck  for redux-persist to work
    }),
})

export const persistor = persistStore(store)


