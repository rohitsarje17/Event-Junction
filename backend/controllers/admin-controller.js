import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const allAdmins= async (req,res,next) => {
    let admins;
    try{
        admins=await Admin.find();
    }
    catch(err){
        return console.log(err);
    }
    if(!admins){
        return res.status(500).json({message:"Error occured"});
    }

        return res.status(200).json({admins});

};


export const addAdmin = async (req,res,next) => {
    const {email,password} = req.body;
    if( !email && email.trim()==="" && !password && password.trim()==="")
    {
         return req.status(422).json({message:"Invalid Inputs !"});
    }

    let existingAdmin;
   
    try {
        existingAdmin=await Admin.findOne({email});
    } catch (error) {
        return console.log(error);
        
    }

    if(existingAdmin){
        return res.status(400).json({message:"Admin already Exists!"});
    }

    const hashedPassword = bcrypt.hashSync(password);  

    let admin;

    try{
        admin = new Admin({email,password : hashedPassword});
        admin=await admin.save(); 
    }
    catch(err){
        return console.log(err);
    }
    if(!admin){
        return res.status(500).json({message:"Something went wrong !"});
    }

        return res.status(201).json({admin});
};


export const adminLogin = async (req,res,next) => {
    const {email,password} = req.body;
    if( !email && email.trim()==="" && !password && password.trim()==="")
    {
         return req.status(422).json({message:"Invalid Inputs !"});
    }

    let existingAdmin;
   
    try {
        existingAdmin=await Admin.findOne({email});
    } catch (error) {
        return console.log(error);

    }

    if(!existingAdmin){
        return res.status(400).json({message:"Admin with this ID doesnt exit  !"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password , existingAdmin.password);


    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"});
    }

    const token = jwt.sign( {id:existingAdmin._id},process.env.SECRET_KEY,{
        expiresIn:"2d"
    }); 

    return res.status(200).json({message:"Login Successfull",token,id:existingAdmin._id});
};


export const getAdminById = async (req, res, next) => {
    const id = req.params.id;
  
    let admin;
    try {
      admin = await Admin.findById(id).populate("addedEvents");
    } catch (err) {
      return console.log(err);
    }
    if (!admin) {
      return console.log("Cannot find Admin");
    }
    return res.status(200).json({ admin });
  };