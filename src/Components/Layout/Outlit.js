import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'


const Outlit = () => {
  return (
    <div>
        <Nav/>
        <Outlet></Outlet>
       
      
      
        <Footer/>
    </div>
  )
}

export default Outlit
