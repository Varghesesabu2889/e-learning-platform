import React, { useEffect, useState } from 'react';
import './AdminCourses.css';
import { useNavigate } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import CourseCards from '../../components/courseCard/CourseCards';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../main';
import Layout from '../utlis/Layout';

const AdminCourses = ({ user }) => {
    const categories = [
        'Frontend Development',
        'Backend Development',
        'Full Stack Development',
        'Mobile Development',
        'Web Developer',
        'Data Science',
        'Machine Learning',
        'Artificial Intelligence',
        'DevOps',
        'UI/UX Design',
        'Cyber Security',
        'Cloud Computing',
        'Blockchain',
        'English Learning',
        'Business',
        'Excel',
        'Python',
        'Java',
        'C++',
        'C#',
        'JavaScript',
        'React',
        'Angular',
        'Vue',
        'PHP',
        'SQL',
        'HTML',
        'CSS',
        'Internet of Things (IoT)',
        'Game Development',
        'AR/VR Development',
        'Embedded Systems',
        'Big Data',
        'Business Intelligence',
        'Project Management',
        'Software Testing',
        'Digital Marketing',
        'SEO',
        'Content Writing',
        'Graphic Design',
        'Product Management',
        'Salesforce',
        'SAP',
        'Oracle',
        'IT Support',
        'Network Administration'
    ];

    const navigate = useNavigate();
    const { courses, fetchCourses } = CourseData();

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate('/');
        }
    }, [user, navigate]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [duration, setDuration] = useState("");
    const [image, setImage] = useState("");
    const [imagePrev, setImagePrev] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const myForm = new FormData();
        myForm.append("title", title);
        myForm.append("description", description);
        myForm.append("category", category);
        myForm.append("price", price);
        myForm.append("createdBy", createdBy);
        myForm.append("duration", duration);
        myForm.append("file", image);

        try {
            const { data } = await axios.post(`${server}/api/course/new`, myForm, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            toast.success(data.message);
            setBtnLoading(false);
            await fetchCourses();
            setTitle("");
            setDescription("");
            setCategory("");
            setPrice("");
            setCreatedBy("");
            setDuration("");
            setImage("");
            setImagePrev("");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <Layout>
            <div className='admin-courses'>
                <div className="left">
                    <h1>All Courses</h1>
                    <div className="dashboard-content">
                        {courses && courses.length > 0 ? courses.map((e) => {
                            return <CourseCards key={e._id} course={e} />;
                        }) : <p>No Courses</p>}
                    </div>
                </div>
                <div className="right">
                    <div className="add-course">
                        <div className="course-form">
                            <h1>Add Course</h1>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="title">Title</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Course Title' required />

                                <label htmlFor="description">Description</label>
                                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder='Course Description' required />

                                <label htmlFor="category">Category</label>
                                <select id="category" value={category} onChange={e => setCategory(e.target.value)} required>
                                    <option value="" disabled>Select Category</option>
                                    {categories.map((e) => (
                                        <option key={e} value={e}>{e}</option>
                                    ))}
                                </select>

                                <label htmlFor="price">Price</label>
                                <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder='Course Price in ₹' required />

                                <label htmlFor="createdBy">Created By</label>
                                <input type="text" value={createdBy} onChange={e => setCreatedBy(e.target.value)} placeholder='Course Created By' required />

                                <label htmlFor="duration">Duration</label>
                                <input type="text" value={duration} onChange={e => setDuration(e.target.value)} placeholder='Course Duration' required />

                                <input type="file" required onChange={handleImageChange} />
                                {imagePrev && <img src={imagePrev} alt='' width={300} />}
                                <button type="submit" disabled={btnLoading} className='common-btn'>
                                    {btnLoading ? 'Please Wait...' : 'Add Course'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminCourses;
