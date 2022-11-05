import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";
import { products } from "./productSlice";

interface users {
  _id: string;
  email: string;
  password?: string;
  name?: string;
  lastname?: string;
  user_image?: string;
  phone_number?: string;
  role?: { name: string }[];
  createdAt?: string;
  updatedAt?: string;
  banned?: boolean;
  favorites_products?: Array<string>;
  purchases?: Array<any>;
}

export interface inputs {
  lat:0;
  long:0;
  location: string;
}

interface PurchaseOrders {
  _id: string;
  user?: string;
  products?: Array<any>;
  state?: string;
  date?: Date;
}
interface init {
  deleteProd: object;
  users: users[];
  orders: PurchaseOrders[];
  filtroOrden: PurchaseOrders[];
}
const initialState: init = {
  deleteProd: {},
  users: [],
  orders: [],
  filtroOrden: [],
};

type dataOffice = {
  data: inputs;
};
//==========action==================
export const deleteProd = (
  header: { token: string | null },
  id: string
): AppThunk => {
  return async (dispatch) => {
    const res: products = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/products/delete`,
      { headers: header, data: { id } }
    );
    dispatch(adminDeleteProd(res));
  };
};

export const createOffice = (
  // header: { token: string | null },
  oficina: object
): AppThunk => {
  return async () => {
    try {

      await axios.post( 
        `${process.env.REACT_APP_BASE_URL}/office/create`,
        oficina, 
        );
      
        alert("Oficina creada con exito");
      } catch (error) {
        console.log(error)
        alert("No se pudo crear la oficina");
      }
    };
  };
  export const borrarOffice= (
    header: { token: string | null },
    id: string
  ): AppThunk => {
    return async () => {
      try {
        console.log(id)
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/office/delete/${id}`,
          { headers: header }
        );
  
        alert("Oficina borrada con exito");
      } catch (error) {
        alert("No se pudo borrar la oficina");
      }
    };
  };

export const createProd = (
  header: { token: string | null },
  data: any,
  img: any
): AppThunk => {
  return async () => {
    try {
      const newProd = new FormData();
      newProd.append("name", data.nombre);
      newProd.append("price", data.precio);
      newProd.append("stock", data.stock);
      newProd.append("available", data.available);
      newProd.append("description", data.descripcion);
      newProd.append("categories", data.categorias);
      newProd.append("image", img[0]);

      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products/create`,
        newProd,
        {
          headers: header,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProd = (
  header: { token: string | null },
  data: any,
  img: any,
  idProduct: string
): AppThunk => {
  return async () => {
    try {
      const newProd = new FormData();
      newProd.append("name", data.nombre);
      newProd.append("price", data.precio);
      newProd.append("stock", data.stock);
      newProd.append("description", data.descripcion);
      newProd.append("categories", JSON.stringify(data.categorias));
      img.length !== 0
        ? newProd.append("image", img[0])
        : newProd.append("image", "");

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/edit/${idProduct}`,
        newProd,
        {
          headers: header,
        }
      );
      if (res.status === 200) {
        alert("Producto editado correctamente");
        window.location.pathname = "admin/products";
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUsers = (header: { token: string | null }): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/all`,
        { headers: header }
      );
      dispatch(getUsersReducer(res.data));
    } catch (error) {
      alert("No se pudo obtener usuario");
    }
  };
};

export const banearUsuario = (
  header: { token: string | null },
  id: string
): AppThunk => {
  return async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/banear/${id}`,
        null,
        {
          headers: header,
        }
      );
    } catch (error) {
      alert("ocurrio un error");
    }
  };
};

export const hacerAdmin = (
  header: { token: string | null },
  id: string,
  role: string
): AppThunk => {
  return async () => {
    try {
      const rol = role === "admin" ? "user" : "admin";
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/changeToAdmin/${id}`,
        { role: rol },
        {
          headers: header,
        }
      );
    } catch (error) {
      alert("ocurrio un error");
    }
  };
};

export const searchUser = (param: string): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/one-user?name=${param}`
      );
      dispatch(getUsersReducer(res.data));
    } catch (error) {
      alert("no se encontro usuario");
    }
  };
};

