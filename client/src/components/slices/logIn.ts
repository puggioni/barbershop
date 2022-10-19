import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

interface userInfo {
  userName: string;
  password: string;
  token: string;
  role: string;
}

const initialState: userInfo = {
  userName: "",
  password: "",
  token: "",
  role: "",
};

//==========action==================
export const unaAccion = (): AppThunk => {
  return async () => {
    try {
    } catch (error) {
      return error;
    }
  };
};
//================reducer===================

export const logInReducerSlice = createSlice({
  name: "unReducer",
  initialState,
  reducers: {
    allProducts: (state, action: PayloadAction<userInfo>) => {},
  },
});

export default logInReducerSlice.reducer;
export const {} = logInReducerSlice.actions;
