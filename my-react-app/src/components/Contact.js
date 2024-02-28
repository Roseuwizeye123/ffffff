import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Contact = () => {
  return (
    <>
    <Navbar/>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Contact Us</h1>
    <div class="row">
      <div class="col-md-6">
        <h4>Contact Information</h4>
        <p><strong>Address:</strong> Nyarugenge, Kigali, Rwanda</p>
        <p><strong>Email:</strong> fideluwiringiyima@gmail.com</p>
        <p><strong>Phone:</strong> +250 788843907</p>
      </div>
      <div class="col-md-6">
        <h4>Contact Form</h4>
        <form>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" required/>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" required/>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea class="form-control" id="message" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-12">
        <h4>Location</h4>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d[...]"></iframe>
      </div>
    </div>
  </div>


    
    <Footer/>
    </>
   
  )
}

export default Contact