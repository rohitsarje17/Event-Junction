import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import eventRouter from "./routes/event-routes";
import path from "path";
import bookingsRouter from "./routes/booking-routes";
import cors from "cors";


dotenv.config();
const app = express();

// Middleware for CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/event", eventRouter);
app.use("/booking", bookingsRouter);

// MongoDB connection
mongoose
  .connect(
    `mongodb+srv://rohit:${process.env.MONGODB_PASSWORD}@cluster0.oqmsphm.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8000, () => {
      console.log("Server started !");
      console.log(`Connected to the port ${8000}`);
    });
  })
  .catch((e) => console.log(e));
