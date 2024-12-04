import { createReservation, getAllReservations } from "../services/reservation.service";
import { reservationErrorCodes } from "../utils/errorCodes/reservation.errorCodes";
import createError from "http-errors";


//al reservar se debe asignar el id del undertaking al evento 
//se debe validar que el evento exista
//asignarle al espacio el id del undertaking reservado

export const createReservationController = async (req, res, next) => {
    try{
        const reservation = req.body;
        const newReservation = await createReservation(reservation);
        res.status(201).json(newReservation);
    }catch(e){
        switch(e.code){
            case reservationErrorCodes.RESERVATION_NOT_CREATED:
                next(createError(500, 'Reservation not created'));
                break;
            case reservationErrorCodes.RESERVATION_ERROR:
                next(createError(500, 'Reservation error'));
                break;
            default:
                next(e);
        }
    }
}


