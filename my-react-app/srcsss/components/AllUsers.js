import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Users from './UsersList'
import Footer from './Footer'

const AllUsers = () => {
  return (
    <>
    <Navbar/>
         <div class="row">
            <Sidebar/>
            <Users/>
         </div>
        
         <Footer/>

    </>
    
  )
}
export default AllUsers