import { configureStore } from "@reduxjs/toolkit";
import productdetailReducer from "../components/productdetail/ptoductdetailSlice";

const store = configureStore({
  //aca se agregan los reducers
  reducer: {
    producdetail: productdetailReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
