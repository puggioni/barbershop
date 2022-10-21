import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reviews?: Array<any>;
  __v?: number;
}
interface ProductState {
  allProducts: Array<products> | null;
  product: products | null;
  loading: boolean;
  errors: any;
  favs: Object[];
}
const initialState: ProductState = {
  allProducts: [],
  product: null,
  loading: false,
  errors: null,
  favs: [],
};

//==========action==================
export const fetchAllProducts = (tosearch: string): AppThunk => {
  return async (dispatch) => {
    if (!tosearch) {
      try {
        const productos = await axios.get("http://localhost:5000/products/all");
        dispatch(allProducts(productos.data));
      } catch (error) {
        return error;
      }
    } else {
      try {
        const productos = await axios.get(
          "http://localhost:5000/products/search?name=" + tosearch
        );
        console.log(productos.data);
        dispatch(allProducts(productos.data));
      } catch (error) {
        return error;
      }
    }
  };
};

export const addFavoriteProduct = (productoFav: products): AppThunk => {
  return async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/products/",
        productoFav
      ); // agregar url de back
      return res;
    } catch (error) {
      return error;
    }
  };
};

export const filter = (categoria: string): AppThunk => {
  return async (dispatch) => {
    try {
      const product = await axios.get(
        `http://localhost:5000/products/filter/${categoria}`
      );
      dispatch(filterByCaregory(product.data));
    } catch (error) {
      return error;
    }
  };
};

export const productDetail = (idProduct: string): AppThunk => {
  return async (dispatch) => {
    try {
      const producto = await axios.get(
        `http://localhost:5000/products/${idProduct}`
      );
      dispatch(detail(producto.data));
    } catch (error) {
      return error;
    }
  };
};

export const clearProducDetail: any = () => {
  return (dispatch: any) => {
    dispatch(clearDetail());
  };
};

//================reducer===================
export const getAllProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    allProducts: (state, action: PayloadAction<products[]>) => {
      state.allProducts = action.payload;
      state.loading = false;
    },

    filterByCaregory: (state, action: PayloadAction<products[]>) => {
      state.allProducts = action.payload;
      state.loading = false;
    },

    detail: (state, action: PayloadAction<products>) => {
      state.product = action.payload;
      state.loading = false;
    },

    clearDetail: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export default getAllProductsSlice.reducer;
export const { allProducts, filterByCaregory, detail, clearDetail } =
  getAllProductsSlice.actions;
