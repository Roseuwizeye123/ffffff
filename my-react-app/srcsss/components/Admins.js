import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import AdminsList from './AdminsList'
import Footer from './Footer'

const Admins = () => {
  return (
    <>
    <Navbar/>
         <div class="row">
            <Sidebar/>
            <AdminsList/>
         </div>
        
         <Footer/>

    </>
    
  )
}
export default Admins