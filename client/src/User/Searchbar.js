// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { FaTrash } from 'react-icons/fa'
// import { Table } from 'react-bootstrap';
// import UserNavBar from './UserNavBar';

// const Searchbar = () => {

//     const [tasks, setTasks] = useState([]);
//     const [record, setRecord] = useState(tasks)
 
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user) {
//           axios.get(`http://localhost:7000/api/tasks/${user.id}`)
//             .then((response) => {
//               const taskData = response.data;
//               setTasks(taskData);
//             })
//             .catch(error => {
//               console.error('Error fetching tasks: ', error);
//             });
//         } else {
//           console.log("ERROR")
//         }
//       }, []);

//       let deleteData=(taskId)=>{
//         axios.delete(`http://localhost:7000/api/tasks/${taskId}`)
//         window.location.assign("/list")
//         alert("user is deleted")
//       }
  
//     const Filter = ((e) => {
//    setRecord(tasks.filter(d => d.name.toLowerCase().includes(e.target.value)))
//     })
  
//   return (
//     <div>
//         <UserNavBar/> <br/>
//         <input type='search' placeholder='search restaurant'
//           onChange={Filter} />
//          <Table striped bordered hover variant="dark" style={{marginLeft:"300px",width:"1200px"}}>
//       <thead>
//         <tr>
//           <th>sl/no</th>
//           <th>Title</th>
//           <th>Status</th>
//           <th>Started Date</th>
//           <th>Deadline</th>
//           <th>Operation</th>
//         </tr>
//       </thead>
//       <tbody>
//        {tasks.map((item,index)=>
//         <tr>
//         <td>{index+1}</td>
//         <td>{item.title}</td>
//         <td>{item.status}</td>
//         <td>{item.registrationDate}</td>
//         <td>{item.date}</td>
//             <td><button onClick={()=>{deleteData(item._id)}} style={{border:"none",background:"none"}}><FaTrash/></button> </td> 
//       </tr>
//        )}
//       </tbody>
//     </Table>
//     </div>
//   )
// }

// export default Searchbar


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import UserNavBar from './UserNavBar';


const Searchbar = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:7000/api/tasks/${user.id}`)
        .then((response) => {
          const taskData = response.data;
          setTasks(taskData);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
    } else {
      console.log('ERROR');
    }
  }, []);

  useEffect(() => {
    // Filter tasks based on the search query
    const filtered = tasks.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const deleteData = (taskId) => {
    axios.delete(`http://localhost:7000/api/tasks/${taskId}`);
    window.location.assign('/list');
    alert('User is deleted');
  };

  return (
    <div>
      <UserNavBar /> <br />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <br/>
      <Table striped bordered hover variant="dark" style={{ marginLeft: '300px', width: '1200px' }}>
        <thead>
          <tr>
            <th>sl/no</th>
            <th>Title</th>
            <th>Status</th>
            <th>Started Date</th>
            <th>Deadline</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.status}</td>
              <td>{item.registrationDate}</td>
              <td>{item.date}</td>
              <td>
                <button onClick={() => deleteData(item._id)} style={{ border: 'none', background: 'none' }}>
                  <FaTrash />
                </button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Searchbar;
