
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import UserNavBar from './UserNavBar';
import { Link } from 'react-router-dom';


const List = () => {
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
    <div    >
      <UserNavBar /> <br />
      <input
        type="search"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{borderRadius:"5px", background:"rgb(50,53,57)", height:"35px",width:"350px",color:"white"}}
      /> 
      <br/>
      <br/>
      
      <Table striped bordered hover variant="dark" style={{ marginLeft: '300px', width: '1200px' }}>
        <thead>
          <tr>
            <th>sl/no</th>
            <th>Title</th>
            <th>Status</th>
            <th>Started Date</th>
            <th>Deadline</th>
            <th>Assigned By</th>
            {/* <th>Operation</th> */}
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
              {/* <td>{item.userId}</td> */}
              <td>{item.assigneduser}</td>
              <td>
              <button style={{border:"none",background:"none",paddingRight:"10px"}} ><Link to={`/listedit/${item._id}`} style={{color:"blue",textDecoration:"none"}}><FaEdit/></Link></button> 
                <button onClick={() => deleteData(item._id)} style={{ border: 'none', background: 'none',color:"red" }}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          <Link > </Link>
        </tbody>
      </Table>
    </div>
  );
};

export default List;