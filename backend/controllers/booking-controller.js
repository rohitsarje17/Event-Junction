import Bookings from "../models/Bookings";
import Event from "../models/Event";
import User from "../models/User";
import mongoose from "mongoose";

export const newBooking= async (req,res,next) => {
    const {event,date,bookingNumber,user } = req.body;

    let existingUser;
    let existingEvent;

    try {
        existingEvent = await Event.findById(event);
        existingUser = await User.findById(user);
    } catch (error) {
        console.log(error);
    }

    if(!existingEvent){
        return res.status(400).json({message:"Event not found"});
    }
    if(!existingUser){
        return res.status(400).json({message:"User not found"});
    }

    let booking ;
    try {
        booking = new Bookings({event,date:new Date(`${date}`),user,bookingNumber});

        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingEvent.bookings.push(booking);
        await existingUser.save({session});
        await existingEvent.save({session});
        await booking.save({session});
        await session.commitTransaction();
     
    } catch (error) {
        console.log(error);
    }
    if(!booking){
        return res.status(500).json({message:"Unable to create a booking !"});
    }

        return res.status(201).json({booking});
};
export const getBookingById = async (req,res,next) => {
    const id=req.params.id;
    let booking;
    try {
        booking = await Bookings.findById(id);
    } catch (err) {
        return console.log(err);
    }
  
    if(!booking){
        return res.status(404).json({message:"Wrong Booking ID!"});
    }
  
        return res.status(201).json({booking});
  };

  export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
  
    try {
      booking = await Bookings.findByIdAndRemove(id).populate("user event");
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      if (!booking.user || !booking.event) {
        return res.status(500).json({ message: "Booking is missing user or event information" });
      }
  
      const session = await mongoose.startSession();
      session.startTransaction();
  
      if (booking.user.bookings) {
        await booking.user.bookings.pull(booking);
        await booking.user.save({ session });
      }
  
      if (booking.event.bookings) {
        await booking.event.bookings.pull(booking);
        await booking.event.save({ session });
      }
  
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  
    return res.status(200).json({ message: "Deleted Successfully!" });
  };
  
