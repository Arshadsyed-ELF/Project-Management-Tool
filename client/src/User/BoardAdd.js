import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';

const BoardAdd = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [description,setDescription]=useState('')
    const [date,setDate]=useState('')
    const [newSubtask, setNewSubtask] = useState('');
    const [todoCount, setTodoCount] = useState(0);
    const [inProgressCount, setInProgressCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [assignee, setAssignee] = useState(''); // User ID or username for assignment
    const [users, setUsers] = useState([]);

const navigate=useNavigate()

useEffect(() => {
  // Fetch user data from the backend and store it in the 'users' state
  axios.get(`http://localhost:7000/users`)
    .then((response) => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('Error fetching users: ', error);
    });
}, []);

    const createTask = (e) => {
        e.preventDefault()
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const userName = JSON.parse(localStorage.getItem('user')).name;
        console.log(userId)
        axios.post('http://localhost:7000/api/tasks', { title: newTask,description,date, status: 'todo', subtasks: [],userId,userName,assigneduser: assignee })
          .then(response => {
            setTasks([...tasks, response.data]);
            setNewTask('');
            updateTaskCounts([...tasks, response.data]);
            navigate('/board')
            console.log("created")
          })
          .catch(error => {
            console.error('Error creating task: ', error);
          });
      };

      const updateTaskCounts = (taskData) => {
        const todoCount = taskData.filter(task => task.status === 'todo').length;
        const inProgressCount = taskData.filter(task => task.status === 'inProgress').length;
        const completedCount = taskData.filter(task => task.status === 'completed').length;
    
        setTodoCount(todoCount);
        setInProgressCount(inProgressCount);
        setCompletedCount(completedCount);
      };

    
  return (
    <div>
      <UserNavBar/>
      <div>
      {/* <section style={{paddingTop:"150px",paddingLeft:""}}>
        <div className="add-classroom-container" style={{backgroundColor:"darkcyan",width:"350px"}} >
      <h2>Add Project</h2>
      <form onSubmit={createTask}>
        <input type="text" placeholder="Project Name" value={title} onChange={(e) => setTitle(e.target.value)}  required/> <br/>
        <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Title" required/>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
        <label>Deadline</label>
         <input type='date' value={date} onChange={(e)=>setDate(e.target.value)}  />
        
        <button type="submit">Create Project</button>
      </form>
      </div>
      </section> */}
      <section style={{ paddingTop: "100px", paddingLeft: "10%" }}>
              <div className="add-classroom-container" style={{ backgroundColor: "darkcyan", width: "350px" }}>
                <h2>Add Project</h2>
                <form onSubmit={createTask}>
                  <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Title" required />
                  <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                  <label>Deadline</label>
                  <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                  <input
                    type="text"
                    value={assignee}
                    onChange={e => setAssignee(e.target.value)}
                    placeholder="Assign To (User ID or Username)"
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  
<label>Assign To:</label>
<select
  value={assignee}
  onChange={(e) => setAssignee(e.target.value)}
  className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
>
  <option value="">Select User</option>
  {users.map((user) => (
    <option key={user._id} value={user.name}>
      {user.name}
    </option>
  ))}
</select>


                  <button type="submit">Create Project</button>
                </form>
              </div>
            </section>
      </div>
    </div>
  )
}

export default BoardAdd