import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface userInfo {

  user: string;
}

const initialState: userInfo = {
  user: "",

};

type dataUser = {
  data: string;
}

//==========actions==================
export const logIn = (email: string, password: string): AppThunk => {
  return async (dispatch) => {
    try {
      const credenciales: string = await axios.post(
        "http://localhost:5000/users/login",
        { email, password }
      );
      dispatch(userLogIn(credenciales));
    } catch (error) {
      return error;
    }
  };
};

export const logUp = (user:object): AppThunk => {
  return async (dispatch) => {
    try {
      const credenciales: dataUser = await axios.post(
        "http://localhost:5000/users/signup",user
      );
      dispatch(userCreate(credenciales.data));
      alert("Usuario creado exitosamente")
    } catch (error) {
      console.log(error)
      return error;
      
    }
  };
};
//================reducers===================

export const logInReducerSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLogIn: (state, action: PayloadAction<string>) => {
      
      state.user = action.payload;

    },
    userCreate: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  }
});



export default logInReducerSlice.reducer;
export const { userLogIn, userCreate} = logInReducerSlice.actions;
