import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    // name:{
    //     type : String,
    //    // required:true,
    // },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:5,
    },
    addedEvents:[{
        type : mongoose.Types.ObjectId,
        ref:"Event",
    }],
});
export  default mongoose.model("Admin",adminSchema);