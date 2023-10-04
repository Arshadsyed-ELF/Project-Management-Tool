// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   FaTrash,
// } from "react-icons/fa";
// import './kanban.css'
// import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar'
// import UserNavBar from './UserNavBar';


// const KanbanBoard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [newSubtask, setNewSubtask] = useState('');
//   const [todoCount, setTodoCount] = useState(0);
//   const [inProgressCount, setInProgressCount] = useState(0);
//   const [completedCount, setCompletedCount] = useState(0);

//   const[description,setDescription]=useState('')
//   const[date,setDate]=useState('')


//   const navigate=useNavigate()
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       axios.get(`http://localhost:7000/api/tasks/${user.id}`)
//         .then((response) => {
//           const taskData = response.data;
//           setTasks(taskData);
//           updateTaskCounts(taskData);
//         })
//         .catch(error => {
//           console.error('Error fetching tasks: ', error);
//         });
//     } else {
//       console.log("ERROR")
//     }
//   }, []);

//   const createTask = (e) => {
//     e.preventDefault()
//     const userId = JSON.parse(localStorage.getItem('user')).id;
//     console.log(userId)
//     axios.post('http://localhost:7000/api/tasks', { title: newTask,description,date, status: 'todo', subtasks: [],userId })
//       .then(response => {
//         setTasks([...tasks, response.data]);
//         setNewTask('');
//         updateTaskCounts([...tasks, response.data]);
//       })
//       .catch(error => {
//         console.error('Error creating task: ', error);
//       });
//   };

//   const createSubtask = (taskId) => {
//     const taskIndex = tasks.findIndex(task => task._id === taskId);
//     if (taskIndex !== -1) {
//       const updatedTasks = [...tasks];
//       const taskToUpdate = updatedTasks[taskIndex];
//       taskToUpdate.subtasks.push({ title: newSubtask, completed: false });

//       setTasks(updatedTasks);
//       setNewSubtask('');
//       updateTaskCounts(updatedTasks);

//       // Send a request to update the subtasks on the server
//       axios.put(`http://localhost:7000/api/tasks/${taskId}`, {
//         subtasks: taskToUpdate.subtasks,
//       })
//         .catch(error => {
//           console.error('Error creating subtask: ', error);
//         });
//     }
//   };

//   const deleteSubtask = (taskId, subtaskIndex) => {
//     const taskIndex = tasks.findIndex(task => task._id === taskId);
//     if (taskIndex !== -1) {
//       const updatedTasks = [...tasks];
//       const taskToUpdate = updatedTasks[taskIndex];
//       taskToUpdate.subtasks.splice(subtaskIndex, 1);

//       setTasks(updatedTasks);
//       updateTaskCounts(updatedTasks);

//       // Send a request to update the subtasks on the server
//       axios.put(`http://localhost:7000/api/tasks/${taskId}`, {
//         subtasks: taskToUpdate.subtasks,
//       })
//         .catch(error => {
//           console.error('Error deleting subtask: ', error);
//         });
//     }
//   };

//   const moveTask = (taskId, newStatus) => {
//     axios.put(`http://localhost:7000/api/tasks/${taskId}`, { status: newStatus })
//       .then(() => {
//         const updatedTasks = tasks.map(task => {
//           if (task._id === taskId) {
//             return { ...task, status: newStatus };
//           }
//           return task;
//         });
//         setTasks(updatedTasks);
//         updateTaskCounts(updatedTasks);
//       })
//       .catch(error => {
//         console.error('Error moving task: ', error);
//       });
//   };

//   const deleteTask = (taskId) => {
//     axios.delete(`http://localhost:7000/api/tasks/${taskId}`)
//       .then(() => {
//         const updatedTasks = tasks.filter(task => task._id !== taskId);
//         setTasks(updatedTasks);
//         updateTaskCounts(updatedTasks);
//       })
//       .catch(error => {
//         console.error('Error deleting task: ', error);
//       });
//   };

//   const moveBack = (taskId) => {
//     const task = tasks.find(task => task._id === taskId);
//     if (task) {
//       switch (task.status) {
//         case 'inProgress':
//           moveTask(taskId, 'todo');
//           break;
//         case 'completed':
//           moveTask(taskId, 'inProgress');
//           break;
//         default:
//           // Handle other cases if needed
//           break;
//       }
//     }
//   };

