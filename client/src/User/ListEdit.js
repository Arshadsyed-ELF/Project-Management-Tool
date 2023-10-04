import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import UserNavBar from './UserNavBar'

const ListEdit = () => {
      const [title,setTitle]=useState()
      const [date,setDate]=useState('')
     const [status,setStatus]=useState([])

      let {id}=useParams()
      console.log(id)
      let navigate=useNavigate()
      console.log(id)
    
    
    
      useEffect(()=>{
        axios.get('http://localhost:7000/tasks/'+id)
         .then((resp)=>{
        console.log(resp)
        setTitle(resp.data.title)
        setDate(resp.data.date)
        setStatus(resp.data.status)
          })
         .catch(()=>{
           console.log(" DIDNT GET")
         })
         },[])
    
    
         
        let formHandle=(e)=>{
          e.preventDefault();
          let payload = { title,date,status }
              axios.put(`http://localhost:7000/api/tasks/edit/${id}`,payload)
              .then((res)=>{
                  console.log(res)
            alert("data updated successfully")
              })
              navigate("/list")
          }
  return (
    <div>
        <UserNavBar/> 
     <div style={{padding:"50px",}} >     
<form onSubmit={formHandle}>
      
     <label>Title</label> <br/>
      <input placeholder=" Title" onChange={(e)=> setTitle(e.target.value)}  value={title}/><br/> 
      <label>Deadline</label> <br/>
      <input placeholder=" deadline" onChange={(e)=> setDate(e.target.value)}  value={date} /><br/>
      <label>Status</label> <br/>
      <input placeholder=" Status" onChange={(e)=> setStatus(e.target.value)}  value={status} /> <br/>
  
     
      <button  style={{border:"1 px solid",background:"blue",color:"white",height:"30px",width:"85px"}}>Update</button>

</form>
</div>  
    </div>
  )
}

export default ListEdit