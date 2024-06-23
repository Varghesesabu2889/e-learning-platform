import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/courseModel.js";
import { Lecture } from "../models/LectureModel.js";
import {rm} from 'fs'
import { promisify } from "util"
import fs from 'fs';
import User  from '../models/userModel.js';



export const createCourse = TryCatch(async(req,res)=>{
    const{title,description,price,duration,category,createdBy,createdAt}=req.body

    const image =req.file;
    
    await Courses.create({
        title,
        description,
        category,
        createdBy,
        image:image?.path,
        duration,
        price,
        createdAt
       })
res.status(201).json({
    message:"Course created successfully"
})

    })

export const addLectures = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id)

if(!course)
    return res.status(404).json({
message:"Course not found with this id"
    })

const{title,description}=req.body

const file = req.file

const lecture = await Lecture.create({
    title,
    description,
    video:file?.path,
    course:course._id,

})

res.status(201).json({
    message:"Lecture added successfully",
    lecture,
})


}) 

export const deleteLecture = TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id)   

    rm(lecture.video,()=>{
        console.log("Video deleted ");
    })
    await lecture.deleteOne()
    res.status(200).json({
        message:"Lecture deleted successfully"
    })

})

const unlinkAsync = promisify(fs.unlink);
const rmAsync = promisify(fs.rm);


export const deleteCourse = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    const lectures = await Lecture.find({ course: course._id });

    await Promise.all(
        lectures.map(async (lecture) => {
            await unlinkAsync(lecture.video);
            console.log("Video deleted");
        })
    );

    if (course.image) {
        await rmAsync(course.image);
        console.log("Image deleted");
    }

    await Lecture.deleteMany({ course: req.params.id });
    await course.deleteOne();
    await User.updateMany({}, { $pull: { subscription: req.params.id } });

    res.json({
        message: "Course deleted successfully"
    });
});

export const getAllStats = TryCatch(async(req,res)=>{
 const totalCourses = (await Courses.find()).length;
 const totalLectures = (await Lecture.find()).length;
 const totalUsers = (await User.find()).length;

  const stats ={
    totalCourses,
    totalLectures,
    totalUsers
  };
  res.json(
    stats,
    
  )
})