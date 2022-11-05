import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface products {
  _id: string;
  image?: string;
  rating?: number;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  available?: boolean;
  favorite?: boolean;
  userFavorite?: boolean;
  categories?: Array<any>;
  reviews?: Array<any>;
  __v?: number;
}
interface ProductState {
  allProducts: Array<products>;
  product: products | null;
  loading: boolean;
  errors: any;
  favs: Object[];
  categorias: Array<{ name: string; _id: string }>;
  deleteProd: {};
  copyAllProducts:Array<products>;
}

const initialState: ProductState = {
  allProducts: [],
  product: null,
  loading: false,
  errors: null,
  favs: [],
  categorias: [],
  deleteProd: {},
  copyAllProducts: [],
};

//==========action==================

export const fetchAllProducts = (tosearch: string): AppThunk => {
  return async (dispatch) => {
    if (!tosearch) {
      try {
        const productos = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/products/all`
        );
        dispatch(allProducts(productos.data));
        dispatch(copyAllProducts(productos.data));
      } catch (error) {
        return error;
      }
    } else {
      try {
        const productos = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/products/search?name=` + tosearch
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
        `${process.env.REACT_APP_BASE_URL}/products/addFavorite`,
        { productId: idProduct, userId: IdUser },
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

export const setFavosBulk = (
  IdUser: string,
  token: string,
  IdsProducts: Array<string>
): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products/addFavoriteBulk`,
        { products: { _id: IdsProducts }, user: { _id: IdUser } },
        { headers: { token: token } }
      );

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
        `${process.env.REACT_APP_BASE_URL}/products/removeFavorite`,
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
        `${process.env.REACT_APP_BASE_URL}/products/favorites/` + IdUser,
        {
          headers: { token: token },
        }
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
      const product = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/filter/${categoria}`
      );
      dispatch(filterByCaregory(product.data));
    } catch (error) {
      return error;
    }
  };
};

export const orderByName = (payload: string) => {
  return async (dispatch: any) => {
    try {
      const ordered = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/all`
      );
      dispatch(sortProductsByName(ordered.data));
    } catch (error) {
      return error;
    }
  };
};
export const orderByPrice = (payload: string) => {
  return async (dispatch: any) => {
    try {
      const ordered = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/all`
      );
      dispatch(sortProductsByPrice(ordered.data));
    } catch (error) {
      return error;
    }
  };
};

export const orderByStock = () => {
  return (dispatch: any) => {
    dispatch(sortProductsByStock());
  };
};

export const orderByDisponible = () => {
  return (dispatch: any) => {
    dispatch(sortProductsByDisponible());
  };
};

export const categorias = (): AppThunk => {
  return async (dispatch) => {
    try {
      const categorias = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/categories/all`
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
        `${process.env.REACT_APP_BASE_URL}/products/${idProduct}`
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

export const reviewProduct = (review: object, config: object): AppThunk => {
  return async (dispatch) => {
    try {
      const producto = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/reviews/create`,
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
export const deleteProd = (header: object, id: string): AppThunk => {
  return async (dispatch) => {
    const res: products = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/products/delete`,
      { headers: header, data: { id } }
    );
    dispatch(adminDeleteProd(res));
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

    sortProductsByStock: (state) => {
      const sortedArray = state.allProducts.sort((curr: any, prev: any) => {
        if (curr.stock < prev.stock) {
          return 1;
        } else if (curr.stock > prev.stock) {
          return -1;
        } else return 0;
      });
      state.allProducts = sortedArray;
    },

    sortProductsByDisponible: (state) => {
      const sortedArray = state.allProducts.sort((curr: any, prev: any) => {
        return curr === prev ? 0 : curr ? -1 : 1;
      });
      state.allProducts = sortedArray;
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
      action: PayloadAction<Array<{ name: string; _id: string }>>
    ) => {
      state.categorias = action.payload;
    },

    setFavorites: (state, action: PayloadAction<Array<products>>) => {
      state.favs = action.payload;
    },

    copyAllProducts: (state, action: PayloadAction<Array<products>>) => {
      state.copyAllProducts = action.payload;
    },


    addFavoritoLocal: (state, action: PayloadAction<products>) => {
      state.favs.push(action.payload);
      window.localStorage.setItem("favoritos", JSON.stringify(state.favs));
    },
    adminDeleteProd: (state: any, action: PayloadAction<any>) => {
      state.deleteProd = action.payload;
      const deleted = state.allProducts.filter((prod: { _id: string }) => {
        return action.payload.data._id !== prod._id;
      });
      state.allProducts = deleted;
    },
    deleteFavoritoLocal: (state, action: PayloadAction<string>) => {
      const idx = state.favs.findIndex((p: any) => p._id === action.payload);
      let aux = state.favs;
      aux.splice(idx, 1);
      state.favs = aux;
      window.localStorage.setItem("favoritos", JSON.stringify(state.favs));
    },
    clearFavorites: (state) => {
      state.favs = [];
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
  adminDeleteProd,
  sortProductsByStock,
  sortProductsByDisponible,
  clearFavorites,
  copyAllProducts,
} = getAllProductsSlice.actions;
