import React from 'react'
import "./sidebar.css"
import { Link, useNavigate } from 'react-router-dom'
import NavBar from './UserNavBar'
import { FaPlusCircle } from 'react-icons/fa'

const Sidebar = () => {
  const navigate=useNavigate()
  function Logout(){
    localStorage.clear()
    navigate("/login")
  }
  
  return (
    <div>
    
    <div class="sidebar">
      <div style={{color:"white",display:"flex",justifyContent:'space-around'}} >
       
    <span style={{fontSize:"30px"}}>Projects</span> <Link to="/boardadd"><FaPlusCircle/></Link>
    </div> 
    <br/>
    <Link to='/board'>My Projects</Link>
    <Link to='/profile'>Profile</Link>
    <Link onClick={Logout}  to='/login' >Logout</Link>

</div>



    </div>
  )
}

export default Sidebar