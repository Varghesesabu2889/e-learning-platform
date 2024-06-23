import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/courseModel.js";
import { Lecture } from "../models/LectureModel.js";
import User from '../models/userModel.js';

export const getAllCourses = TryCatch(async(req,res)=>{
    const courses = await Courses.find()
    res.status(200).json({
        courses,
    })       
})
export const getSingleCourse = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id)
    res.json({
        course,
    })

})

export const getAllLecture =TryCatch(async(req,res)=>{
    const lectures = await Lecture.find({course:req.params.id})

    const user = await User.findById(req.user._id)

    if(user.role === 'admin'){
        return res.json({
            lectures
        })
 }
 if(!user.subscription.includes(req.params.id))
    return res.status(400).json({
message:"You are not subscribed to this course"
    })
res.json({
    lectures
})    
})
