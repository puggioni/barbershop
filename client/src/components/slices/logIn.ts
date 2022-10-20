import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

interface userFound {
  user: Object;
  token: string;
  logeado: boolean;
}

const initialState = {
  user: "",
  token: "",
  logeado: false,
};

type dataUser = {
  data: string;
};

//==========actions==================
export const logIn = (email: string, password: string): AppThunk => {
  return async (dispatch) => {
    try {
      const res: any = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      dispatch(userLogIn(res.data));
    } catch (error) {
      return error;
    }
  };
};

export const logOut = () => {
  return (dispatch: any) => {
    dispatch(userLogOut());
  };
};
export const yaLog = () => {
  return (dispatch: any) => {
    dispatch(yaLogeado());
  };
};

export const logUp = (user: object): AppThunk => {
  return async (dispatch) => {
    try {
      const credenciales: dataUser = await axios.post(
        "http://localhost:5000/users/signup",
        user
      );
      dispatch(userCreate(credenciales.data));
      alert("Usuario creado exitosamente");
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const logInReducerSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLogIn: (state: any, action: PayloadAction<userFound>) => {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      state.userFound = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      state.logeado = true;
    },
    userLogOut: (state) => {
      state.token = "";
      state.user = "";
      state.logeado = false;
      localStorage.clear();
    },
    yaLogeado: (state) => {
      state.logeado = true;
    },
    userCreate: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export default logInReducerSlice.reducer;

export const { userLogIn, userLogOut, yaLogeado, userCreate } =
  logInReducerSlice.actions;
