import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import axios from "axios";
import { AppThunk } from "../../app/store";
import Products from "../products/Products";

export interface products {
  _id: string;
  image: string;
  rating?: number;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  available?: boolean;
  favorite?: boolean;
  userFavorite?: boolean;
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
  categorias: Array<{ name: string; id: string }> | null;

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
        const productos = await axios.get(
          "https://barbershop-roan.vercel.app/products/all"
        );
        dispatch(allProducts(productos.data));
      } catch (error) {
        return error;
      }
    } else {
      try {
        const productos = await axios.get(
          "https://barbershop-roan.vercel.app/products/search?name=" + tosearch
        );
        dispatch(allProducts(productos.data));
      } catch (error) {
        return error;
      }
    }
  };
};

export const addFavoriteProduct = (
  idProduct: string,
  IdUser: string,
  token: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "https://barbershop-roan.vercel.app/products/addFavorite",
        { product: { _id: idProduct }, user: { _id: IdUser } },
        { headers: { token: token } }
      );
      console.log(res.data);
      dispatch(setFavorites(res.data));

      return res;
    } catch (error) {
      return error;
    }
  };
};
export const deleteFavoriteProduct = (
  idProduct: string,
  IdUser: string,
  token: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "https://barbershop-roan.vercel.app/products/removeFavorite",
        { product: { _id: idProduct }, user: { _id: IdUser } },
        { headers: { token: token } }
      );
      console.log(res.data);
      dispatch(setFavorites(res.data));

      return res;
    } catch (error) {
      return error;
    }
  };
};

export const getFavoritesProducts = (
  IdUser: string,
  token: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://barbershop-roan.vercel.app/products/favorites/" + IdUser,
        { headers: { token: token } }
      );
      dispatch(setFavorites(res.data));
      return res;
    } catch (error) {
      return error;
    }
  };
};

export const filter = (categoria: string): AppThunk => {
  return async (dispatch) => {
    try {
      console.log(categoria);
      const product = await axios.get(
        `https://barbershop-roan.vercel.app/products/filter/${categoria}`
      );
      dispatch(filterByCaregory(product.data));
    } catch (error) {
      return error;
    }
  };
};

export const orderByName = (): AppThunk => {
  return async (dispatch) => {
    try {
      const ordered = await axios.get(
        "https://barbershop-roan.vercel.app/products/all"
      );
      dispatch(sortProductsByName(ordered.data));
    } catch (error) {
      return error;
    }
  };
};
export const orderByPrice = (): AppThunk => {
  return async (dispatch) => {
    try {
      const ordered = await axios.get(
        "https://barbershop-roan.vercel.app/products/all"
      );
      dispatch(sortProductsByPrice(ordered.data));
    } catch (error) {
      return error;
    }
  };
};

export const categorias = (): AppThunk => {
  return async (dispatch) => {
    try {
      const categorias = await axios.get(
        `https://barbershop-roan.vercel.app/categories/all`
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
        `https://barbershop-roan.vercel.app/products/${idProduct}`
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
      "https://barbershop-roan.vercel.app/payments/create-order",
      compra
    );

    window.location.href = `${response.data.links[1].href}`;
  };
};
//window.open(url, '_blank').focus();

export const reviewProduct = (review: object, config: object): AppThunk => {
  return async (dispatch) => {
    try {
      const producto = await axios.post(
        `https://barbershop-roan.vercel.app/reviews/create`,
        review,
        config
      );
      dispatch(productDetail(producto.data._id));
    } catch (error) {
      console.log(error);
      return error;
    }
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

    sortProductsByName: (state, action: PayloadAction<string>) => {
      const arrays: any = state.allProducts;
      let sortedArray =
        action.payload === "name-asc"
          ? arrays.sort(function (a: any, b: any) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          : arrays.sort(function (a: any, b: any) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      state.allProducts = sortedArray;
      state.loading = false;
    },

    sortProductsByPrice: (state, action: PayloadAction<string>) => {
      const arrays: any = state.allProducts;
      let sortedArray =
        action.payload === "barato"
          ? arrays.sort(function (a: any, b: any) {
              if (a.price < b.price) {
                return -1;
              }
              if (a.price > b.price) {
                return 1;
              }
              return 0;
            })
          : arrays.sort(function (a: any, b: any) {
              if (a.price > b.price) {
                return -1;
              }
              if (b.price > a.price) {
                return 1;
              }
              return 0;
            });

      state.allProducts = sortedArray;
      state.loading = false;
    },

    detail: (state, action: PayloadAction<products>) => {
      state.product = action.payload;
      state.loading = false;
    },

    clearDetail: (state) => {
      state.product = null;
    },

    getCaterogias: (
      state,
      action: PayloadAction<Array<{ name: string; id: string }>>
    ) => {
      state.categorias = action.payload;
    },

    setFavorites: (state, action: PayloadAction<Array<products>>) => {
      state.favs = action.payload;
    },
    addFavoritoLocal: (state, action: PayloadAction<products>) => {
      state.favs.push(action.payload);
      window.localStorage.setItem("favoritos", JSON.stringify(state.favs));
    },
    deleteFavoritoLocal: (state, action: PayloadAction<string>) => {
      const idx = state.favs.findIndex((p: any) => p._id === action.payload);
      let aux = state.favs;
      aux.splice(idx, 1);
      state.favs = aux;
      window.localStorage.setItem("favoritos", JSON.stringify(state.favs));
    },
  },
});

export default getAllProductsSlice.reducer;

export const {
  allProducts,
  filterByCaregory,
  detail,
  clearDetail,
  sortProductsByName,
  sortProductsByPrice,
  getCaterogias,
  setFavorites,
  addFavoritoLocal,
  deleteFavoritoLocal,
} = getAllProductsSlice.actions;
