import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    event:{
        type : mongoose.Types.ObjectId,
        ref:"Event",
        required : true,
    },
   
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
     // bookingId:{
    //     type : String,
    //     required : true,
    // },       
    date:{
        type : Date,
        required:true,
    },
    bookingNumber:{
        type:Number,
        required:false
    }
});

export default mongoose.model("Bookings",bookingSchema); 