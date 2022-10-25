import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface office {
    lat: number;
    long: number;
}

interface BarberState {
    allOffices: Array<office> | undefined;
    loading: boolean
    errors: any;

}

const initialState: BarberState = {
    allOffices: [],
    loading: false,
    errors: null
}

//==========action=================

export const fetchAllOffices = (): AppThunk => {
  return async (dispatch) => {
    try {
      const offices = await axios.get("http://localhost:5000/office/all");
      dispatch(allOffices(offices.data))
    } catch (error) {return error }
  }
}

//==========reducer================
export const getAllOffices = createSlice({
    name: "allBarbers",
    initialState,
    reducers: {

      allOffices: (state, action: PayloadAction<office[]>) => {
        state.allOffices = action.payload;
        state.loading = false;
      }
    }
  })


  export default getAllOffices.reducer
  export const {
    allOffices,
  } = getAllOffices.actions;