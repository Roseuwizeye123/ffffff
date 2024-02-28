import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useParams } from "react-router-dom";

import { generateTransactionId } from './utils'; 


const Payment = () => {

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("full");

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const coursePrice = queryParams.get("course_price");
  const level = queryParams.get("level");
  const [amount, setAmount] = useState(coursePrice);

  const { id } = useParams();
  
  const studentId = localStorage.getItem('userID');

  // console.log("price: =====>", coursePrice);

  const onPhoneChange = (e) => {
    var em = e.target.value;
    if (em != "") {
      setPhone({ value: em });
    } else {
      setPhone({ value: em, message: "Enter your phone" });
    }
  };


  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if(e.target.value === 'full'){
      setAmount(coursePrice);
    }
  };

  

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const makePayment = async (e) => {
    e.preventDefault();

    // let amount = document.getElementById('installmentPaymentAmount').value;

    if (phone.value == null || phone.value == "") {
      toast.warn("Phone number is required");
      setPhone({ message: "Write you phone number" });
    } else {

      const dynamicTransactionId = generateTransactionId();

      const payload = {
        "telephoneNumber": phone.value,
        "amount": amount,
        "studentId": studentId,
        "courseId": id,
        "level":level,
        "organizationId": "8e12e3d1-3e1f-4183-8e09-798cc22c67c8",
        "callbackUrl" : "http://127.0.0.1:8000/api/paymentscallback",
        "transactionId": dynamicTransactionId,
      };
      try {
        if(parseInt(amount) > parseInt(coursePrice) || parseInt(amount) <= 100 ){
          toast.warn(`Please enter valid amount based on the course price`)
        } else{
        setLoading(true);
         const res = await axios.post(
           "https://opay-api.oltranz.com/opay/paymentrequest?",
           payload
         );

          const response = await axios.post('http://127.0.0.1:8000/api/payments',
            payload
          )

          toast.success(response.data.message);
          setTimeout(()=>{
            setLoading(false);
            history.push('/courses')
          }, 6000);
        }  
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
                    <label for="paymentMethod">Payment Method:</label>
                    <select
                      class="form-control"
                      id="paymentMethod"
                      onChange={handlePaymentMethodChange}
                    >
                      <option value="full">Pay in Full</option>
                      <option value="installments">Pay in Installments</option>
                    </select>
                  </div>
                  {paymentMethod === "full" ?
                    <div class="form-group">
                      <label for="paymentAmount">Payment Amount:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="paymentAmount"
                        placeholder="Enter the amount"
                        value={amount}
                        readOnly
                      />
                  </div>
                  : 
                  <div class="form-group">
                    <label for="installmentPaymentAmount">Enter amount:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="paymentAmount"
                      onChange={handleAmountChange}
                      placeholder="Enter the amount"
                    />
                    <p className="my-2 p-3">
                      If you choose to pay in installments, you will have access to this course once you have completed all your payments.
                    </p>
                  </div>
                  }
                 
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
                  </button>: <h6>Check your mobile phone to corfirm your payment</h6>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div><br/><br/><br/>
      <Footer />
    </>
  );
};

export default Payment;
