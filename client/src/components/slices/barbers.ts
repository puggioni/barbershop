import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface barber {
    name: number;
    office: string;
    rating: number;
    image: string;
  }

export interface office {
    lat: number;
    long: number;
}

interface BarberState {
    allBarbers: Array<barber> | undefined;
    loading: boolean
    errors: any;

}

const initialState: BarberState = {
    allBarbers: [],
    loading: false,
    errors: null
}

//==========action=================
export const fetchAllBarbers = (): AppThunk => {
    return async (dispatch) => {
        try {
          const barbers = await axios.get("http://localhost:5000/barber/all");
          dispatch(allBarbers(barbers.data));
        } catch (error) { return error }  
    };
  };

//==========reducer================
export const getAllBarbers = createSlice({
    name: "allBarbers",
    initialState,
    reducers: {
      allBarbers: (state, action: PayloadAction<barber[]>) => {
        state.allBarbers = action.payload;
        state.loading = false;
      },
    }
  })


  export default getAllBarbers.reducer
  export const {
    allBarbers,

  } = getAllBarbers.actions;