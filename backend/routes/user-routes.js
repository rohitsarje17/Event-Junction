import express from "express";
import { getAllUsers, deleteUser, getBookingOfUser, getUserById, login, signUp, updateUser } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/",getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signup",signUp);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser);
userRouter.post("/login",login);
userRouter.get("/bookings/:id",getBookingOfUser);

export default userRouter;