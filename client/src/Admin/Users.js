import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Asidebar from './Asidebar';
import { Table } from 'react-bootstrap';
import { FaTrash,FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:7000/users`)
      .then((response) => {
        setUsers(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        // setError('Failed to fetch projects.');
        // setLoading(false);
      });
}, []);

const deleteData = (taskId) => {
    axios.delete(`http://localhost:7000/users/${taskId}`);
    window.location.assign('/users');
    alert('User is deleted');
  };
  return (
    <div style={{backgroundColor:"lightblue",height:"707px"}}>
        <Asidebar/>
      <h1 style={{paddingTop:"50px"}}>Users</h1> <br/>
      <Table striped bordered hover variant="dark" style={{ marginLeft: '250px', width: '1200px', }}>
        <thead>
          <tr>
            <th>sl/no</th>
            <th>UserId</th>
            <th>User name</th>
            <th>Email</th>
            <th>password</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
              <button style={{border:"none",background:"none",paddingRight:"10px"}} ><Link to={`/useredit/${item._id}`} style={{color:"blue",textDecoration:"none",}}><FaEdit/></Link></button> 
                <button onClick={() => deleteData(item._id)} style={{ border: 'none',color:"red" }}>
                  <FaTrash/>
                </button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    
    </div>
  )
}

export default Users