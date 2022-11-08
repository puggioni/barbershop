import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

interface userFound {
  user: Object;
  savedUser: object;
  token: string;
  logeado: boolean;
}

interface twofa {
  twofa: boolean;
  secret: string;
}

const initialState = {
  user: "",
  token: "",
  logeado: false,
  twoFaEnabled: false,
  secret: ""
};

type dataUser = {
  data: userFound;
};

//==========actions==================
export const logIn = (email: string, password: string): AppThunk => {
  return async (dispatch) => {
    try {
      const res: any = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        {
          email,
          password,
        }
      );
      if (res.data.banned) {
        alert("Baneado");
      } else {
        dispatch(userLogIn(res.data));
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        alert("Su cuenta fue baneada");
      } else if (error.response.status === 401) {
        alert("Contraseña invalida");
      }
    }
  };
};

export const checkTwoFa = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/twofa-enabled`,
        {
          email
        }
      );
      dispatch(setTwoFaState(res.data));
      if (!res.data.twofa) {
        dispatch(logIn(email, password));
      }//si 2fa es true loginUser se encarga
    } catch (error: any) {
      if (error.response.status === 500) {
        alert("error 500: 2FA");
      } else {
        alert("general error: 2FA");
      }
    }
  };
};

export const logOut = () => {
  return (dispatch: any) => {
    dispatch(userLogOut());
  };
};

export const yaLog = (email: string) => {
  return async (dispatch: any) => {
    const res = await axios(
      `${process.env.REACT_APP_BASE_URL}/users/one-user?name=${email}`
    );
    if (res.data[0].banned) {
      alert("Su cuenta fue baneada");
      dispatch(userLogOut());
      window.location.pathname = "/user/login";
    } else {
      dispatch(yaLogeado());
    }
  };
};

export const logUp = (user: object): AppThunk => {
  return async (dispatch) => {
    try {
      const credenciales: dataUser = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/signup`,
        user
      );
      dispatch(userCreate(credenciales.data));
      alert("Usuario creado exitosamente");
      window.location.pathname = "/";
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
};

export const updateUser = (
  idUser: string,
  formUser: object,
  header: object
): AppThunk => {
export const updateUser = (idUser: string, formUser: object, header: object): AppThunk => {
  return async (dispatch) => {
    try {
      const userUpdated: dataUser = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/users/edit/${idUser}`,
        formUser,
        header
      );
      dispatch(userUpdate(userUpdated.data));
      alert("Informacion actualizada exitosamente");
    } catch (error: any) {
      console.log(error)
      alert("Error al actualizar info");
    }
  };
};
export const changePassword = (id: any, password: string): AppThunk => {
  return async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/pwdRst`, {
        idUsr: id,
        newPwd: password,
      });
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
};

//----------------Reducers------------------------------------------

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

    setTwoFaState: (state: any, action: PayloadAction<twofa>) => {
      state.twoFaEnabled = action.payload.twofa;
      state.secret = action.payload.secret;
    },

    userLogOut: (state) => {
      state.token = "";
      state.user = "";
      state.logeado = false;
      // localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    yaLogeado: (state) => {
      state.logeado = true;
    },

    userCreate: (state: any, action: PayloadAction<userFound>) => {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      state.userFound = action.payload.savedUser;
      localStorage.setItem("user", JSON.stringify(action.payload.savedUser));

      state.logeado = true;
    },

    userUpdate: (state: any, action: PayloadAction<userFound>) => {
      state.userFound = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export default logInReducerSlice.reducer;


export const { userLogIn, setTwoFaState, userLogOut, yaLogeado, userCreate, userUpdate } =

  logInReducerSlice.actions;
