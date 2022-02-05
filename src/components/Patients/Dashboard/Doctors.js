import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import Nav from '../Parts/Nav';
import Sidebar from '../Parts/Sidebar';
import {Link} from 'react-router-dom'
import AxiosFunction from '../AxiosFunction';
import Footer from '../Parts/Footer';

const Doctors = (props) => {
const [loader, setLoader] = useState(true)

const [query, setQuery] = useState('')
const [addr, setAddr] = useState('')
const [pincode, setPincode] = useState('')
const [pageNo, setPageNo] = useState(1)
const [doctor, setDocter] = useState([])
const[arregement, setArregement] = useState([])


function filter_function(){
  setLoader(true)
  //console.log(query, pincode, addr)

  let query_param = `?query=${query}&address=${addr}&zip_code=${pincode}&page_no=${pageNo}`
  AxiosFunction('get',`v1/api/doctors/${query_param}`,{}, false).then(resp=>{
    console.log('---->>>>',resp)
    setDocter(resp.bknd_data.data)
    setArregement(resp.bknd_data.arregement)
    setLoader(false)
  })
  
}



useEffect(() => {
  let mounted = true;
  
  if (mounted) {


    AxiosFunction('get',`v1/api/doctors/${window.location.search}`,{}, false).then(resp=>{
      setDocter(resp.bknd_data.data)
      //console.log("Axios Data-->>", resp.bknd_data)
      setArregement(resp.bknd_data.arregement)
      setLoader(false)
    })
      
  }
  return () => mounted = false;
  }, [])






return <>
  <LoadingOverlay active={loader} spinner>
    <ToastContainer />
    <div className="container">

      <Nav/>
      <div className="container-fluid">
        

        <div className="">
          <div className="">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-custom">
                <li class="breadcrumb-item"><a href="#">Doctors</a></li>
                
                <li class="breadcrumb-item active" aria-current="page">
                  <span>West Bengal Malda 732101</span>
                </li>
              </ol>
            </nav>


            {/* Filter Form */}

           

            <div className="row">
              <div class="col-md-12 ">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Search By Locations</h4>
                    <p class="card-description">
                    Showing {arregement.start_by?arregement.start_by:0}
                     to {arregement.end_by?arregement.end_by:0} entries on
                      Total ({arregement.total?arregement.total:0})
                    </p>
                    <div class="forms-sample row">

                      <div class="form-group col-md-4 mb-2">
                        <label for="exampleInputUsername1">Query</label>
                        <input type="text" class="form-control"
                        onChange={(e)=>setQuery(e.target.value)}
                        id="exampleInputUsername1" placeholder='Search'/>
                      </div>

                      <div class="form-group col-md-4 mb-2">
                        <label for="exampleInputUsername1">Address</label>
                        <input type="text" class="form-control"
                        onChange={(e)=>setAddr(e.target.value)}
                        id="exampleInputUsername1" placeholder="Username"/>
                      </div>

                      <div class="form-group col-md-4 mb-2">
                      <label for="exampleInputUsername1">Zip Code</label>
                        <div class="input-group">
                        
                          <input type="number" class="form-control"
                          placeholder="Recipient's username"
                          onChange={(e)=>setPincode(e.target.value)}
                          aria-label="Recipient's username"/>
                          <div class="input-group-append">
                            <button class="btn btn-sm btn-primary"
                              onClick={filter_function}
                             type="button">Search</button>
                          </div>
                        </div>
                    </div>
                      
                    
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>



            {/* Doctors Lists */}

            

            <div class="row">
            <div class="col-md-12 grid-margin">
              <div class="row">


                <div class="col-md-12">

                {doctor.map((i,id)=>(

                  <div class="boder_sec" key="id">

                    <div class="onin_pc">

                    <>
                          {!i.photo?
                            <img src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" alt="profile"
                            className="img-lg rounded-circle mb-3" />
                          
                          :
                           <img src={'http://127.0.0.1:8000'+i.photo} alt="profile"
                            className="img-lg rounded-circle mb-3" />
                            }
                    </>

                      
                    </div>
                    <div class="onin_tx">
                      <h4>{i.name? i.name:i.user}</h4>
                      <span>{!i.specialties? 'Not Set':i.specialties}</span>
                      <span>noset years experience overall</span>

                      <h6>{i.address} {i.city} <span>{i.state}</span></h6>
                      <p>₹{i.clinic_charges} Consultation fee at clinic</p>


                      <div class="thu_mn">
                        <a href=""><i class="fa fa-thumbs-up"></i> 97%</a>
                        {/* <span><a href="">1015 Patient Stories</a></span> */}
                      </div>
                    </div>

                    <div class="onin_btn">

                      <p><i class="fa fa-calendar-o"></i> Available Today</p>

                      <Link to={"/doctors/"+i.id}>Book Appointment <span class="sp_txx">No Booking Free</span></Link>

                      <a class="bc_non" href="">Video Consult</a>

                    </div>




                  </div>

                ))}





              

                </div>

              </div>
            </div>
          </div>





          </div>
        </div>


      </div>
    </div>
  </LoadingOverlay>
</>;
};

export default Doctors;