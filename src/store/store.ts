import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import desertReducer from './slices/desertSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    desert: desertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;