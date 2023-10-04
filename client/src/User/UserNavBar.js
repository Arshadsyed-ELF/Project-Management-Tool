import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css'
import Sidebar from './Sidebar';
const UserNavBar = () => {
  const get=localStorage.getItem('user')
  return (
    <div style={{marginLeft:"200px"}}>
      <Sidebar/>
         <Navbar bg="primary" data-bs-theme="dark" style={{height:"70px"}}>
        <Container>
             <Nav className="me-auto"> 
            <NavLink to='/status' id='Nav'>Summary</NavLink>
            <NavLink to='/board' id='Nav'>Board</NavLink>
            <NavLink to='/list' id='Nav'>List</NavLink>
            <NavLink to='/calender' id='Nav'>Calendar</NavLink>
            <h1 style={{color:"wheat",paddingLeft:"600px"}}>{JSON.parse(get).name}</h1>
          </Nav>
        </Container>
        
            
      </Navbar>
      
    </div>
  )
}

export default UserNavBar