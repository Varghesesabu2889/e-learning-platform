import React from 'react'
import './dashboard.css'
import { CourseData } from '../../context/CourseContext'
const Dashboard = () => {
    const {myCourse} = CourseData()
    console.log(myCourse);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard