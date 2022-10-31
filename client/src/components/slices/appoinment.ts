import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface appointmentData {
  user: string;
  block: number;
  date: Date;
  barber: string;
  office: string;
}

interface AppointmentState {
  allAppointments: Array<appointmentData> | undefined;
  loading: boolean;
  errors: any;
}

const initialState: AppointmentState = {
  allAppointments: [],
  loading: false,
  errors: null,
};
type dataTurno = {
  data: appointmentData;
};

//==========action=================

export const postAppointment = (cita: object): AppThunk => {
  return async (dispatch) => {
    try {
      const turno: dataTurno = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/agenda/create`,
        cita
      );
      console.log(turno.data)
      alert("Turno registrado con exito");
    } catch (error: any) {
      alert(error.response.data.error);
      if (error.response.status === 400) {
        alert("Error en la información");
      }
    }
  };
};
export const getAppointments = (idUser: string): AppThunk=> {
  return async (dispatch) => {
    try {
      const turnos = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/agenda/all/${idUser}`
      );
      dispatch(MyAppointment(turnos.data))
    }catch (error) {return error}
  }
}
export const deleteAppointment = (idAppointment: string): AppThunk => {
  return async (dispatch) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/agenda/delete/${idAppointment}`,
      { }
    );
    dispatch(deleteTurnos(res));
  };
};

//==========reducer================
export const allAppointments = createSlice({
  name: "allAppointments",
  initialState,
  reducers: {
    appointmentCreate: (state, action: PayloadAction<appointmentData[]>) => {
      state.allAppointments = action.payload;
      state.loading = false;
    },
    MyAppointment: (state, action: PayloadAction<appointmentData[]>) => {
      state.allAppointments = action.payload;
      state.loading = false;
    },
    deleteTurnos: (state: any, action: PayloadAction<any>) => {
      state.allAppointments = action.payload;
      const deleted = state.allAppointments.filter((appo: { _id: string }) => {
        return action.payload.data._id !== appo._id;
      });
      state.allAppointments = deleted;
    }, 
  },
});

export default allAppointments.reducer;
export const { appointmentCreate, MyAppointment, deleteTurnos } = allAppointments.actions;
