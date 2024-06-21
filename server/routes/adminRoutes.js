import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { createCourse } from "../controllers/adminController.js";

const router = express.Router()


router.post("/course/new",isAuth,createCourse)



export default router