//   const toggleSubtaskCompletion = (taskId, subtaskIndex) => {
//     const taskIndex = tasks.findIndex(task => task._id === taskId);
//     if (taskIndex !== -1) {
//       const updatedTasks = [...tasks];
//       updatedTasks[taskIndex].subtasks[subtaskIndex].completed = !updatedTasks[taskIndex].subtasks[subtaskIndex].completed;

//       setTasks(updatedTasks);
//       updateTaskCounts(updatedTasks);

//       // Send a request to update the subtasks on the server
//       axios.put(`http://localhost:7000/api/tasks/${taskId}`, {
//         subtasks: updatedTasks[taskIndex].subtasks,
//       })
//         .catch(error => {
//           console.error('Error toggling subtask completion: ', error);
//         });
//     }
//   };

//   const updateTaskCounts = (taskData) => {
//     const todoCount = taskData.filter(task => task.status === 'todo').length;
//     const inProgressCount = taskData.filter(task => task.status === 'inProgress').length;
//     const completedCount = taskData.filter(task => task.status === 'completed').length;

//     setTodoCount(todoCount);
//     setInProgressCount(inProgressCount);
//     setCompletedCount(completedCount);
//   };

//   return (
//     <div >
//       <UserNavBar/>
//       <div style={{marginLeft:"100px"}}>
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8" >
//       {/* <Button onClick={()=>navigate('/boardadd')}>Add</Button> */}
//       <h1 className="text-3xl font-semibold mb-4">Projects Board</h1>
//       <div className="w-full max-w-6xl flex justify-between">
//         <div className="w-1/3 p-4">
//           <div className="bg-white rounded shadow-md p-4">
//             <h2 className="text-xl font-semibold mb-2">To Do ({todoCount})</h2>
//             {tasks.map(task => task.status === 'todo' && (
//               <div key={task._id} className="bg-blue-100 p-2 mb-2 rounded">
//                 <h4>Title:</h4>
//                 <strong className="text-gray-800">{task.title}</strong>
//                 <h5 style={{ justifyContent: "flex-start", display: "flex" }}>Description:</h5>
//                 <p>{task.description}</p>
//                 <h6 style={{ justifyContent: "flex-start", display: "flex" }}>started date:</h6>
//                 <p>{task.registrationDate}</p>
//                 <h6 style={{ justifyContent: "flex-start", display: "flex" }}>DeadLine:</h6>
//                 <p>{task.date}</p>
//                 {/* <p className="text-gray-800">{task.description}</p> */}
//                 <div className="mt-2">
//                   <h5 className="text-lg font-semibold ">Subtasks:</h5>

//                   {task.subtasks.map((subtask, index) => (
//                     <div key={index} className="kanban-subtask">
//                       <input
//                         type="checkbox"
//                         checked={subtask.completed}
//                         onChange={() => toggleSubtaskCompletion(task._id, index)}
//                       />
//                       <p>{subtask.title}</p>
//                       <button
//                         onClick={() => deleteSubtask(task._id, index)}
//                         className="kanban-delete-subtask-button"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   ))}
//                   <div className="flex items-center mt-2">
//                     <input
//                       type="text"
//                       value={newSubtask}
//                       onChange={e => setNewSubtask(e.target.value)}
//                       placeholder="New Subtask"
//                       className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//                     />
//                     <button
//                       onClick={() => createSubtask(task._id)}
//                       className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => moveTask(task._id, 'inProgress')}
//                   className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
//                 >
//                   Move to In Progress
//                 </button>  <br />
//                 <button
//                   onClick={() => deleteTask(task._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-1/3 p-4">
//           <div className="bg-white rounded shadow-md p-4">
//             <h2 className="text-xl font-semibold mb-2">In Progress ({inProgressCount})</h2>
//             {tasks.map(task => task.status === 'inProgress' && (
//               <div key={task._id} className="bg-yellow-100 p-2 mb-2 rounded">
//                 <p className="text-gray-800">{task.title}</p>

