import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./features/cartreducer";

export const reduxstore=configureStore({
    reducer:{
        products:productsReducer.reducer
    }
});

export type RootState=ReturnType<typeof reduxstore.getState>;
export type AppDispatch=typeof reduxstore.dispatch;