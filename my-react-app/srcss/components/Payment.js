import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

import { generateTransactionId } from './utils'; 


const Payment = () => {

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState({});
  let amount = 100;
  const { id } = useParams();
  const studentId = localStorage.getItem('userID');

  const onPhoneChange = (e) => {
    var em = e.target.value;
    if (em != "") {
      setPhone({ value: em });
    } else {
      setPhone({ value: em, message: "Enter your phone" });
    }
  };

  const makePayment = async (e) => {
    e.preventDefault();

    if (phone.value == null || phone.value == "") {
      setPhone({ message: "Write you phone number" });
    } else {

      const dynamicTransactionId = generateTransactionId();

      const payload = {
        "telephoneNumber": phone.value,
        "amount": amount,
        "studentId": studentId,
        "courseId": id,
        "organizationId": "8e12e3d1-3e1f-4183-8e09-798cc22c67c8",
        "callbackUrl" : "http://127.0.0.1:8000/api/paymentscallback",
        "transactionId": dynamicTransactionId,
        
      };
      try {
        setLoading(true);
        const response = await axios.post(
          "https://opay-api.oltranz.com/opay/paymentrequest?",
          payload
        );

       await axios.post('http://127.0.0.1:8000/api/payments',
          payload
       )

      setLoading(false);
      toast.success("Payment successful!");
      setTimeout(()=>{
        history.push('/courses')
      }, 700);
       

        // console.log("descripiton =====>", response.data.decription);

        // console.log("status =====>", response.data.status);

        
      } catch (error) {
        console.log("Errors", error)
        toast.warn("Failed to pay");
      }
    }
  };
  return (
    <>
      <Navbar />

      <div class="container mt-5">
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h3 class="text-center">Payment Details</h3>
              </div>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="phoneNumber">Phone Number:</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="phoneNumber"
                      placeholder="Enter your phone number"
                      pattern="[0-9]{10}"
                      onChange={onPhoneChange}
                      required
                    />
                    <small class="form-text text-muted">
                      Please enter a valid 10-digit phone number. e.g
                      250784430789
                    </small>
                  </div>
                  <div class="form-group">
                    <label for="paymentAmount">Payment Amount:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="paymentAmount"
                      placeholder="Enter the amount"
                      value="100"
                      readOnly
                    />
                  </div>
                  {/* <div class="form-group">
                                <label for="paymentMethod">Select Payment Method:</label>
                                <select class="form-control" id="paymentMethod">
                                    <option value="MTN MoMo">MTN MoMo</option>
                                    <option value="TigoCash">TigoCash</option>
                                </select>
                            </div> */}
                  {!loading ? <button
                    type="submit"
                    class="btn btn-primary btn-block"
                    onClick={makePayment}
                  >
                    Make Payment
                  </button>: <h6>Check your mobile phone to confirm payment</h6>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
