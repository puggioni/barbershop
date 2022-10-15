import { configureStore } from "@reduxjs/toolkit";
import productdetailReducer from "../components/productdetail/ptoductdetailSlice";
import getAllProducts from "../components/products/productSlice";
const store = configureStore({
  //aca se agregan los reducers
  reducer: {
    producdetail: productdetailReducer,
    getAllProducts: getAllProducts,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
