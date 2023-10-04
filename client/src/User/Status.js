// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './kanban.css'
// import UserNavBar from './UserNavBar';
// import { Link } from 'react-router-dom';

// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


// import Card from 'react-bootstrap/Card';

// const Status = () => {
//   const [tasks, setTasks] = useState([]);
//   const [todoCount, setTodoCount] = useState(0);
//   const [inProgressCount, setInProgressCount] = useState(0);
//   const [completedCount, setCompletedCount] = useState(0);

//   useEffect(() => {
//     // Fetch user data from the backend and store it in the 'users' state 
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
  

//   const updateTaskCounts = (taskData) => {
//     const todoCount = taskData.filter(task => task.status === 'todo').length;
//     const inProgressCount = taskData.filter(task => task.status === 'inProgress').length;
//     const completedCount = taskData.filter(task => task.status === 'completed').length;

//     setTodoCount(todoCount);
//     setInProgressCount(inProgressCount);
//     setCompletedCount(completedCount);
//   };

//   const pieChartData = [
//     { name: 'Todo', value: todoCount },
//     { name: 'In Progress', value: inProgressCount },
//     { name: 'Completed', value: completedCount },
//   ];

//   // Define colors for the pie chart
//   const COLORS = ['#2B124C', '#AE445A', '#F39F5A'];
  
//   return (
//     <div >
//       <UserNavBar/>
//       <Card body style={{background:"white", width:"80%",marginLeft:"17%",marginTop:"20px",height:"650px"}}>
//         <div className="flex justify-around items-center p-4">
//   <div className="w-64 h-32 bg-blue-500 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800">
//     TODO <br/>  <br/>{todoCount}
//   </div>
//   <div className="w-64 h-32 bg-green-500 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800">
//     In Progress  <br/> <br/> {inProgressCount}
//   </div>
//   <div className="w-64 h-32 bg-yellow-400 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800">
//     Completed   <br/>  <br/>{completedCount}
//   </div>
// </div>
// <div >
// <Card style={{width:"50%",backgroundColor:"lightcyan",marginLeft:"250px"}}>
//   <strong>Status overview</strong>
//  <p>Get a snapshot of the status of your items. <Link to="/list">View all items</Link></p> 
//      <div style={{paddingLeft:"100px"}} >
//      <PieChart width={350} height={350}>
//           <Pie
//             dataKey="value"
            
//             data={pieChartData}
//             cx={200}
//             cy={150}
//             // innerRadius={60}
//             outerRadius={100}
//             fill="#8884d8"
//             label
//           >
//             {pieChartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>

//      </div>
//      </Card>
//      </div>
//       </Card>;
      
//     </div>
//   );
// };

// export default Status;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './kanban.css';
import UserNavBar from './UserNavBar';
import { Link } from 'react-router-dom';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Card from 'react-bootstrap/Card';

const Status = () => {
  const [tasks, setTasks] = useState([]);
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // Fetch user data from the backend and store it in the 'users' state 
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

  const updateTaskCounts = (taskData) => {
    const todoCount = taskData.filter(task => task.status === 'todo').length;
    const inProgressCount = taskData.filter(task => task.status === 'inProgress').length;
    const completedCount = taskData.filter(task => task.status === 'completed').length;

    setTodoCount(todoCount);
    setInProgressCount(inProgressCount);
    setCompletedCount(completedCount);
  };

  const pieChartData = [
    { name: 'Todo', value: todoCount },
    { name: 'In Progress', value: inProgressCount },
    { name: 'Completed', value: completedCount },
  ];

  // Define colors for the pie chart
  const COLORS = ['#2B124C', '#AE445A', '#F39F5A'];

  const calculatePercentage = (value, total) => ((value / total) * 100).toFixed(2);

  return (
    <div>
      <UserNavBar />
      <Card body style={{ background: "white", width: "80%", marginLeft: "17%", marginTop: "20px", height: "650px" }}>
      <div className="flex justify-around items-center p-4">
  <div className="w-64 h-32 bg-blue-500 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800">
    TODO <br/>  <br/>{todoCount}
  </div>
  <div className="w-64 h-32 bg-green-500 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800">
    In Progress  <br/> <br/> {inProgressCount}
  </div>
  <div className="w-64 h-32 bg-yellow-400 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800">
    Completed   <br/>  <br/>{completedCount}
  </div>
</div>
        <div>
          <Card style={{ width: "50%", backgroundColor: "lightcyan", marginLeft: "250px" }}>
            <strong>Status overview</strong>
            <p>Get a snapshot of the status of your items. <Link to="/list">View all items</Link></p>
            <div style={{ paddingLeft: "100px" }}>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    // innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Status;

