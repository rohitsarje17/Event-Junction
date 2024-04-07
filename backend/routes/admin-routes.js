import express from "express";
import { addAdmin, adminLogin, allAdmins, getAdminById } from "../controllers/admin-controller";

const adminRouter = express.Router();

adminRouter.get("/",allAdmins);
adminRouter.post("/signup",addAdmin);
adminRouter.post("/login",adminLogin);
adminRouter.get("/:id", getAdminById);

export default adminRouter;