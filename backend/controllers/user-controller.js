import User from "../models/User";
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import Bookings from "../models/Bookings";


export const getAllUsers= async (req,res,next) => {
    let users;
    try{
        users=await User.find();
    }
    catch(err){
        return console.log(err);
    }
    if(!users){
        return res.status(500).json({message:"Error occured"});
    }

        return res.status(200).json({users});

};

export const signUp = async (req,res,next) => {
    const {name,email,password} = req.body;
    if(!name && name.trim() ==="" && !email && email.trim()==="" && !password && password.trim()==="")
    {
        return req.status(422).json({message:"Something went wrong !"});
    }
    
    let existingUser;
   
    try {
        existingUser=await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(existingUser){
        return res.status(400).json({message:"User with this email id already exists"});
    }

    const hashedPassword = bcrypt.hashSync(password);
     
    let user;
    try{
        user = new User({name,email,password : hashedPassword});
        user=await user.save(); 
    }
    catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({message:"Something went wrong !"});
    }

        return res.status(201).json({id: user._id});
};

export const updateUser = async (req,res,next) => {
    const id=req.params.id;
    const {name,email,password} = req.body;
    if(!name && name.trim() ==="" && !email && email.trim()==="" && !password && password.trim()==="")
    {
        return req.status(422).json({message:"Invalid Input !"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = await User.findByIdAndUpdate(id,{name,email,password : hashedPassword});
    } catch (err) {
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({message:"Something went wrong !"});
    }

        return res.status(201).json({message:"Credentials Updates!"});
};

export const deleteUser = async (req,res,next) => {
    const id=req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({message:"Something went wrong !"});
    }

        return res.status(201).json({message:"Deleted Successfully !"});
};

export const login = async (req,res,next) => {
    const {email,password} = req.body;
    if( !email && email.trim()==="" && !password && password.trim()==="")
    {
        return req.status(422).json({message:"Something went wrong !"});
    }
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(!existingUser){
        return res.status(400).json({message: "No user found with this email !"});
    }

    const isPasswordCorrect  = bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"});
    }

    return res.status(200).json({message:"Login Successfull"});
};

export const getBookingOfUser = async(req,res,next)=>{
    const id = req.params.id;
    let bookings;
    try{
        bookings = await Bookings.find({user:id});
    }catch(err){
        return console.log(err);
    }
    if(!bookings){
        return res.status(500).json({message:"Something went wrong !"});
    }

    return res.status(201).json({bookings});
}


export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
      user = await User.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Unexpected Error Occured" });
    }
    return res.status(200).json({ user });
  };