//                 {task.subtasks.map((subtask, index) => (
//                   <div key={index} className="kanban-subtask">
//                     <input
//                       type="checkbox"
//                       checked={subtask.completed}
//                       onChange={() => toggleSubtaskCompletion(task._id, index)}
//                     />
//                     <p>{subtask.title}</p>
//                     <button
//                       onClick={() => deleteSubtask(task._id, index)}
//                       className="kanban-delete-subtask-button"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   onClick={() => moveBack(task._id)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                 >
//                   Move Back
//                 </button>
//                 <button
//                   onClick={() => moveTask(task._id, 'completed')}
//                   className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600" style={{ marginLeft: "21px", marginBottom: "15px", marginTop: "10px" }}
//                 >
//                   Move to Completed
//                 </button>  <br />
//                 <button
//                   onClick={() => deleteTask(task._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-1/3 p-4">
//           <div className="bg-white rounded shadow-md p-4">
//             <h2 className="text-xl font-semibold mb-2">Completed ({completedCount})</h2>
//             {tasks.map(task => task.status === 'completed' && (
//               <div key={task._id} className="bg-green-100 p-2 mb-2 rounded">
//                 <p className="text-gray-800">{task.title}</p>

//                 {task.subtasks.map((subtask, index) => (
//                   <div key={index} className="kanban-subtask">
//                     <input
//                       type="checkbox"
//                       checked={subtask.completed}
//                       onChange={() => toggleSubtaskCompletion(task._id, index)}
//                     />
//                     <p>{subtask.title}</p>
//                     <button
//                       onClick={() => deleteSubtask(task._id, index)}
//                       className="kanban-delete-subtask-button"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 ))}

//                 <button
//                   onClick={() => moveBack(task._id)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                 >
//                   Move Back
//                 </button>
//                 <button
//                   onClick={() => deleteTask(task._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
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
// };

// export default KanbanBoard;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTrash } from "react-icons/fa";
// import './kanban.css'
// import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import UserNavBar from './UserNavBar';

// const KanbanBoard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [newSubtask, setNewSubtask] = useState('');
//   const [todoCount, setTodoCount] = useState(0);
//   const [inProgressCount, setInProgressCount] = useState(0);
//   const [completedCount, setCompletedCount] = useState(0);

