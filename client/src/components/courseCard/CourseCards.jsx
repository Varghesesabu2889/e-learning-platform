import React from 'react'
import './courseCard.css'
import { server } from '../../main'
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'


const CourseCards = ({course}) => {
    const {user,isAuth }=UserData()
    const navigate = useNavigate()
  return (
   <div className="course-card">
    <img src={`${server}/${course.image}`} alt="" className='course-image' />
   <center>
   <h3>{course.title}</h3>
    <p>Instructor - {course.createdBy}</p>
    <p>Duration- {course.duration} weeks</p>
    <p>Price - ₹{course.price}</p>
    {isAuth ?(
        <>
        {user &&  user.role !== "admin" ? (
        <>
        {
            user.subscription.includes(course._id) 
            ? (
            <button onClick={()=>navigate(`/course/study/${course._id}`)}
             className='common-btn1'>
                Study</button>

            ):(
            <button
             className='common-btn' 
             onClick={()=>navigate(`/course/${course._id}`)}>
                Enroll Now</button>
        )}
        </>
        ):( 
          <button 
          onClick={()=>navigate(`/course/study/${course._id}`)}
           className='common-btn'>
            Study
            </button>
)}
        </>
      )  : (
      <button onClick={()=>navigate('/login')} className='common-btn'>Get Started</button>
        
    )}
    &nbsp; &nbsp; &nbsp;
   {
    user && user.role === "admin"  && 
    <button className='common-btn2'>Delete</button>
   }
   </center>

   </div>
  )
}

export default CourseCards