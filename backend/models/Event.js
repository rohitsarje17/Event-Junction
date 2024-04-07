import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true      
    },
    description: {
      type: String,
      required: true
    },
   
    featured :{
        type : Boolean
    },

    bookings:[{ type : mongoose.Types.ObjectId , ref:"Booking"} ],
    

    admin: {
        type: mongoose.Types.ObjectId,
        ref:"Admin",
        required: true
      },

    date: {
      type: Date,             
      required: true
    },

   posterURL: {
      type: String,
      required: true
    }
    
  });


export  default mongoose.model("Event",eventSchema);