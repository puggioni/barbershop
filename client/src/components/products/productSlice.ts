import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface products {
  _id: string;
  image: string;
  rating: number;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  available: boolean;
  favorite?: boolean;
  category?: Array<any>;
  __v?: number;
}
interface ProductState {
  allProducts: Array<products> | null;
  loading: boolean;
  errors: any;
  favs: Object[];
}
const initialState: ProductState = {
  allProducts: [],
  loading: false,
  errors: null,
  favs: [],
};

//action

export const fetchAllProducts = (tosearch: string): AppThunk => {
  return async (dispatch) => {
    
    if(!tosearch){
    try {
      const productos = await axios.get("http://localhost:5000/products/all");
      dispatch(allProducts(productos.data));
    } catch (error) {
      return error;
    }
  }else{
    try {
      const productos = await axios.get("http://localhost:5000/products/search?name="+tosearch);
      dispatch(allProducts(productos.data));
    } catch (error) {
      return error;
    }
  }
  }
};
  
export const addFavoriteProduct = (productoFav: products): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:5000/", productoFav); // agregar url de back
      return res;
    } catch (error) {
      return error;
    }
  };
};

//reducer
export const getAllProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    allProducts: (state, action: PayloadAction<products[]>) => {
      state.allProducts = action.payload;
      state.loading = false;
    },
  },
});

export default getAllProductsSlice.reducer;
export const { allProducts } = getAllProductsSlice.actions;
