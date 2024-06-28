import React from 'react'
import './dashboard.css'
import { CourseData } from '../../context/CourseContext'
const Dashboard = () => {
    const {myCourse} = CourseData()
  return (
    <div className='student'>Dashboard</div>
  )
}

export default Dashboard