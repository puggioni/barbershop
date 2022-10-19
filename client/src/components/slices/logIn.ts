import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

// localStorage.setItem('myCat', 'Tom');
// localStorage.getItem('myCat');
// localStorage.removeItem('myCat');

interface userFound {
  token: string;
}

const initialState = { res: {} };

//==========action==================
export const logIn = (email: string, password: string): AppThunk => {
  return async (dispatch) => {
    try {
      const res: any = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      dispatch(userLogIn(res.data.token));
    } catch (error) {
      return error;
    }
  };
};
//================reducer===================

export const logInReducerSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLogIn: (state: any, action: PayloadAction<userFound>) => {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
  },
});

export default logInReducerSlice.reducer;
export const { userLogIn } = logInReducerSlice.actions;
