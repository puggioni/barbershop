import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

// localStorage.setItem('myCat', 'Tom');
// localStorage.getItem('myCat');
// localStorage.removeItem('myCat');

interface userFound {
  user: Object;
  token: string;
}

const initialState = { res: {} };

type dataUser = {
  data: string;
}

//==========actions==================
export const logIn = (email: string, password: string): AppThunk => {
  return async (dispatch) => {
    try {
      const res: any = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log(res.data);
      dispatch(userLogIn(res.data));
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
    userLogIn: (state: any, action: PayloadAction<userFound>) => {
      state.token = JSON.stringify(action.payload.token);
      localStorage.setItem("token", state.token);
      state.userFound = JSON.stringify(action.payload.user);
      localStorage.setItem("user", state.userFound);
    },
    userCreate: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  }
});



export default logInReducerSlice.reducer;
export const { userLogIn, userCreate} = logInReducerSlice.actions;
