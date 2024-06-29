import React  from 'react'
import './account.css'
import '../../App.css'
import {MdDashboard} from 'react-icons/md'
import { HiOutlineLogout } from "react-icons/hi";
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Account = ({user}) => {

  const {setIsAuth, setUser} = UserData()
const navigate = useNavigate()
const handleLogout = async()=>{
localStorage.clear()
setUser([])
setIsAuth(false)
navigate("/")
toast.success("Log Out Successfully")

}


  return (
    <div>
      { user && (
        <div className="profile">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Name:</strong>
             {user.name}
             </p>
             <p>
            <strong>Email:</strong>
            {user.email}
             </p>
  <button className='common-btn1' onClick={()=>navigate(`/${user._id}/dashboard`)}>
  <MdDashboard/>
    Dashboard 
  </button>
  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
  <button className='common-btn2' onClick={handleLogout}>
  <HiOutlineLogout/>
    Logout 
  </button>
  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

  {
    user.role === "admin" && (
      <button className='common-btn' onClick={()=>navigate(`/admin/dashboard`)}>
  <MdDashboard/>
Admin Dashboard 
  </button>
    )
  }
  
        </div>
  
      </div>
      )}
    </div>
  )
}

export default Account