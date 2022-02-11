import React, { useState, useEffect, Component } from 'react';
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import Nav from '../Parts/Nav';
//import Sidebar from '../Parts/Sidebar';
import Footer from '../Parts/Footer';
import AxiosFunction from '../AxiosFunction';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types'



const DoctorDetails = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [loader, setLoader] = useState(true)
  const [recomm, setRecomm] = useState([]);
  //const [totalShow, setTotalShow] = useState(5);
  const [doctor, setDoctor] = useState([]);
  const [clinic, setClinic] = useState([]);
  const [doctorUser, setDoctorUser] = useState(null);
  const [slot, setSlot] = useState([])
  const [doctorReview, setDoctorReview] = useState([]);
  const [familly, setFamilly] = useState([])

  const [name, setName] = useState('')
  const [slotId, setSlotId] = useState('')
  const [fmId, setFmId] = useState(1)
  const [language, setLanguage] = useState('Hindi')
  const [issue, setIssue] = useState('test')
  // const [name, setName] = useState('')


  function setFormFun(data){
    if (data.type === 'slot'){
      setSlotId(data.id)
      
    }
    else{
      setFmId(data.id)
    }

  }


  function appoimentSubmit() {
    const formData = new FormData()

    formData.append("name", name)
    
    formData.append("patient_familly", fmId)
    formData.append("doctor_slot", slotId)
    formData.append("language", language)
    formData.append("illness_information", issue)
    

    // AxiosFunction('post','v1/api/appoiment/',formData).then(resp=>{
    //   alert("Success")
    //   console.log(resp)
    // })

    AxiosFunction('post', 'v1/api/appoiment/', formData).then(resp=>{

      console.log(resp)
      // if(resp.bknd_data.status === 200){
      //   toast.success(resp.bknd_data.status + '-' + resp.bknd_data.msg)
      //   setuserData(resp.bknd_data.data.profile)
      //   setUsername(resp.bknd_data.data.user)
      // }
      // else{
      //   toast.error(resp.bknd_data.status + '-' + resp.bknd_data.msg)
      // }
      // setLoader(false)
    })


    alert("ok.......")
  }


  useEffect(() => {
    let mounted = true;
    if (mounted) {



      AxiosFunction('get', `v1/api/doctors/${id}/`, {}, false).then(resp => {
        //setDocter(resp.bknd_data.data)
        if (resp.bknd_data.status === 400) {
          navigate('/my-doctors/')
          return
        }
        //console.log("Axios Data Doctor Id-->>", resp.bknd_data)
        setRecomm(resp.bknd_data.recommended_doctors)
        setDoctor(resp.bknd_data.data.doctor)
        setDoctorUser(resp.bknd_data.data.user)
        setClinic(resp.bknd_data.data.clinic_detail)
        setDoctorReview(resp.bknd_data.data.reviews)
        setLoader(false)
      })

      AxiosFunction('get', `v1/api/doctor-slot/${id}/`, {}, false).then(resp => {
        setSlot(resp.bknd_data.data)
        setLoader(false)
      })


      if (props.user !== false) {

        AxiosFunction('get', `v1/api/familly/`, {}, true).then(resp => {
          setFamilly(resp.bknd_data.data)
        })
      }

    }
    return () => mounted = false;
  }, [id])



  return <>
    <LoadingOverlay active={loader} spinner>
      <ToastContainer />

      <div className='container-scroller'>

        <div className="container-fluid page-body-wrapper">

          <Nav />

          <div className="">
            <div className="container-scroller ">
              <div className="content-wrapper">


                <div className="row">
                  <div className="row" >
                    <div className="col-md-12">

                      {console.log('Familly-->>', familly)}



                      <div className="row" >
                        {doctor.map((i, id) => (
                          <div className="col-md-8" key={id}>

                            <div className="profile-head">

                              <div className="row">
                                <div className="col-md- col-sm-4 col-xs-12 dct_pic">
                                  <img src={i.photo ? 'http://127.0.0.1:8000' + i.photo : ''} className="img-responsive" />

                                </div>

                                <div className="col-md-7 col-sm-5 col-xs-12">
                                  <h5>{i.name}</h5>
                                  <ul>
                                    <li><i className="fa fa-briefcase rt_tx"></i>
                                      {i.specialties ? i.specialties : 'Not Set'}</li>
                                    <li><i className="fa fa-map-marker rt_tx"></i> India</li>
                                    <li><i className="fa fa-home rt_tx"></i>{i.address} </li>

                                    <li>
                                      <i className="fa fa-envelope-o rt_tx"></i>

                                      {doctorUser ?
                                        <a href="#" title="mail" >

                                          {doctorUser.email}
                                        </a>
                                        :
                                        ''
                                      }


                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div data-spy="scroll" className="tabbable-panel">

                              <div className="tabbable-line">
                                <div className="mnu_tb">
                                  <ul className="nav nav-tabs ">
                                    <li className="active">
                                      <a href="#tab_default_1" data-toggle="tab" class="active show">
                                        Profile </a>
                                    </li>
                                    <li>
                                      <a href="#tab_default_2" data-toggle="tab">Certificate</a>
                                    </li>

                                    <li>
                                      <a href="#tab_default_3" data-toggle="tab">Work Exprience</a>
                                    </li>


                                    <li>
                                      <a href="#tab_default_6" data-toggle="tab">Reviews</a>
                                    </li>
                                  </ul>
                                </div>
                                <div className="tab-content">
                                  <div className="tab-pane active" id="tab_default_1">
                                    <div className="well well-sm">
                                      <h4>Doctor Profile</h4>
                                    </div>
                                    <table className="table bio-table">
                                      <tbody>
                                        <tr>
                                          <td>Full Name </td>
                                          <td>: {i.name}</td>
                                        </tr>
                                        <tr>
                                          <td>Contact No.</td>
                                          <td>: No Data</td>
                                        </tr>
                                        <tr>
                                          <td>Email</td>
                                          <td>: {doctorUser ? doctorUser.email : ''} </td>
                                        </tr>
                                        <tr>
                                          <td>Gender</td>
                                          <td>: {i.sex}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="tab-pane" id="tab_default_2">
                                    <div className="well well-sm">
                                      <h4>Certificate & Acchivements</h4>
                                    </div>
                                    <table className="table bio-table">
                                      <tbody>
                                        <tr>
                                          <td>Process</td>
                                          <td>: </td>
                                          <td>Year Graduated</td>
                                          <td>: </td>
                                        </tr>

                                        <tr>
                                          <td>Bachelor of Engineering (B.Eng)<br />Bachelor of Technology
                                            (B.Tech)</td>
                                          <td>: </td>
                                          <td>Year Graduated</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Master of Engineering (M.Eng)<br />Master of Technology
                                            (M.Tech)</td>
                                          <td>: </td>
                                          <td>Year Graduated</td>
                                          <td>: </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="tab-pane" id="tab_default_3">
                                    <div className="well well-sm">
                                      <h4>EMPLOYMENT RECORD</h4>
                                    </div>
                                    <table className="table bio-table">
                                      <tbody>
                                        <tr>
                                          <td>Date</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Position</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Principle Activites</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Employer</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Type of Activites</td>
                                          <td>: </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <br />
                                    <table className="table bio-table">
                                      <tbody>
                                        <tr>
                                          <td>Date</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Position</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Principle Activites</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Employer</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Type of Activites</td>
                                          <td>: </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <br />
                                    <table className="table bio-table">
                                      <tbody>
                                        <tr>
                                          <td>Date</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Position</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Principle Activites</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Employer</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Type of Activites</td>
                                          <td>: </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="tab-pane" id="tab_default_4">
                                    <div className="well well-sm">
                                      <h4>OFFICIAL AND PERSONAL CONTACTS</h4>
                                    </div>
                                    <table className="table bio-table">
                                      <tbody>
                                        <tr>
                                          <td>Office Telephone Number</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Office Mobile Phone</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Official Email Address</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Personal Mobile Phone</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Personal Email Address </td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Home Phone</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Facebook Account</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Twitter Account</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Skype Account</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>LinkedIn Account</td>
                                          <td>: </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="tab-pane" id="tab_default_5">
                                    <div className="well well-sm">
                                      <h4>ADDRESS DETAILS</h4>
                                    </div>
                                    <table className="table bio-table">
                                      <thead>
                                        <tr>
                                          <th colspan="2">Present Residential Address</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>   Line 1</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>   Line 2</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>   City</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>   State</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>   Country</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>   Pin code</td>
                                          <td>: </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <br />
                                    <table className="table bio-table">
                                      <thead>
                                        <tr>
                                          <th colspan="2">Permanent Residential Address</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>   Plot No / Door No / Part No / Block No</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>Street Name</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>   City</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>   State</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>   Country</td>
                                          <td>: </td>
                                        </tr>
                                        <tr>
                                          <td>   Pin code</td>
                                          <td>: </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="tab-pane" id="tab_default_6">
                                    <div className="well well-sm">
                                      <h4>Reviews</h4>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 col-md-offset-4">

                                        Total {doctorReview.length} Review Found

                                        {/* <button type="button"
                                          className="btn btn-primary btn-rounded btn-fw">Aproove</button>
                                        <button type="button"
                                          className="btn btn-danger btn-rounded btn-fw">Reject</button> */}
                                      </div>

                                    </div>

                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                        ))}


                        <div className="col-md-4">

                          {clinic.map((i, id) => (

                            <div className="sold_tx" key={id}>
                              <h6>{i.name}</h6>
                              <p>{i.description === '' ? 'No Description' : i.description}</p>

                              <h5>₹{i.clinic_fee} <span> Fees</span></h5>
                              <p>{i.address ? i.address : 'No Address'}</p>
                            </div>

                          ))}



                          <div className="tab">




                            <button className="tablinks active" onclick="openCity(event, 'London')">
                              <p className="tb_tx">Today <span>No Slots Available</span></p>
                            </button>
                            <button className="tablinks" onclick="openCity(event, 'Paris')">
                              <p className="tb_tx">Tomorrow <span>2 slots Available</span></p>
                            </button>
                            <button className="tablinks" onclick="openCity(event, 'Tokyo')">
                              <p className="tb_tx">6 Feb to 9 Feb<span>No Slots Available</span></p>
                            </button>
                          </div>

                          <div id="London" className="tabcontent" style={{ "display": "block" }}>

                            <div id="Paris" className="tabcontent" style={{ "display": "block" }}>


                              <div className="tmm_slot">
                                {slot.length === 0 ?
                                  <span>No slots available for today</span>

                                  :

                                  <div className="row">
                                    <p>Total Available Slot <span>({slot.length} slot)</span></p>
                                    {console.log(slot)}
                                    {slot.map((i, id) => (

                                      <div className="col-md-12" key={id}>
                                        {i.slot.map((s, sId) => (

                                          <div class="card rounded-3 shadow-sm border-primary" key={sId}>

                                            {s.clinics.map((c, cId) => (
                                              <div key={cId}>

                                                <div class="card-header text-white bg-primary border-primary">

                                                  <h4 class="my-0 fw-normal" key={cId}>{c.name}</h4>


                                                </div>
                                                <div class="card-body">

                                                  <h1 class="card-title pricing-card-title">
                                                    Rs: {c.clinic_fee}
                                                  </h1>

                                                  <ul class="list-unstyled mt-3 mb-4">
                                                    <li>Open Time: {s.slot_time}</li>
                                                    <li>Close Time: {s.slot_end_time}</li>
                                                    <li>{!i.is_available ? 'Not' : ''}Available</li>

                                                  </ul>
                                                  <button type="button" class="btn btn-primary"
                                                    data-toggle="modal"
                                                    onClick={()=>setFormFun({type:'slot', id:i.id})}
                                                    data-target="#exampleModal">

                                                    Book Now

                                                  </button>
                                                </div>
                                              </div>

                                            ))}


                                          </div>



                                        ))}


                                      </div>

                                    ))}





                                  </div>

                                }



                              </div>


                            </div>


                            <div className="clndr1">

                              <a href="#"><i className="fa fa-phone"></i> call now</a>
                            </div>

                          </div>





                        </div>
                      </div>





                    </div>
                  </div>

                  {/* Recommended Doctor List */}

                  <div className="hovr_pic mt-2">
                    <div className="well_mn">
                      <div className="row">
                        <div className="col-md-6 nt_tx mt-3">
                          <p>Recommended Doctors</p>
                        </div>
                        <div className="col-md-6 nt_tx2">
                          <a href="#">View All <i className="fa fa-fw arr" aria-hidden="true" title=""></i></a>
                        </div>
                      </div>
                    </div>
                    <div className="row">

                      {recomm.map((i, id) => (

                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 " key={id}>

                          <div className="lily-box">

                            <img src={i.photo ? process.env.REACT_APP_ENV + i.photo : ''} />

                            <Link to={"/doctors/" + i.id}>
                              <div className="lily-caption">
                                <div className="lily-title">
                                  {i.name}
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>

                      ))}




                    </div>
                  </div>
                </div>






              </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Slot Id {slotId}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">


                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Name</label>
                      <input type="email" class="form-control" id="exampleFormControlInput1"
                        placeholder="name@example.com" />
                    </div>

                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Familly Id</label>
                      <select  class="form-control" 
                      onClick={(e)=>setFormFun({type:'fm', id:e.target.value})}
                      >

                          {familly.map((i,id)=>(
                            <option value={i.id} key={id}>{i.id}</option>
                          ))}

                        </select>

                    </div>

                            {console.log(fmId)}

                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Mobile</label>
                      <input type="email" class="form-control" id="exampleFormControlInput1"
                        placeholder="name@example.com" />
                    </div>

                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">City</label>
                      <input type="email" class="form-control" id="exampleFormControlInput1"
                        placeholder="name@example.com" />
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Doctor Appointment At</label>
                      <input type="time" class="form-control" id="exampleFormControlInput1"
                        placeholder="name@example.com" />
                    </div>

                    <div class="mb-3">
                      <label for="exampleFormControlInput1"
                        class="form-label">meeting_time_period</label>
                      <input type="time" class="form-control" id="exampleFormControlInput1"
                        placeholder="name@example.com" />
                    </div>

                    <div class="mb-3">
                      <label for="exampleFormControlTextarea1" class="form-label">Health Issue</label>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div class="mb-3">
                      <label for="exampleFormControlTextarea1" class="form-label">Address</label>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>




                  </div>
                  <div class="modal-footer">

                    <button type="button" class="btn btn-primary"
                      onClick={appoimentSubmit}
                    >Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>


        </div>
      </div>

    </LoadingOverlay>
  </>;
};

export default DoctorDetails;



