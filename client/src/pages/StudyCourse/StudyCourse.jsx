import React, { useEffect } from 'react';
import './StudyCourse.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';

const StudyCourse = ({ user }) => {
  const { id } = useParams();  
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(id)) {
      navigate("/");
    } else {
      fetchCourse(id);
    }
  }, [id, fetchCourse, user, navigate]);

  return (
    <>
      {course && (
        <div className='course-study-page'>
          <img src={`${server}/${course.image}`} alt={course.title} width={350} />
          <h1>{course.title}</h1>
          <h4>{course.description}</h4>
          <h5>by - {course.createdBy}</h5>
          <h5>Duration - {course.duration}weeks</h5>
          <Link to={`/lectures/${course._id}`}><h2>Lectures</h2></Link>
        </div>
      )}
    </>
  );
};

export default StudyCourse;