export const getAllOrders = (header: { token: string | null }): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/all-orders`,
        { headers: header }
      );
      dispatch(getOrdersReducer(res.data));
    } catch (error) {
      alert("No se pudo obtener ordenes de compra");
    }
  };
};

export const cambiarEstadoOrden = (
  header: { token: string | null },
  id: string,
  estado: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/orders/editorder?id=${id}&state=${estado}`,
        null,
        {
          headers: header,
        }
      );
      dispatch(cambiarEstado(res.data));
    } catch (error) {
      alert("No se pudo cambiar el estado de la orden");
    }
  };
};
export const cambiarEstadoOrdenCompleta = (
  header: { token: string | null },
  id: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios(
        `${process.env.REACT_APP_BASE_URL}/orders/confirm/${id}`,
        {
          headers: header,
        }
      );
      dispatch(cambiarEstado(res.data));
    } catch (error) {
      alert("No se pudo cambiar el estado de la orden");
    }
  };
};
export const cambiarEstadoOrdenCancelada = (
  header: { token: string | null },
  id: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios(
        `${process.env.REACT_APP_BASE_URL}/orders/cancel/${id}`,
        {
          headers: header,
        }
      );
      dispatch(cambiarEstado(res.data));
    } catch (error) {
      alert("No se pudo cambiar el estado de la orden");
    }
  };
};

export const searchOrderName = (name: string): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/search-order?name=${name}`
      );
      dispatch(searchOrdersName(res.data));
    } catch (error) {
      alert("No se encontro ordenes de compra");
    }
  };
};

export const searchOrderId = (
  header: { token: string | null },
  id: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/${id}`,
        { headers: header }
      );
      dispatch(searchOrdersId(res.data));
    } catch (error) {
      alert("No se encontro ordenes de compra");
    }
  };
};

export const filterOrderState = (value: string): AppThunk => {
  return (dispatch) => {
    dispatch(filterOrders(value));
  };
};

export const createCate = (
  header: { token: string | null },
  name: string
): AppThunk => {
  return async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/categories/create`,
        { name: name },
        { headers: header }
      );
      alert("Categoria creada con exito");
    } catch (error) {
      alert("No se pudo crear la categoria");
    }
  };
};



export const borrarCate = (
  header: { token: string | null },
  id: string
): AppThunk => {
  return async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/categories/delete?id=${id}`,
        { headers: header }
      );

      alert("Categoria borrada con exito");
    } catch (error) {
      alert("No se pudo crear la categoria");
    }
  };
};

export const despacharOrden = (
  header: { token: string | null },
  id: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/orders/dispatch/` + id,
        { id: id },
        { headers: header }
      );
      dispatch(despachado(res.data));
      alert("Producto despachado con exito");
    } catch (error) {
      alert("No se pudo despachar");
    }
  };
};

//================reducer===================
const adminReducerSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminDeleteProd: (state: any, action: PayloadAction<products>) => {
      state.deleteProd = action.payload;
    },
    getUsersReducer: (state: any, action: PayloadAction<users>) => {
      state.users = action.payload;
    },
    getOrdersReducer: (
      state: { orders: any[]; filtroOrden: any[] },
      action: PayloadAction<any[]>
    ) => {
      state.orders = action.payload;
      state.filtroOrden = action.payload;
    },
    cambiarEstado: (
      state: { orders: any[]; filtroOrden: any[] },
      action: PayloadAction<any>
    ) => {
      const index = state.orders.findIndex((el) => {
        return el._id === action.payload._id;
      });

      state.orders[index] = action.payload;
      state.filtroOrden[index] = action.payload;
    },
    searchOrdersId: (
      state: { orders: any[] },
      action: PayloadAction<any[]>
    ) => {
      state.orders = [action.payload];
    },
    searchOrdersName: (
      state: { orders: any[]; filtroOrden: any[] },
      action: PayloadAction<any[]>
    ) => {
      state.orders = action.payload;
      state.filtroOrden = action.payload;
    },
    filterOrders: (
      state: { orders: any[]; filtroOrden: any[] },
      action: PayloadAction<string>
    ) => {
      const filtered = state.filtroOrden.filter((el) => {
        return el.state === action.payload;
      });
      state.orders = filtered;
    },
    despachado: (
      state: { orders: any[]; filtroOrden: any[] },
      action: PayloadAction<string>
    ) => {
      const index = state.orders.findIndex((el) => {
        return null; // el._id === action.payload._id;
      });
      state.orders[index] = action.payload;
      state.filtroOrden[index] = action.payload;
    },
  },
});

export default adminReducerSlice.reducer;
export const {
  adminDeleteProd,
  getUsersReducer,
  getOrdersReducer,
  searchOrdersId,
  filterOrders,
  searchOrdersName,
  cambiarEstado,
  despachado,
} = adminReducerSlice.actions;
