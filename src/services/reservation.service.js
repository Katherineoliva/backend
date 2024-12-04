import { get } from "mongoose";
import Reservation from "../models/reservation.model";
import { reservationErrorCodes } from "../utils/errorCodes/reservation.errorCodes";
import { ServiceError } from "../utils/serviceError";

export const createReservation = async(reservation)=>{
    try{
        const newReservation = new Reservation(reservation);
        if(!newReservation) throw new ServiceError('Reservation not created', reservationErrorCodes.RESERVATION_NOT_CREATED);
        await newReservation.save();
        return newReservation;
    }catch(e){
        throw new ServiceError(e.message, e.code || reservationErrorCodes.RESERVATION_ERROR);
    }
}

export const getAllReservations = async()=>{
    try{
        const reservations = await Reservation.find();
        return reservations;
    }catch(e){
        throw new ServiceError(e.message, e.code || reservationErrorCodes.FETCH_RESERVATION_ERROR);
    }
}

export const getReservationById = async(id)=>{
    try{
        const reservation = await Reservation.findById(id);
        if(!reservation) throw new ServiceError('Reservation not found', reservationErrorCodes.RESERVATION_NOT_FOUND);
        return reservation;
    }catch(e){
        throw new ServiceError(e.message, e.code || reservationErrorCodes.FETCH_RESERVATION_ERROR);
    }
}