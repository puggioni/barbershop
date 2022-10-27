import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface PurchaseOrders {
  _id?: string;
  user?: string;
  products?: Array<any>;
  state?: string;
  date: Date;
}

interface PurchaseOrder {
  purchaseOrder: PurchaseOrders | {};
  allOrders: Array<PurchaseOrders>;
  ordersByUser: Array<PurchaseOrders>;
}

const initialState: PurchaseOrder = {
  purchaseOrder: {},
  allOrders: [],
  ordersByUser: [],
};

//==========action================//
export const getPurchaseOrder = (id: any): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/${id}`
      );
      dispatch(order(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const confirmOrders = (id: any): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/confirm/${id}`
      );
      console.log(res.data);
      dispatch(confirmOrder(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const cancelOrders = (id: any): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/cancel/${id}`
      );
      dispatch(cancelOrder(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//==========reducer================//

export const getAllOrdersSlice = createSlice({
  name: "purchaseOrder",
  initialState,
  reducers: {
    order: (state, action: PayloadAction<PurchaseOrders>) => {
      state.purchaseOrder = action.payload;
    },
    confirmOrder: (state, action: PayloadAction<PurchaseOrders>) => {
      state.purchaseOrder = action.payload;
    },
    cancelOrder: (state, action: PayloadAction<PurchaseOrders>) => {
      state.purchaseOrder = action.payload;
    },
  },
});

export default getAllOrdersSlice.reducer;
export const { order, confirmOrder, cancelOrder } = getAllOrdersSlice.actions;
