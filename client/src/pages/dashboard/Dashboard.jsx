import React from 'react'
import './dashboard.css'
import { CourseData } from '../../context/CourseContext'
import CourseCards from '../../components/courseCard/CourseCards'
const Dashboard = () => {
    const {myCourse} = CourseData()
  return (
    <div className='student-dashboard'>
      <h2>All Enrolled Courses</h2>
      <div className='dashboard-content'>
        {
          myCourse.map && myCourse.length > 0 ? myCourse.map((e)=>(
            <CourseCards key={e._id}
            course={e}/>
          )): <p>No Course Enrolled Yet</p>
        }
      </div>
    </div>
  )
}

export default Dashboard