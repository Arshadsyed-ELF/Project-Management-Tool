import React from 'react'
import Sidebar from './Sidebar'

const Home = () => {
  const get=localStorage.getItem('user')
  return (
    <div>
      <Sidebar/>
       <br/>
     <h1> Welcome Back 
       <br/>
       {JSON.parse(get).name} </h1>
    </div>
  )
}

export default Home