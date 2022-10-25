import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

const initialState = {
  adminAuth: false,
};
//==========action==================
export const isAdmin = (headers: object): AppThunk => {
  return async (dispatch) => {
    const res = await axios.get(
      "http://localhost:5000/users",
      headers
    );
    dispatch(adminCred(res.data.name));
  };
};

//================reducer===================
export const adminReducerSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminCred: (state: any, action: PayloadAction<{ name: boolean }>) => {
      state.adminAuth = action.payload;
    },
  },
});

export default adminReducerSlice.reducer;
export const { adminCred } = adminReducerSlice.actions;
