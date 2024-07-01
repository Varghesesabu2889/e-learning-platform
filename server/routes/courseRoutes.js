import express from "express";
import {  checkout, getAllCourses, getAllLecture, getMyCourses, getSingleCourse, getSingleLecture, paymentVerification } from "../controllers/courseController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router()


router.get("/courses/all",getAllCourses)
router.get("/course/:id",getSingleCourse)
router.get("/lectures/:id",isAuth,getAllLecture)
router.get("/lecture/:id",isAuth,getSingleLecture)
router.get("/myCourse",isAuth,getMyCourses)
router.post("/course/checkout/:id",isAuth,checkout)
router.post("/verification/:id",isAuth,paymentVerification)









export default router