import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import data from "../../mockdata";

export interface ProductdetailState {
  name: string;
  precio: number;
  rating: number;
  imagen?: string;
  description: string;
}

const initialState: ProductdetailState = {
  name: "",
  precio: 0,
  rating: 0,
  imagen: "",
  description: "",
};

export const productdetailSlice = createSlice({
  name: "productdetail",
  initialState,
  reducers: {
    getProductDetail: (state, action: PayloadAction<string>) => {
      console.log(
        "Acá se haría el fetch al back para conseguir el detalle del producto; " +
          action.payload
      );
      const aux = data.find((element) => element.name === action.payload);
      if (typeof aux === "object") Object.assign(state, aux);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getProductDetail } = productdetailSlice.actions;

export default productdetailSlice.reducer;
