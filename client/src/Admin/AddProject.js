import React ,{useState}from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../User/project.css'
import Sidebar from '../User/Sidebar';


const AddProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    let navigate =useNavigate()

    let handleSubmit = (e) => {
    e.preventDefault()
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const userName = JSON.parse(localStorage.getItem('user')).name;

    console.log(userId)
    let payload = {title, description,userId,userName }
    axios.post("http://localhost:7000/add-project", payload)
  .then(result => {console.log(result)
    alert("project created")
  navigate('/projects')
// if(title <=0)
// {
//   alert("cant empty")
// }
})
        .catch(err => console.log("failed to add"))
    navigate('/projects')
        }
  return (
    <div style={{display:"flex"}} >
      <Sidebar/>
             <section style={{paddingTop:"150px",paddingLeft:"40%"}}>
        <div className="add-classroom-container" style={{backgroundColor:"darkcyan",width:"350px"}} >
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Project Name" value={title} onChange={(e) => setTitle(e.target.value)}  required/> <br/>

        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
   {/* <label style={{justifyContent:"flex-start",display:"flex"}}>Current Status</label>
        <select style={{border:"1px solid dark"}} > 
          <option >Todo</option>
          <option >In progress</option>
          <option >Completed</option>
        </select> <br/> */}
        <button type="submit">Create Project</button>
      </form>
      </div>
      </section>
    </div>
  )
}

export default AddProject