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
interface init {
  deleteProd: object;
  users: users[];
}
const initialState: init = {
  deleteProd: {},
  users: [],
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
      console.log(error);
    }
  };
};
//================reducer===================
export const adminReducerSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminDeleteProd: (state: any, action: PayloadAction<products>) => {
      state.deleteProd = action.payload;
    },
    getUsersReducer: (state: any, action: PayloadAction<users>) => {
      state.users = action.payload;
    },
  },
});

export default adminReducerSlice.reducer;
export const { adminDeleteProd, getUsersReducer } = adminReducerSlice.actions;
