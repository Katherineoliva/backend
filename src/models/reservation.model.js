import { Schema, model } from 'mongoose';

const reservationSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        commet:{
            type:String,
            required:true
        },
        undertaking:{
            type:Schema.Types.ObjectId,
            ref:'Undertaking',
            required:true
        },
        space:{
            type:Schema.Types.ObjectId,
            ref:'Space',
            required:true
        },
        event:{
            type:Schema.Types.ObjectId,
            ref:'Event',
            required:true
        }
    },
    { timestamp: true }
)


const Reservation = new model('Reservation', reservationSchema);

export default Reservation;