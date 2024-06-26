import React, { useEffect, useState } from 'react';
import './courseDescription.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
import Loading from '../../components/loading/Loading';

const CourseDescription = ({user}) => {
  const params = useParams();
  const { fetchCourse, course,fetchCourses } = CourseData();
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const {fetchUser} = UserData()

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id, fetchCourse]);

  const handleCheckout = async ()=>{
 const token = localStorage.getItem("token")
 setLoading(true)
 const {data:{order}
} = await axios.post(`${server}/api/course/checkout/${params.id}`,{
  headers: {
    token,
},
}
)
const  options = {
    "key": "rzp_test_iYYSSCCDE8nRrW", // Enter the Key ID generated from the Dashboard
  "amount": order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": "INR",
  "name": "Skill Academy", //your business name
  "description": "Skill Academy is an online e-learning platform comprised of passionate developers, designers, and entrepreneurs dedicated to creating innovative solutions that positively impact people's lives.",
  "image": "../../assets/designs/developers.png",
  "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

handler: async function(response){
  const {  razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature, } = response;
    try {
      const {data} = await axios.post(
      `${server}/api/verification/:${params.id}`,{
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
      {
        headers: {
          token,
        },
      }
    )
    await fetchUser();
    await fetchCourses();
    toast.success(data.message);
    setLoading(false)
    navigate(`/payment-success/${razorpay_order_id}`)
    } catch (err) {
      toast.error(err.response.data.message)
      setLoading(false)
    }},
    theme:{
       color: "#3399cc"
    }
}
const razorpay =  new window.Razorpay(options)

razorpay.open
}
  return (
<>
{
  loading ? <Loading /> :
  (
    <>
    {
        course && (<div className="course-description">
            <div className="course-header">
                <img src={`${server}/${course.image}`} alt=""
                 className='course-image'/>
                 <div className="course-info">
                    <h2>{course.title}</h2>
                    <p>Instructor:{course.createdBy}</p>
                    <p>Duration:{course.duration}weeks</p>
                    
                    <p>{course.description}</p>


                 </div>
                 <p>Let's get started with course At ₹{course.price}</p>


                 {
                  user && user.subscription.includes(course._id) ?
                  <button onClick={()=>navigate(`/course/study/${course._id}`)}
                   className='common-btn'>Study</button>
                  :
                  <button onClick={handleCheckout} className='common-btn1'>Buy Now</button>

                 }
            </div>
            
        </div>
    )}
    </>
  )
}

</>



  )
  };


export default CourseDescription;
