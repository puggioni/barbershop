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
}
const initialState: init = {
  deleteProd: {},
  users: [],
  orders: [],
};
//==========action==================
export const deleteProd = (header: object, id: string): AppThunk => {
  return async (dispatch) => {
    const res: products = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/products/delete`,
      { headers: header, data: { id } }
    );
    dispatch(adminDeleteProd(res));
  };
};

export const createProd = (header: object, data: any, img: any): AppThunk => {
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

export const getUsers = (header: any): AppThunk => {
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

export const banearUsuario = (header: any, id: string): AppThunk => {
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

export const hacerAdmin = (header: any, id: string, role: string): AppThunk => {
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

export const getAllOrders = (header: any): AppThunk => {
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
  header: any,
  id: string,
  estado: string
): AppThunk => {
  return async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/orders/editorder?id=${id}&state=${estado}`,
        null,
        {
          headers: header,
        }
      );
    } catch (error) {
      alert("No se pudo cambiar el estado de la orden");
    }
  };
};

export const searchOrderName = (name: string): AppThunk => {
  return async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/search-orders?name=${name}`
      );
    } catch (error) {
      alert("No se pudo cambiar el estado de la orden");
    }
  };
};

export const searchOrderId = (id: string): AppThunk => {
  return async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/orders/${id}`);
    } catch (error) {
      alert("No se pudo cambiar el estado de la orden");
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
      state: { orders: any[] },
      action: PayloadAction<any[]>
    ) => {
      state.orders = action.payload;
    },
  },
});

export default adminReducerSlice.reducer;
export const { adminDeleteProd, getUsersReducer, getOrdersReducer } =
  adminReducerSlice.actions;
