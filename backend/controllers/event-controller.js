import mongoose from "mongoose";
import Event from "../models/Event";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

export const addEvent = async (req, res,next) => {

    const extractedToken = req.headers.authorization.split(' ')[1];

    if(!extractedToken  && extractedToken.trim===""){
      return res.status(404).json({message:"Token invalid "});
    }

    let adminId;


  jwt.verify( extractedToken,process.env.SECRET_KEY,async (err,decrypted)=>{
  
      if(err){
      return res.status(400).json({message:`${err.message}`});
      }else{
     adminId=decrypted.id;
     return;
     }
  });

 

  const {title,description,date,posterURL, featured } = req.body;

  if (!title || title.trim() === "" || !description || description.trim() === "" || !posterURL || posterURL.trim() === "")
  {
    return res.status(422).json({message:"Invalid inputs"});
  }

  let event;
  try {
    
    event = new Event({title,description,date : new Date (`${date}`),posterURL, featured , admin:adminId});
   
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
   
    await event.save({session});
    adminUser.addedEvents.push(event);
    await adminUser.save({session});
    await session.commitTransaction();

  } catch (err) {
    console.log(err);
  }

  if(!event){
      return res.status(500).json({message:"Request Failed!"});
  }
  return res.status(201).json({event});
};

export const getAllEvents = async(req,res,next)=>{
    let events;
    try {
      events = await Event.find();
    } catch (error) {
      return console.log(error);
    }
    if(!events){
      return res.status(500).json({message:"Request Failed"});
    }

    return res.status(200).json({events});
}

export const getEventById = async (req,res,next) => {
  const id=req.params.id;
  let event;
  try {
      event = await Event.findById(id);
  } catch (err) {
      return console.log(err);
  }

  if(!event){
      return res.status(404).json({message:"Wrong Event Id !"});
  }

      return res.status(201).json({event});
};


