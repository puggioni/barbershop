import { Schema, model, Types } from "mongoose";

export interface IAppointment {
    user: Types.ObjectId;
    date: Date; //formato: 'yyyy-mm-dd'
    block: number;
    barber: Types.ObjectId;
    office: Types.ObjectId;
    service: Types.Array<string>;
}

const appointmentSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: 'User' },
        date: { 
            type: Date,
            required: true, //la validacion de fecha se hace en la ruta
        },
        block: { required: true, type: Number, min: 1, max: 8 },
        barber: { type: Types.ObjectId, ref: 'Barber' },
        office: { type: Types.ObjectId, ref: 'Office' },
        service: [String]
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

export default model<IAppointment>("Appointment", appointmentSchema);
