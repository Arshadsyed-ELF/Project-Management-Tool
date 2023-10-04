import React from 'react'
import Asidebar from './Asidebar'

const Ahome = () => {
  const get=localStorage.getItem('user')
  return (
    <div>
      <Asidebar/>
      Welcome <br/>
      <h1>{JSON.parse(get).name}</h1>
    </div>
  )
}

export default Ahome