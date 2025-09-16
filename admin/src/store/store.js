import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import adminReducer from './slices/adminSlice';
import appointmentsReducer from './slices/appointmentsSlice'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  admin: adminReducer,
  appointments: appointmentsReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // we should use serializableCheck  for redux-persist to work
    }),
})

export const persistor = persistStore(store)