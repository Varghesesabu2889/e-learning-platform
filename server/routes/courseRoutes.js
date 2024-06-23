import express from "express";
import { getAllCourses, getAllLecture, getSingleCourse } from "../controllers/courseController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router()


router.get("/courses/all",getAllCourses)
router.get("/course/:id",getSingleCourse)
router.get("/lecture/:id",isAuth,getAllLecture)








export default router