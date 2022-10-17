import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface products {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  available: boolean;
  favorite: boolean;
  category: Array<any>;
  __v: number;
}
interface ProductState {
  allProducts: Array<products> | null;
  loading: boolean;
  errors: any;
}
const initialState: ProductState = {
  allProducts: [],
  loading: false,
  errors: null,
};

//action
export const fetchAllProducts = createAsyncThunk<products[]>(
  "allProducts/getAllProducts",
  async (_, thunkAPI) => {
    try {
      const productos = await axios.get("http://localhost:5000/products/all");
      return productos.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//reducer
export const getAllProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    setProductState: (state, action: PayloadAction<products[]>) => {
      state.allProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
    });

    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export default getAllProductsSlice.reducer;
export const { setProductState } = getAllProductsSlice.actions;
