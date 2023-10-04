import React from 'react'
import Calendar from 'react-calendar'
import Asidebar from './Asidebar'

const Acalender = () => {
  return (
    <div>
        <Asidebar/>
      <div style={{marginLeft:"30%",marginTop:"8%"}}>
      <Calendar/>
      </div>
    </div>
  )
}

export default Acalender