import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import RegistrationForm from './RegistrationForm'
import Footer from './Footer'

const AddTeacher = () => {
  return (
    <>
    <Navbar/>
         <div class="row">
            <Sidebar/>
            <RegistrationForm/>
         </div>
        
         <Footer/>

    </>
    
  )
}
export default AddTeacher