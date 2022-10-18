import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  _id: string;
  name: string;  
  description: string;   
  price: number;     
  stock: number;
  categories: Array<string>
  image?: string;
}
interface ProductState {
  product: Product | null;
  loading: boolean;
  errors: any;
}
const initialState: ProductState = {
  product: null,
  loading: false,
  errors: null,
};


export const getProduct = createAsyncThunk(
  "product/getProductDetail",
  async (idProduct: string,thunkAPI) => {
    try {
      const producto = await axios.get(`http://localhost:5000/products/${idProduct}`);
      return producto.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productdetailSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductDetail: (state, action:PayloadAction<Product>)=>{
          state.product = action.payload;
           
    },
    clearProducDetail:(state)=>{
      Object.assign(state,initialState)
     
    } },
    extraReducers: (builder) => {
      builder.addCase(getProduct.pending, (state) => {
        state.loading = true;
      });
  
      builder.addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      });
  
      builder.addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    },


});


export const { getProductDetail, clearProducDetail} = productdetailSlice.actions

export default productdetailSlice.reducer;