//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');
//   const [assignee, setAssignee] = useState(''); // User ID or username for assignment
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

  // useEffect(() => {
  //   // Fetch user data from the backend and store it in the 'users' state
  //   axios.get(`http://localhost:7000/users`)
  //     .then((response) => {
  //       setUsers(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching users: ', error);
  //     });

  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user) {
  //     axios.get(`http://localhost:7000/api/tasks/${user.id}`)
  //       .then((response) => {
  //         const taskData = response.data;
  //         setTasks(taskData);
  //         updateTaskCounts(taskData);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching tasks: ', error);
  //       });
  //   } else {
  //     console.log("ERROR")
  //   }
  // }, []);

//   const createTask = (e) => {
//     e.preventDefault();
//     const userId = JSON.parse(localStorage.getItem('user')).id;
//     const userName = JSON.parse(localStorage.getItem('user')).name;
//     axios.post('http://localhost:7000/api/tasks', {
//       title: newTask,
//       description,
//       date,
//       status: 'todo',
//       subtasks: [],
//       userId,
//       userName,
//       assigneduser: assignee, // Assign the task to the specified user
//     })
//       .then(response => {
//         setTasks([...tasks, response.data]);
//         setNewTask('');
//         setDescription('');
//         setDate('');
//         setAssignee('');
//         updateTaskCounts([...tasks, response.data]);
//       })
//       .catch(error => {
//         console.error('Error creating task: ', error);
//       });
//     }

//   const createSubtask = (taskId) => {
//     const taskIndex = tasks.findIndex(task => task._id === taskId);
//     if (taskIndex !== -1) {
//       const updatedTasks = [...tasks];
//       const taskToUpdate = updatedTasks[taskIndex];
//       taskToUpdate.subtasks.push({ title: newSubtask, completed: false });

//       setTasks(updatedTasks);
//       setNewSubtask('');
//       updateTaskCounts(updatedTasks);

//       // Send a request to update the subtasks on the server
//       axios.put(`http://localhost:7000/api/tasks/${taskId}`, {
//         subtasks: taskToUpdate.subtasks,
//       })
//         .catch(error => {
//           console.error('Error creating subtask: ', error);
//         });
//     }
//   }

//   const deleteSubtask = (taskId, subtaskIndex) => {
//     const taskIndex = tasks.findIndex(task => task._id === taskId);
//     if (taskIndex !== -1) {
//       const updatedTasks = [...tasks];
//       const taskToUpdate = updatedTasks[taskIndex];
//       taskToUpdate.subtasks.splice(subtaskIndex, 1);

//       setTasks(updatedTasks);
//       updateTaskCounts(updatedTasks);

//       // Send a request to update the subtasks on the server
//       axios.put(`http://localhost:7000/api/tasks/${taskId}`, {
//         subtasks: taskToUpdate.subtasks,
//       })
//         .catch(error => {
//           console.error('Error deleting subtask: ', error);
//         });
//     }
//   };

//   const moveTask = (taskId, newStatus) => {
//     axios.put(`http://localhost:7000/api/tasks/${taskId}`, { status: newStatus })
//       .then(() => {
//         const updatedTasks = tasks.map(task => {
//           if (task._id === taskId) {
//             return { ...task, status: newStatus };
//           }
//           return task;
//         });
//         setTasks(updatedTasks);
//         updateTaskCounts(updatedTasks);
//       })
//       .catch(error => {
//         console.error('Error moving task: ', error);
//       });
//   };

//   const deleteTask = (taskId) => {
//     axios.delete(`http://localhost:7000/api/tasks/${taskId}`)
//       .then(() => {
//         const updatedTasks = tasks.filter(task => task._id !== taskId);
//         setTasks(updatedTasks);
//         updateTaskCounts(updatedTasks);
//       })
//       .catch(error => {
//         console.error('Error deleting task: ', error);
//       });
//   };

//   const moveBack = (taskId) => {
//     const task = tasks.find(task => task._id === taskId);
//     if (task) {
//       switch (task.status) {
//         case 'inProgress':
//           moveTask(taskId, 'todo');
//           break;
//         case 'completed':
//           moveTask(taskId, 'inProgress');
//           break;
//         default:
//           // Handle other cases if needed
//           break;
//       }
//     }
//   };

//   const toggleSubtaskCompletion = (taskId, subtaskIndex) => {
//     const taskIndex = tasks.findIndex(task => task._id === taskId);
//     if (taskIndex !== -1) {
//       const updatedTasks = [...tasks];
//       updatedTasks[taskIndex].subtasks[subtaskIndex].completed = !updatedTasks[taskIndex].subtasks[subtaskIndex].completed;

//       setTasks(updatedTasks);
//       updateTaskCounts(updatedTasks);

//       // Send a request to update the subtasks on the server
//       axios.put(`http://localhost:7000/api/tasks/${taskId}`, {
//         subtasks: updatedTasks[taskIndex].subtasks,
//       })
//         .catch(error => {
//           console.error('Error toggling subtask completion: ', error);
//         });
//     }
//   };

//   const updateTaskCounts = (taskData) => {
//     const todoCount = taskData.filter(task => task.status === 'todo').length;
//     const inProgressCount = taskData.filter(task => task.status === 'inProgress').length;
//     const completedCount = taskData.filter(task => task.status === 'completed').length;

//     setTodoCount(todoCount);
//     setInProgressCount(inProgressCount);
//     setCompletedCount(completedCount);
//   };


//   return (
//     <div>
//       <UserNavBar />
//       <div style={{ marginLeft: "100px" }}>
//         <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
//           <h1 className="text-3xl font-semibold mb-4">Projects Board</h1>
//           <div className="w-full max-w-6xl flex justify-between">
//             <div className="w-1/3 p-4">
//             <div className="bg-white rounded shadow-md p-4">
//               <h2 className="text-xl font-semibold mb-2">To Do ({todoCount})</h2>
//               {tasks.map(task => task.status === 'todo' && (
//                 <div key={task._id} className="bg-blue-100 p-2 mb-2 rounded">
//                   <h4>Title:</h4>
//                   <strong className="text-gray-800">{task.title}</strong>
//                   <h5 style={{ justifyContent: "flex-start", display: "flex" }}>Description:</h5>
//                   <p>{task.description}</p>
//                   <h6 style={{ justifyContent: "flex-start", display: "flex" }}>started date:</h6>
//                   <p>{task.registrationDate}</p>
//                   <h6 style={{ justifyContent: "flex-start", display: "flex" }}>DeadLine:</h6>
//                   <p>{task.date}</p>
              

//                   <p className="text-gray-800">{task.description}</p>
//                   <div className="mt-2">
//                     <h5 className="text-lg font-semibold ">Subtasks:</h5>
  
//                     {task.subtasks.map((subtask, index) => (
//                       <div key={index} className="kanban-subtask">
//                         <input
//                           type="checkbox"
//                           checked={subtask.completed}
//                           onChange={() => toggleSubtaskCompletion(task._id, index)}
//                         />
//                         <p>{subtask.title}</p>
//                         <button
//                           onClick={() => deleteSubtask(task._id, index)}
//                           className="kanban-delete-subtask-button"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     ))}
//                     <div className="flex items-center mt-2">
//                       <input
//                         type="text"
//                         value={newSubtask}
//                         onChange={e => setNewSubtask(e.target.value)}
//                         placeholder="New Subtask"
//                         className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//                       />
//                       <button
//                         onClick={() => createSubtask(task._id)}
//                         className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600"
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => moveTask(task._id, 'inProgress')}
//                     className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
//                   >
//                     Move to In Progress
//                   </button>  <br />
//                   <button
//                     onClick={() => deleteTask(task._id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="w-1/3 p-4">
//             <div className="bg-white rounded shadow-md p-4">
//               <h2 className="text-xl font-semibold mb-2">In Progress ({inProgressCount})</h2>
//               {tasks.map(task => task.status === 'inProgress' && (
//                 <div key={task._id} className="bg-yellow-100 p-2 mb-2 rounded">
//                   <p className="text-gray-800">{task.title}</p>
  
