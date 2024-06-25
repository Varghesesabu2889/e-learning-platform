import React from 'react'
import './courses.css'
import { CourseData } from '../../context/CourseContext'
import CourseCards from '../../components/courseCard/CourseCards'

const Courses = () => {
  const { courses } = CourseData()

  return (
    <div className="courses">
      {courses && courses.length > 0 ? (
        <>
          <h2>Available Courses</h2>
          <div className="courses__container">
            {courses.map((course) => (
              <CourseCards key={course.id} course={course} />
            ))}
          </div>
        </>
      ) : (
        <h3>No Courses Available</h3>
      )}
    </div>
  )
}

export default Courses
