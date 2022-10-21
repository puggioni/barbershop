import { Schema, model, Types } from "mongoose";

export interface IAppointment {
    user: Types.ObjectId;
    date: Date; //formato: 'yyyy-mm-dd'
    block: number;
    barber: Types.ObjectId;
    office: Types.ObjectId;
}

const appointmentSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: 'User' },
        date: { 
            type: Date,
            required: true,
            /* validate: function(input) {
                return new Date(input) >= new Date();
            },
            message: input => `${input} must be greater than or equal to the current date!` */
        },
        block: { required: true, type: Number, min: 1, max: 4 },
        barber: { type: Types.ObjectId, ref: 'Barber' },
        office: { type: Types.ObjectId, ref: 'Office' }
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

export default model<IAppointment>("Appointment", appointmentSchema);