//                   {task.subtasks.map((subtask, index) => (
//                     <div key={index} className="kanban-subtask">
//                       <input
//                         type="checkbox"
//                         checked={subtask.completed}
//                         onChange={() => toggleSubtaskCompletion(task._id, index)}
//                       />
//                       <p>{subtask.title}</p>
//                       <button
//                         onClick={() => deleteSubtask(task._id, index)}
//                         className="kanban-delete-subtask-button"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => moveBack(task._id)}
//                     className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                   >
//                     Move Back
//                   </button>
//                   <button
//                     onClick={() => moveTask(task._id, 'completed')}
//                     className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600" style={{ marginLeft: "21px", marginBottom: "15px", marginTop: "10px" }}
//                   >
//                     Move to Completed
//                   </button>  <br />
//                   <button
//                     onClick={() => deleteTask(task._id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="w-1/3 p-4">
//             <div className="bg-white rounded shadow-md p-4">
//               <h2 className="text-xl font-semibold mb-2">Completed ({completedCount})</h2>
//               {tasks.map(task => task.status === 'completed' && (
//                 <div key={task._id} className="bg-green-100 p-2 mb-2 rounded">
//                   <p className="text-gray-800">{task.title}</p>
  
//                   {task.subtasks.map((subtask, index) => (
//                     <div key={index} className="kanban-subtask">
//                       <input
//                         type="checkbox"
//                         checked={subtask.completed}
//                         onChange={() => toggleSubtaskCompletion(task._id, index)}
//                       />
//                       <p>{subtask.title}</p>
//                       <button
//                         onClick={() => deleteSubtask(task._id, index)}
//                         className="kanban-delete-subtask-button"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   ))}
  
//                   <button
//                     onClick={() => moveBack(task._id)}
//                     className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                   >
//                     Move Back
//                   </button>
//                   <button
//                     onClick={() => deleteTask(task._id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//             </div>
//           </div>
//           <div>
//           <section style={{ paddingTop: "150px", paddingLeft: "40%" }}>
//               <div className="add-classroom-container" style={{ backgroundColor: "darkcyan", width: "350px" }}>
//                 <h2>Add Project</h2>
//                 <form onSubmit={createTask}>
//                   <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Title" required />
//                   <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
//                   <label>Deadline</label>
//                   <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
//                   <input
//                     type="text"
//                     value={assignee}
//                     onChange={e => setAssignee(e.target.value)}
//                     placeholder="Assign To (User ID or Username)"
//                     className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//                   />
                  
