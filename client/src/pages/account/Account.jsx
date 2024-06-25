import React from 'react'
import './account.css'
import '../../App.css'
import {MdDashboard} from 'react-icons/md'

const Account = () => {
  return (
    <div className="profile">
      <h2>My Profile</h2>
      <div className="profile-info">
        <p>
          <strong>Name:</strong>
           Varghese Sabu
           </p>
           <p>
          <strong>Email:</strong>
           varkeychan369@gmail.com
           </p>
<center>
<button className='common-btn2'>
<MdDashboard/>
  Dashboard 
</button>
  </center>  

      </div>

    </div>
  )
}

export default Account