import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Asidebar from './Asidebar';
import { Table } from 'react-bootstrap';
import { FaTrash,FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
      axios.get(`http://localhost:7000/api/tasks`)
        .then((response) => {
          setProjects(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch projects.');
          setLoading(false);
        });
    //  else {
    //   setLoading(false);
    //   setError('User not logged in.');
    // }
  }, []);

  const deleteData = (taskId) => {
    axios.delete(`http://localhost:7000/api/tasks/${taskId}`);
    window.location.assign('/projects');
    alert('project is deleted');
  };

  return (
    <div style={{backgroundColor:"lightblue",height:"707px"}}>
      <Asidebar/>
      <h1 style={{paddingTop:"50px"}}>All Projects</h1> <br/>
      <Table striped bordered hover variant="dark" style={{ marginLeft: '250px',width: '1200px', }}>
        <thead>
          <tr>
            <th>sl/no</th>
            <th>Title</th>
            <th>User name</th>
            <th>UserId</th>
            <th>Status</th>
            <th>Started Date</th>
            <th>Deadline</th>
            <th>Assigned By</th>
            <th>Assigned to</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.userName}</td>
              <td>{item.userId}</td>
              <td>{item.status}</td>
              <td>{item.registrationDate}</td>
              <td>{item.date}</td>
              <td>{item.userName}</td>
              <td>{item.assigneduser}</td>

              <td>
              <button style={{border:"none",background:"none",paddingRight:"10px"}} ><Link to={`/projectedit/${item._id}`} style={{color:"blue",textDecoration:"none",}}><FaEdit/></Link></button> 

                <button onClick={() => deleteData(item._id)} style={{ border: 'none', color:"red" }}>
                  <FaTrash/>
                </button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <section >
        <h2>Your Projects</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : Array.isArray(projects) && projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project._id}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </section> */}
    </div>
  );
};

export default Projects;

