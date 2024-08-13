import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './CartSlice';
import authSlice from './authSlice';
export const store = configureStore({
    reducer: {
        auth: authSlice ,
        cart: cartSlice
    },
})