import React from 'react'
import './testimonials.css'
import test1 from '../../assets/testimonials/test6.png'
import test2 from '../../assets/testimonials/test1.png'
import test4 from '../../assets/testimonials/test2.png'
import test5 from '../../assets/testimonials/test7.png'
import test6 from '../../assets/testimonials/test3.png'
import test8 from '../../assets/testimonials/test4.png'
import test7 from '../../assets/testimonials/test8.png'
import test3 from '../../assets/testimonials/test5.png'

const Testimonials = () => {
    const testimonialData = [
        {
          "id": 1,
          "name": "Emily R.",
          "position": "student",
          "message": "I was able to learn so much from Skill Academy and apply it to my own projects. The instructors were knowledgeable and supportive.",
          "image": test1
        },
        {
          "id": 2,
          "name": "David K.",
          "position": "student",
          "message": "I was hesitant to take an online course, but Skill Academy exceeded my expectations. The community was engaging and helpful.",
          "image": test2
        },
        {
          "id": 3,
          "name": "Rachel T.",
          "position": "student",
          "message": "I've taken many online courses, but this one was by far the most comprehensive and well-structured. I highly recommend it.",
          "image": test3
        },
        {
          "id": 4,
          "name": "John S.",
          "position": "student",
          "message": "The course content at Skill Academy was practical and easy to understand. It helped me gain confidence in my coding abilities.",
          "image": test4
        },
        {
          "id": 5,
          "name": "Jessica M.",
          "position": "student",
          "message": "The hands-on projects at Skill Academy were my favorite part. They allowed me to apply what I learned in real-world scenarios.",
          "image": test5
        },
        {
          "id": 6,
          "name": "Michael L.",
          "position": "student",
          "message": "The course materials at Skill Academy were well-organized, and the pace was just right. I felt challenged but not overwhelmed.",
          "image": test6
        },
        {
          "id": 7,
          "name": "Sarah G.",
          "position": "student",
          "message": "Skill Academy provided a solid foundation for understanding complex coding concepts. I feel ready to take on more advanced projects.",
          "image": test7
        },
        {
          "id": 8,
          "name": "Alex B.",
          "position": "student",
          "message": "I appreciated the practical exercises and real-world examples at Skill Academy. They made learning enjoyable and effective.",
          "image": test8
        }
      ]
      
  return (
    <section className="testimonials">
    <h2>What Our Students Say</h2>
    <div className="testimonial-container">
      {testimonialData.map((testimonial) => (
        <div className="testimonial-card" key={testimonial.id}>
          <div className="student-image">
            <img src={testimonial.image} alt={testimonial.name} />
          </div>
          <p className="message">{testimonial.message}</p>
          <div className="info">
            <p className="name">{testimonial.name}</p>
            <p className="position">{testimonial.position}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}

export default Testimonials