import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import logInReducer from "../components/slices/logIn";
import getAllProducts from "../components/slices/productSlice";
import adminReducer from "../components/slices/admin";
import allBarbers from "../components/slices/barbers";
import getAllOffices from "../components/slices/offices";
import getAllOrdersSlice from "../components/slices/purchaseOrder";
import  getAppointments  from "../components/slices/appoinment";

const store = configureStore({
  //aca se agregan los reducers
  reducer: {
    products: getAllProducts,
    logIn: logInReducer,
    admin: adminReducer,
    barbers: allBarbers,
    offices: getAllOffices,
    orders: getAllOrdersSlice,
    appointments: getAppointments
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
