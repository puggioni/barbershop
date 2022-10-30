import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface PurchaseOrders {
  _id: string;
  user?: string;
  products?: Array<any>;
  state?: string;
  date?: Date;
}

interface PurchaseOrder {
  purchaseOrder: PurchaseOrders | undefined;
  allOrders: Array<PurchaseOrders>;
  ordersByUser: Array<PurchaseOrders>;
  loading: boolean;
}

const initialState: PurchaseOrder = {
  purchaseOrder: undefined,
  allOrders: [],
  ordersByUser: [],
  loading: true,
};

//==========action================//
export const comprar = (header: object, compra: object) => {
  return async () => {
    console.log(compra);
    const response: any = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/payments/create-order`,
      compra,
      {
        headers: header,
      }
    );

    window.location.href = `${response.data.links[1].href}`;
  };
};
//window.open(url, '_blank').focus();
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
      state.loading = false;
      state.purchaseOrder = action.payload;
    },
    cancelOrder: (state, action: PayloadAction<PurchaseOrders>) => {
      state.purchaseOrder = action.payload;
    },
  },
});

export default getAllOrdersSlice.reducer;
export const { order, confirmOrder, cancelOrder } = getAllOrdersSlice.actions;
