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
  category?: Array<{ name: string; id: string }>;
  __v?: number;
}
interface ProductState {
  allProducts: Array<products> | null;
  product: products | null;
  loading: boolean;
  errors: any;
  favs: Object[];
  categorias: Array<{ name: string; id: string }> | null;
}
interface comp {
  id: string;
  status: string;
  links: Array<{ href: string; rel: string; method: string }>;
}
const initialState: ProductState = {
  allProducts: [],
  product: null,
  loading: false,
  errors: null,
  favs: [],
  categorias: [],
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
export const categorias = (): AppThunk => {
  return async (dispatch) => {
    try {
      const categorias = await axios.get(
        `http://localhost:5000/categories/all`
      );
      dispatch(getCaterogias(categorias.data));
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

export const comprar = (compra: object) => {
  return async () => {
    const response: any = await axios.post(
      "http://localhost:5000/payments/create-order",
      compra
    );

    window.location.href = `${response.data.links[1].href}`;
  };
};
//window.open(url, '_blank').focus();
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

    getCaterogias: (
      state,
      action: PayloadAction<Array<{ name: string; id: string }>>
    ) => {
      state.categorias = action.payload;
    },
  },
});

export default getAllProductsSlice.reducer;
export const {
  allProducts,
  filterByCaregory,
  detail,
  clearDetail,
  getCaterogias,
} = getAllProductsSlice.actions;
