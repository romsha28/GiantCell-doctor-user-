import React, {useEffect, useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import axios from 'axios'

const LoginPage = () => {
  //const location = useLocation()

  const [username, setUsername] = useState(); 
  const [otp, setOtp] = useState();
  const [sendOtp, setSendOtp] = useState(false);
  const [loader, setLoader] = useState(false)
  
  let headers = { headers: {
    'Content-Type': 'multipart/form-data'}}

  async function login_function(){
    setLoader(true)
    let url = "http://127.0.0.1:8000/v1/api/login/"
    const formData = new FormData()
    formData.append("username", username)
    formData.append("otp", otp)

    await axios.post(url, formData, headers).then(resp=>{

      if (resp.data.status === 200){
        localStorage.setItem('v1_user_data', JSON.stringify(resp.data.data))
        setLoader(false)
        window.location.href = ('/')
      }
      else{
        toast.error(`${resp.data.status}- ${resp.data.msg}`)
      }
      setLoader(false)

    })
    .catch(err=>{
      toast.error(`Axios Call Failed ${err}`);
      setLoader(false)
    })







    //console.log(localStorage.setItem('v1_user_data', 'exist_data'))
    //window.location.href = ('/account')
    //toast.success("OTP Not Verify");
  }

  async function set_otp_function(){
    setLoader(true)
    let url = "http://127.0.0.1:8000/v1/api/login/?tag=set-otp"
    const formData = new FormData()

    formData.append("username", username)

    

    await axios.post(url, formData, headers).then(resp=>{

      if (resp.data.status === 200){
        
        setSendOtp(true)
        toast.success(`${resp.data.status}- ${resp.data.msg}`)
      }
      else{
        toast.error(`${resp.data.status}- ${resp.data.msg}`)
      }
      setLoader(false)

    })
    .catch(err=>{
      toast.error(`Axios Call Failed ${err}`);
      setLoader(false)
    })

    
  }

  



  

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      console.log("one time")

    }
    return () => mounted = false;
}, [])


    // toast.error("OTP Not Verify");
  return <>
  <LoadingOverlay active={loader} spinner>
      <ToastContainer />
      <div className="number_mn" style={{ height: "100vh" }}>
        <div
          className="container d-flex justify-content-center align-items-center h-100"
          style={{ height: "100%" }}
        >
          <div className="row w-65">
            <div className="col-md-12">
              <div className="container new-login-area">
                
              <div id="sign-in" className="login-setup-section bbb">
                    <h4 className="request-otp-header text-center mb-4 pb-3 font-weight-bold">
                      Register Or LogIn Your Account
                    </h4>
                    <div className="form-group login-label">
                      <label
                        for="inputnumber"
                        className="text-primary font-weight-bold"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        className="form-control input-edit mb-4"
                        placeholder="Enter mobile number"
                        id="number"
                        
                        onChange={(e)=>setUsername(e.target.value)}
                      />
                    </div>

                    {sendOtp === true
                    ?
                    <>

                    <div className="form-group login-label">
                      <label
                        for="inputnumber"
                        className="text-primary font-weight-bold"
                      >
                        Otp
                      </label>
                      <input
                        type="number"
                        className="form-control input-edit mb-4"
                        placeholder="_/_/_/_/_/_"
                        id="number"
                        
                        onChange={(e)=>setOtp(e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-center w-100">
                      <button
                        type="button"
                        className="btn btn-sucess bbt mb-2 d-flex justify-content-center text-white mt-2 mb-4"
                        id="request-otp"
                        onClick={login_function}
                      >
                        Verify
                      </button>
                    </div>
                    
                    </>
                    :
                    <>
                    <div className="d-flex justify-content-center w-100">
                      <button
                        type="button"
                        className="btn btn-sucess bbt mb-2 d-flex justify-content-center text-white mt-2 mb-4"
                        id="request-otp"
                        onClick={set_otp_function}
                      >
                        Get Otp
                      </button>
                    </div>
                    
                    </>}
                    
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      Login With Doctor Panel ? <Link to="/signin">Click Here</Link>{" "}
                    </Form.Group>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  
  </>;
};

export default LoginPage;
