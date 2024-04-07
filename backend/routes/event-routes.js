import express from "express";
import { addEvent, getAllEvents, getEventById } from "../controllers/event-controller";

const eventRouter = express.Router();

eventRouter.get("/",getAllEvents);
eventRouter.get("/:id",getEventById);
eventRouter.post("/",addEvent);

export default eventRouter;