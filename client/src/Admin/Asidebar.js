import React from 'react'
// import "./sidebar.css"
import "../User/sidebar.css"

import { Link, useNavigate } from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa'

const Asidebar = () => {
  const navigate=useNavigate()

  function Logout(){
    localStorage.clear()
    navigate('/alogin')
  }
  
  return (
    <div>
    
    <div class="sidebar">
      <div style={{color:"white",display:"flex",justifyContent:'space-around'}} >
       
    <span style={{fontSize:"30px"}}>ADMIN </span> 
    </div> 
    <br/>
    <Link to='/asummary'>Summary</Link>
    <Link to='/users'>Users</Link>
    <Link to='/projects'> Projects</Link>
    <Link to='/acalender'> Calendar</Link>
    <Link to='/aprofile'>Profile</Link>
    <Link onClick={Logout}  to='/alogin' >Logout</Link>
   

</div>



    </div>
  )
}

export default Asidebar