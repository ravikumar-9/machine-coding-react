import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("cart", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    console.log(response);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
