import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import logInReducer from "../components/slices/logIn";
import getAllProducts from "../components/slices/productSlice";
import adminReducer from "../components/slices/admin";
import agregarCarrito from "../components/slices/compra";
const store = configureStore({
  //aca se agregan los reducers
  reducer: {
    products: getAllProducts,
    logIn: logInReducer,
    admin: adminReducer,
    carrito: agregarCarrito,
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
