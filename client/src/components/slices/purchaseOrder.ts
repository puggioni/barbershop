import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface PurchaseOrders {
  _id: string;
  user?: string;
  products?: Array<any>;
  state?: string;
  date?: Date;
  address?: Object;
}

interface PurchaseOrder {
  purchaseOrder: PurchaseOrders | undefined;
  carrito: number;
  ordersByUser: Array<PurchaseOrders>;
  loading: boolean;
  order: PurchaseOrders;
}

const initialState: PurchaseOrder = {
  purchaseOrder: undefined,
  carrito: 0,
  ordersByUser: [],
  loading: true,
  order: { _id: "" },
};

//==========action================//
export const comprar = (header: object, compra: object) => {
  return async () => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/payments/create-order`,
        compra,
        {
          headers: header,
        }
      );
      window.location.href = `${response.data.links[1].href}`;
    } catch (error) {
      console.log(error);
      alert("Debes estar logeado para finalizar la compra");
    }
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

export const getPersonalOrder = (id: any): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/personal-orders/${id}`
      );
      dispatch(orderUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const getDetailOrder = (id: any): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/${id}`
      );
      dispatch(setOrder(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCantCarrito = (): AppThunk => {
  return async (dispatch) => {
    dispatch(cantidadCarrito());
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
    orderUser: (state: any, action: PayloadAction<PurchaseOrders>) => {
      state.ordersByUser = action.payload;
    },
    setOrder: (state: any, action: PayloadAction<PurchaseOrders>) => {
      state.order = action.payload;
    },
    cantidadCarrito: (state) => {
      const products: any = JSON.parse(
        window.localStorage.getItem("product") || "[]"
      );
      state.carrito = products.length;
    },
  },
});

export default getAllOrdersSlice.reducer;
export const {
  order,
  confirmOrder,
  cancelOrder,
  orderUser,
  setOrder,
  cantidadCarrito,
} = getAllOrdersSlice.actions;
