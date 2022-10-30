import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";
import { products } from "./productSlice";

const initialState = {
  deleteProd: {},
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

export const editProd = (header: object, data: any, img: any, idProduct:string): AppThunk => {
  return async () => {
    try {
      const newProd = new FormData();
      newProd.append("name", data.nombre);
      newProd.append("price", data.precio);
      newProd.append("stock", data.stock);
      newProd.append("description", data.descripcion);
      newProd.append("categories",JSON.stringify(data.categorias));
      img.length!==0 ? newProd.append("image", img[0]):newProd.append("image","")

      const res=await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/edit/${idProduct}`,
        newProd,
        {
          headers: header,
        }
      );
      if(res.status==200){
        alert("Producto editado correctamente")
        window.location.pathname = "admin/products";
      }
      
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
  },
});

export default adminReducerSlice.reducer;
export const { adminDeleteProd } = adminReducerSlice.actions;
