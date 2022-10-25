import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface appointmentData {
    user: string,
    block: number,
    date: Date,
    barber: string,
    office: string,
}

interface AppointmentState {
    allAppointments: Array<appointmentData> | undefined;
    loading: boolean
    errors: any;
 
}

const initialState: AppointmentState = {
    allAppointments: [],
    loading: false,
    errors: null
}
type dataTurno = {
    data: appointmentData;
  };

//==========action=================

export const postAppointment = (info : object): AppThunk => {
    return async (dispatch) => {
        try {
            const turno : dataTurno =  await axios.post(
                "http://localhost:5000/agenda/create",
                info
            );
           // dispatch(appointmentCreate(turno.data));
            alert("Turno registrado con exito")
        } catch (error:any) {
            if (error.response.status === 400){
                alert ("Error en la información")
            }
        }
    }
}

//==========reducer================
export const allAppointments = createSlice({
    name: "allAppointments",
    initialState,
    reducers: {
      appointmentCreate: (state, action: PayloadAction<appointmentData[]>) => {
        state.allAppointments = action.payload;
        state.loading = false;
      }
    }
  })


  export default allAppointments.reducer
  export const {
    appointmentCreate,
  } = allAppointments.actions;