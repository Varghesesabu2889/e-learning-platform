import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/courseModel.js";
import { Lecture } from "../models/LectureModel.js";

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
