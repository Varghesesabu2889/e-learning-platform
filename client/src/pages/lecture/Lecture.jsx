import React, { useEffect, useState } from 'react';
import './lecture.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';
import toast from 'react-hot-toast';

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(id)) {
      navigate('/');
    } else {
      fetchLectures();
    }
  }, [id, user, navigate]);

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

  async function deleteLecture(id) {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  }

  const handleChangeVideo = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };



  const handleSubmit = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(`${server}/api/course/${id}`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (err) {
      toast.error(err.response.data.message);
      setBtnLoading(false);
    }
  };

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
                {show ? "Close" : "Add Lecture +"}
              </button>
            )}
            {show && (
              <div className="lecture-form">
                <h2>Add Lecture</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                  />
                  <label htmlFor="desc">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    name="desc"
                    id="desc"
                    placeholder="Enter description"
                    required
                  />
                  <label htmlFor="video">Video</label>
                  <input
                    type="file"
                    name="video"
                    id="video"
                    onChange={handleChangeVideo}
                    placeholder='Choose video'
                    accept="video/*"
                    required
                  />
                  {videoPrev && <video src={videoPrev} alt="" width={300} controls></video>}
                  <button disabled={btnLoading} type='submit' className='common-btn1'>
                    {btnLoading ? "Please Wait..." : "Add"}
                  </button>
                </form>
              </div>
            )}
            {lectures && lectures.length > 0 ? lectures.map((e, i) => (
              <div key={e._id}>
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
