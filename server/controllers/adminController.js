import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/courseModel.js";

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