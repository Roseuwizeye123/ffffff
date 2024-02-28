import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import CourseForm from './CourseForm'

const AddCourse = () => {
    return (
        <>
        <Navbar/>
             <div class="row">
                <Sidebar/>
                <CourseForm/>
             </div>
            
             <Footer/>
    
        </>
        
      )
    }

export default AddCourse