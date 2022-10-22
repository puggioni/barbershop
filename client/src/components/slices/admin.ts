import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { AppThunk } from "../../app/store";

const initialState = {
  adminAuth: false,
};
//==========action==================
export const isAdmin = (
  token: AxiosRequestConfig<any> | undefined
): AppThunk => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:5000/users/isAdmin");
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
