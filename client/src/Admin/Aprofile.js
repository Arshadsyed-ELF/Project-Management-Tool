
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import '../User/profile.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Asidebar from './Asidebar'

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

const Aprofile = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const navigate =useNavigate()
  // const [value, onChange] = useState<Value>(new Date());

  const get=localStorage.getItem('user')


  
axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:9000/getuser')
    .then(res=>{
      if(res.data.valid){
        setName(res.data.name)
        setEmail(res.data.email)
      } else{
        navigate('/login')
      }
    })
    .catch(err=>console.log(err))
  },[])
  return (
    <div>
        <Asidebar/>
        <section>
      <div >
      {/* <Calendar onChange={onChange} value={value} /> */}
      
      <h1 >Profile Card</h1>
      <div className="student-profile" style={{position:"fixed",marginTop:"50px",marginLeft:"40%"}}>
       <h1 > name:  {JSON.parse(get).name}  </h1>  
        <p> email: {JSON.parse(get).email}   </p>
    
       
        {/* <Button  ><Link to={`/sprofileedit/${id}`} style={{textDecoration:"none",color:"white"}}>EDIT</Link></Button> <span></span> <span></span> <span></span> */}

       </div>
       </div>
    </section>
         
    
    </div>
  )
}

export default Aprofile
