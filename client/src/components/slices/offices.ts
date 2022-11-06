import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface office {
  _id:string;
  lat: number;
  long: number;
  location: string;
}

interface OfficeState {
  allOffices: Array<office> | undefined;
  loading: boolean;
  errors: any;
}

const initialState: OfficeState = {
  allOffices: [],
  loading: false,
  errors: null,
};

type dataOffice = {
  data: office
}

//==========action=================

export const fetchAllOffices = (): AppThunk => {
  return async (dispatch) => {
    try {
      const offices = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/office/all`
      );
      dispatch(allOffices(offices.data));
    } catch (error) {
      return error;
    }
  };
};


//==========reducer================
export const getAllOffices = createSlice({
  name: "allBarbers",
  initialState,
  reducers: {
    allOffices: (state, action: PayloadAction<office[]>) => {
      state.allOffices = action.payload;
      state.loading = false;
    },

  },
});

export default getAllOffices.reducer;
export const { allOffices } = getAllOffices.actions;
