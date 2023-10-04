import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Sidebar from './Sidebar'
import './profile.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

const Profile = () => {
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
        <Sidebar/>
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

export default Profile



  //     <div >
  //       <UserNavBar/>
  //       <div style={{marginLeft:"100px"}}>
  //     <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8" >
  //       {/* <Button onClick={()=>navigate('/boardadd')}>Add</Button> */}
  //       <h1 className="text-3xl font-semibold mb-4">Projects Board</h1>
  //       <div className="w-full max-w-6xl flex justify-between">
          // <div className="w-1/3 p-4">
          //   <div className="bg-white rounded shadow-md p-4">
          //     <h2 className="text-xl font-semibold mb-2">To Do ({todoCount})</h2>
          //     {tasks.map(task => task.status === 'todo' && (
          //       <div key={task._id} className="bg-blue-100 p-2 mb-2 rounded">
          //         <h4>Title:</h4>
          //         <strong className="text-gray-800">{task.title}</strong>
          //         <h5 style={{ justifyContent: "flex-start", display: "flex" }}>Description:</h5>
          //         <p>{task.description}</p>
          //         <h6 style={{ justifyContent: "flex-start", display: "flex" }}>started date:</h6>
          //         <p>{task.registrationDate}</p>
          //         <h6 style={{ justifyContent: "flex-start", display: "flex" }}>DeadLine:</h6>
          //         <p>{task.date}</p>
          //         {/* <p className="text-gray-800">{task.description}</p> */}
          //         <div className="mt-2">
          //           <h5 className="text-lg font-semibold ">Subtasks:</h5>
  
          //           {task.subtasks.map((subtask, index) => (
          //             <div key={index} className="kanban-subtask">
          //               <input
          //                 type="checkbox"
          //                 checked={subtask.completed}
          //                 onChange={() => toggleSubtaskCompletion(task._id, index)}
          //               />
          //               <p>{subtask.title}</p>
          //               <button
          //                 onClick={() => deleteSubtask(task._id, index)}
          //                 className="kanban-delete-subtask-button"
          //               >
          //                 <FaTrash />
          //               </button>
          //             </div>
          //           ))}
          //           <div className="flex items-center mt-2">
          //             <input
          //               type="text"
          //               value={newSubtask}
          //               onChange={e => setNewSubtask(e.target.value)}
          //               placeholder="New Subtask"
          //               className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          //             />
          //             <button
          //               onClick={() => createSubtask(task._id)}
          //               className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600"
          //             >
          //               Add
          //             </button>
          //           </div>
          //         </div>
          //         <button
          //           onClick={() => moveTask(task._id, 'inProgress')}
          //           className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
          //         >
          //           Move to In Progress
          //         </button>  <br />
          //         <button
          //           onClick={() => deleteTask(task._id)}
          //           className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          //         >
          //           Delete
          //         </button>
          //       </div>
          //     ))}
          //   </div>
          // </div>
          // <div className="w-1/3 p-4">
          //   <div className="bg-white rounded shadow-md p-4">
          //     <h2 className="text-xl font-semibold mb-2">In Progress ({inProgressCount})</h2>
          //     {tasks.map(task => task.status === 'inProgress' && (
          //       <div key={task._id} className="bg-yellow-100 p-2 mb-2 rounded">
          //         <p className="text-gray-800">{task.title}</p>
  
          //         {task.subtasks.map((subtask, index) => (
          //           <div key={index} className="kanban-subtask">
          //             <input
          //               type="checkbox"
          //               checked={subtask.completed}
          //               onChange={() => toggleSubtaskCompletion(task._id, index)}
          //             />
          //             <p>{subtask.title}</p>
          //             <button
          //               onClick={() => deleteSubtask(task._id, index)}
          //               className="kanban-delete-subtask-button"
          //             >
          //               <FaTrash />
          //             </button>
          //           </div>
          //         ))}
          //         <button
          //           onClick={() => moveBack(task._id)}
          //           className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          //         >
          //           Move Back
          //         </button>
          //         <button
          //           onClick={() => moveTask(task._id, 'completed')}
          //           className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600" style={{ marginLeft: "21px", marginBottom: "15px", marginTop: "10px" }}
          //         >
          //           Move to Completed
          //         </button>  <br />
          //         <button
          //           onClick={() => deleteTask(task._id)}
          //           className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          //         >
          //           Delete
          //         </button>
          //       </div>
          //     ))}
          //   </div>
          // </div>
          // <div className="w-1/3 p-4">
          //   <div className="bg-white rounded shadow-md p-4">
          //     <h2 className="text-xl font-semibold mb-2">Completed ({completedCount})</h2>
          //     {tasks.map(task => task.status === 'completed' && (
          //       <div key={task._id} className="bg-green-100 p-2 mb-2 rounded">
          //         <p className="text-gray-800">{task.title}</p>
  
          //         {task.subtasks.map((subtask, index) => (
          //           <div key={index} className="kanban-subtask">
          //             <input
          //               type="checkbox"
          //               checked={subtask.completed}
          //               onChange={() => toggleSubtaskCompletion(task._id, index)}
          //             />
          //             <p>{subtask.title}</p>
          //             <button
          //               onClick={() => deleteSubtask(task._id, index)}
          //               className="kanban-delete-subtask-button"
          //             >
          //               <FaTrash />
          //             </button>
          //           </div>
          //         ))}
  
          //         <button
          //           onClick={() => moveBack(task._id)}
          //           className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          //         >
          //           Move Back
          //         </button>
          //         <button
          //           onClick={() => deleteTask(task._id)}
          //           className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          //         >
          //           Delete
          //         </button>
          //       </div>
          //     ))}
          //   </div>
  //         </div>
  
  //           </div>
  //       <div>
  //        <section style={{paddingTop:"150px",paddingLeft:"40%"}}>
  //         <div className="add-classroom-container" style={{backgroundColor:"darkcyan",width:"350px"}} >
  //       <h2>Add Project</h2>
  //       <form onSubmit={createTask}>
  //         <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Title" required/>
  //         <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
  //         <label>Deadline</label>
  //          <input type='date' value={date} onChange={(e)=>setDate(e.target.value)}  />
          
  //         <button type="submit">Create Project</button>
  //       </form>
  //       </div>
  //       </section>
  //       </div>
  //     </div>
  //     </div>
  //     </div>
  //   );
