// // import React from 'react'
// // import axios from 'axios';
// // import { useState,useEffect } from 'react';
// // import Calendar from 'react-calendar'
// // import UserNavBar from './UserNavBar'

// // const Calender = () => {

// //   return (
// //     <div>
// //         <UserNavBar/>
// //       <div style={{marginLeft:"30%",marginTop:"8%"}}>
// //       <Calendar/>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Calender

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';

// function PieChart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Make an API request to your Node.js server to get task data
//     axios.get('http://localhost:7000/api/tasks')
//       .then((response) => {
//         const taskData = response.data;

//         if (taskData && taskData.length > 0) {
//           // Process taskData to extract counts for "Todo," "In Progress," and "Completed" categories
//           const todoCount = taskData.filter((task) => task.status === 'Todo').length;
//           const inProgressCount = taskData.filter((task) => task.status === 'In Progress').length;
//           const completedCount = taskData.filter((task) => task.status === 'Completed').length;

//           // Create a data object for the pie chart
//           const chartData = {
//             labels: ['Todo', 'In Progress', 'Completed'],
//             datasets: [
//               {
//                 data: [todoCount, inProgressCount, completedCount],
//                 backgroundColor: ['#FF5733', '#FFD633', '#33FF57'], // Define colors for each category
//               },
//             ],
//           };

//           setData(chartData);
//         } else {
//           // Handle the case when there are no tasks (e.g., set default data)
//           setData({});
//         }
//       })
//       .catch((error) => {
//         // Handle errors (e.g., display an error message)
//         console.error('Error fetching task data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Task Status</h2>
//       <Pie data={data} />
//     </div>
//   );
// }

// export default PieChart;


import React from 'react'

const Calender = () => {
  return (
    <div>Calender</div>
  )
}

export default Calender