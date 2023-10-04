import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Asidebar from './Asidebar'

const UserEdit = () => {
      const [name,setName]=useState()
      const [email,setEmail]=useState('')

      let {id}=useParams()
      console.log(id)
      let navigate=useNavigate()
      console.log(id)
    
    
    
      useEffect(()=>{
        axios.get('http://localhost:7000/user/'+id)
         .then((resp)=>{
        console.log(resp)
        setName(resp.data.name)
        setEmail(resp.data.email)
          })
         .catch(()=>{
           console.log(" DIDNT GET")
         })
         },[])
    
    
         
        let formHandle=(e)=>{
          e.preventDefault();
          let payload = { name,email }
              axios.put(`http://localhost:7000/user/edit/${id}`,payload)
              .then((res)=>{
                  console.log(res)
            alert("data updated successfully")
              })
              navigate("/users")
          }
  return (
    <div>
       <Asidebar/>

     <div  >  
        <h1>Update User</h1>   
<form onSubmit={formHandle} style={{background:"skyblue",height:"200px",width:"250px",marginLeft:"40%",marginTop:"150px",paddingTop:"20px"}}>
      
     <label>Name</label> <br/>
     <input placeholder="name" onChange={(e)=> setName(e.target.value)}  value={name} /><br/>
      
      <label>Email</label> <br/>
      <input placeholder=" Email" onChange={(e)=> setEmail(e.target.value)}  value={email}/><br/> 
     <br/>
     
      <button  style={{border:"1 px solid",background:"blue",color:"white",height:"30px",width:"85px"}}>Update</button>

</form>
</div>  
    </div>
  )
}

export default UserEdit