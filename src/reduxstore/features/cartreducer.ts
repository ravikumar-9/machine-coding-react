import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../actions";

interface initialStateType {
  products: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: initialStateType = {
  products: [],
  isLoading: false,
  error: null,
};

export const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchProducts.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.products=action.payload
    })
    .addCase(fetchProducts.rejected,(state,action)=>{
        state.error=action.payload
    })
  },
});

export default productsReducer.reducer;
