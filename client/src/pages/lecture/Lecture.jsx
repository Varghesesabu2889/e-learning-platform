import React, { useEffect, useState } from 'react';
import './lecture.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { id } = useParams();

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function fetchLecture(lectureId) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${lectureId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (err) {
      console.log(err);
      setLecLoading(false);
    }
  }

  async function deleteLecture(lectureId) {
    try {
      await axios.delete(`${server}/api/lecture/${lectureId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(lectures.filter(lec => lec._id !== lectureId));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchLectures();
  }, [id]);

  return (
    <>
      {loading ? <Loading /> : (
        <div className="lecture-page">
          <div className="left">
            {lecLoading ? <Loading /> : (
              <>
                {lecture.video ? (
                  <>
                    <video 
                      src={`${server}/${lecture.video}`} 
                      width={"100%"}
                      controls
                      controlsList='nodownload noremoteplayback'
                      disablePictureInPicture
                      disableRemotePlayback
                      autoPlay
                    ></video>
                    <h1>{lecture.title}</h1>
                    <h3>{lecture.description}</h3>
                  </>
                ) : <h1>Please Select a Lecture</h1>}
              </>
            )}
          </div>
          <div className="right">
            {user && user.role === "admin" && (
              <button 
                className='common-btn11'
                onClick={() => setShow(!show)}
              >
                {show ?"Close":"Add Lecture +"}
              </button>
            )}
            {show && (
              <div className="lecture-form">
                <h2>Add Lecture</h2>
                <form>
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" id="title" placeholder="Enter title" required />
                  <label htmlFor="desc">Description</label>
                  <input type="text" name="desc" id="desc" placeholder="Enter description" required />
                  <label htmlFor="video">Video</label>
                  <input type="file" name="video" id="video" placeholder='Choose video' accept="video/*" required />
                  <button type='submit' className='common-btn1'>Add</button>
                </form>
              </div>
            )}
            {lectures && lectures.length > 0 ? lectures.map((e, i) => (
              <div key={i}>
                <div 
                  onClick={() => fetchLecture(e._id)} 
                  className={`lecture-number ${lecture._id === e._id && "active"}`}
                >
                  {i + 1}. {e.title}
                </div>
                {user && user.role === "admin" && (
                  <button 
                    className="common-btn2" 
                    onClick={() => deleteLecture(e._id)}
                  >
                    Delete {e.title}
                  </button>
                )}
              </div>
            )) : <p>No Lectures Yet...</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