// <label>Assign To:</label>
// <select
//   value={assignee}
//   onChange={(e) => setAssignee(e.target.value)}
//   className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
// >
//   <option value="">Select User</option>
//   {users.map((user) => (
//     <option key={user._id} value={user.name}>
//       {user._id}
//     </option>
//   ))}
// </select>


//                   <button type="submit">Create Project</button>
//                 </form>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KanbanBoard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaTrash,
} from "react-icons/fa";
import './kanban.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'
import UserNavBar from './UserNavBar';


const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const[description,setDescription]=useState('')
  const[date,setDate]=useState('')
  const [assignedUser, setAssignedUser] = useState('');
  const [users, setUsers] = useState([]);


  const [editTask, setEditTask] = useState(null);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);


const openEditModal = (task) => {
  setEditTask(task);
  setIsEditModalOpen(true);
};

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

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`http://localhost:7000/api/tasks/${user.id}`)
        .then((response) => {
          const taskData = response.data;
          setTasks(taskData);
          updateTaskCounts(taskData);
        })
        .catch(error => {
          console.error('Error fetching tasks: ', error);
        });
    } else {
      console.log("ERROR")
    }
  }, []);
  const createTask = (e) => {
    e.preventDefault()
    const userId = JSON.parse(localStorage.getItem('user')).id;
    console.log(userId)
    axios.post('http://localhost:7000/api/tasks', { title: newTask,description,date, status: 'todo', subtasks: [],userId })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask('');
        updateTaskCounts([...tasks, response.data]);
      })
      .catch(error => {
        console.error('Error creating task: ', error);
      });
  };

  const createSubtask = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task._id === taskId);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      const taskToUpdate = updatedTasks[taskIndex];
      taskToUpdate.subtasks.push({
        title: newSubtask,
        completed: false,
        assignedTo: assignedUser, // Assign subtask to selected user
      });

      setTasks(updatedTasks);
      setNewSubtask('');
      updateTaskCounts(updatedTasks);

      // Send a request to update the subtasks on the server
      axios
        .put(`http://localhost:7000/api/tasks/${taskId}`, {
          subtasks: taskToUpdate.subtasks,
        })
        .catch((error) => {
          console.error('Error creating subtask: ', error);
        });
    }
  };

  const deleteSubtask = (taskId, subtaskIndex) => {
    const taskIndex = tasks.findIndex(task => task._id === taskId);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      const taskToUpdate = updatedTasks[taskIndex];
      taskToUpdate.subtasks.splice(subtaskIndex, 1);

      setTasks(updatedTasks);
      updateTaskCounts(updatedTasks);

      // Send a request to update the subtasks on the server
      axios.put(`http://localhost:7000/api/tasks/${taskId}`, {
        subtasks: taskToUpdate.subtasks,
      })
        .catch(error => {
          console.error('Error deleting subtask: ', error);
        });
    }
  };

  const moveTask = (taskId, newStatus) => {
    axios.put(`http://localhost:7000/api/tasks/${taskId}`, { status: newStatus })
      .then(() => {
        const updatedTasks = tasks.map(task => {
          if (task._id === taskId) {
            return { ...task, status: newStatus };
          }
          return task;
        });
        setTasks(updatedTasks);
        updateTaskCounts(updatedTasks);
      })
      .catch(error => {
        console.error('Error moving task: ', error);
      });
  };

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:7000/api/tasks/${taskId}`)
      .then(() => {
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        setTasks(updatedTasks);
        updateTaskCounts(updatedTasks);
      })
      .catch(error => {
        console.error('Error deleting task: ', error);
      });
  };

  const moveBack = (taskId) => {
    const task = tasks.find(task => task._id === taskId);
    if (task) {
      switch (task.status) {
        case 'inProgress':
          moveTask(taskId, 'todo');
          break;
        case 'completed':
          moveTask(taskId, 'inProgress');
          break;
        default:
          // Handle other cases if needed
          break;
      }
    }
  };

  const toggleSubtaskCompletion = (taskId, subtaskIndex) => {
    const taskIndex = tasks.findIndex(task => task._id === taskId);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].subtasks[subtaskIndex].completed = !updatedTasks[taskIndex].subtasks[subtaskIndex].completed;

      setTasks(updatedTasks);
      updateTaskCounts(updatedTasks);

      // Send a request to update the subtasks on the server
      axios.put(`http://localhost:7000/api/tasks/${taskId}`, {
        subtasks: updatedTasks[taskIndex].subtasks,
      })
        .catch(error => {
          console.error('Error toggling subtask completion: ', error);
        });
    }
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
    <div >
      <UserNavBar/>
      <div style={{marginLeft:"100px"}}>
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8" >
      {/* <Button onClick={()=>navigate('/boardadd')}>Add</Button> */}
      <h1 className="text-3xl font-semibold mb-4">Projects Board</h1>
      <div className="w-full max-w-6xl flex justify-between">
        <div className="w-1/3 p-4">
          <div className="bg-white rounded shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">To Do ({todoCount})</h2>
            {tasks.map(task => task.status === 'todo' && (
              <div key={task._id} className="bg-blue-100 p-2 mb-2 rounded">
                <h4>Title:</h4>
                <strong className="text-gray-800">{task.title}</strong>
                <h5 style={{ justifyContent: "flex-start", display: "flex" }}>Description:</h5>
                <p>{task.description}</p>
                <h6 style={{ justifyContent: "flex-start", display: "flex" }}>started date:</h6>
                <p>{task.registrationDate}</p>
                <h6 style={{ justifyContent: "flex-start", display: "flex" }}>DeadLine:</h6>
                <p>{task.date}</p>
                {/* <p className="text-gray-800">{task.description}</p> */}
                <div className="mt-2">
                <button onClick={() => openEditModal(task)}>Edit</button>

                  <h5 className="text-lg font-semibold ">Subtasks:</h5>
                    <p style={{paddingLeft:"100px"}}>Assigned to</p> 
                  {task.subtasks.map((subtask, index) => (
                    <div key={index} className="kanban-subtask">
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => toggleSubtaskCompletion(task._id, index)}
                      />
                      <p>{subtask.title}</p>
                      <p>{subtask.assignedTo}</p>
                      <button
                        onClick={() => deleteSubtask(task._id, index)}
                        className="kanban-delete-subtask-button"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center mt-2">
                  <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="New Subtask"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
             <select
              value={assignedUser}
              onChange={(e) => setAssignedUser(e.target.value)}
              className="w-1/2 px-3 py-2 ml-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value={users.name}>Assign to...</option>
              {users.map((user) => ( 
                <option key={user.name} value={user.name}>
                  {user.name}
                </option>
                
              ))}
              <option value={users.name}>Unassign</option>
            </select>
            <button
              onClick={() => createSubtask(task._id)}
              className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
                  </div>
                </div>
                <button
                  onClick={() => moveTask(task._id, 'inProgress')}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                >
                  Move to In Progress
                </button>  <br />
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 p-4">
          <div className="bg-white rounded shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">In Progress ({inProgressCount})</h2>
            {tasks.map(task => task.status === 'inProgress' && (
              <div key={task._id} className="bg-yellow-100 p-2 mb-2 rounded">
                <p className="text-gray-800">{task.title}</p>

                {task.subtasks.map((subtask, index) => (
                  <div key={index} className="kanban-subtask">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtaskCompletion(task._id, index)}
                    />
                    <p>{subtask.title}</p>
                    <button
                      onClick={() => deleteSubtask(task._id, index)}
                      className="kanban-delete-subtask-button"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => moveBack(task._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Move Back
                </button>
                <button
                  onClick={() => moveTask(task._id, 'completed')}
                  className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600" style={{ marginLeft: "21px", marginBottom: "15px", marginTop: "10px" }}
                >
                  Move to Completed
                </button>  <br />
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 p-4">
          <div className="bg-white rounded shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Completed ({completedCount})</h2>
            {tasks.map(task => task.status === 'completed' && (
              <div key={task._id} className="bg-green-100 p-2 mb-2 rounded">
                <p className="text-gray-800">{task.title}</p>

                {task.subtasks.map((subtask, index) => (
                  <div key={index} className="kanban-subtask">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtaskCompletion(task._id, index)}
                    />
                    <p>{subtask.title}</p>
                    <button
                      onClick={() => deleteSubtask(task._id, index)}
                      className="kanban-delete-subtask-button"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => moveBack(task._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Move Back
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

          </div>
      <div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default KanbanBoard;