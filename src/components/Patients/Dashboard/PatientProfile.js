import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import Nav from '../Parts/Nav';
import Sidebar from '../Parts/Sidebar';
import Footer from '../Parts/Footer';
//import {Link} from 'react-router-dom'

import AxiosFunction from '../AxiosFunction';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const PatientProfile = (props) => {
const [loader, setLoader] = useState(true)
const [userData, setuserData] = useState([])
const [localData, setLocalData] = useState({
ip: "",
city: "",
state: "",
longitude: "",
latitude: "",
zip: "",
country: "",

})

const [username, setUsername] = useState('')
const [showMap, setShowMap] = useState(false)

const [mapCenter, setMapCenter] = useState({
  center: {
    lat: 59.95,
    lng: 30.33
  }
})

const [mapZoom, setMapZoom] = useState(11)

function show_map_function(){
  setShowMap(!showMap)
}

function update_profile(){
  setLoader(true)
  const formData = new FormData()

  let name = document.getElementById('name').value
  let file = document.getElementById('attach_file').files[0]
  let email = document.getElementById('email').value
  let locality = document.getElementById('locality').value
  let address = document.getElementById('address').value
  let address2 = document.getElementById('address2').value
  let city = document.getElementById('city').value
  let state = document.getElementById('state').value
  let pincode = document.getElementById('pincode').value
  let latitude_coordinate = document.getElementById('latitude_coordinate').value
  let longitude_coordinate = document.getElementById('longitude_coordinate').value
  let sex = document.getElementById('sex').value
  let language = document.getElementById('language').value

  let dob = document.getElementById('dob').value



  if (name.length >3){
    formData.append('name', name)
  }

  if (dob){
    formData.append('dob', dob)

  }

  if (email.length >3){
    formData.append('email', email)
  }

  if (locality.length >3){
    formData.append('locality', locality)
    alert(locality)
  }
  
  if (file){
    formData.append("attach_file", file)
  }
  if (address.length >3){
    formData.append('address', address)
  }
  if (address2.length >3){
    formData.append('address2', address2)
  }




  if (city.length >3){
    formData.append('city', city)
  }
  if (state.length >3){
    formData.append('state', state)
  }
  if (pincode.length >3){
    formData.append('pincode', pincode)
  }


  if (latitude_coordinate.length >3){
    formData.append('latitude_coordinate', latitude_coordinate)
  }
  if (longitude_coordinate.length >3){
    formData.append('longitude_coordinate', longitude_coordinate)
  }
  if (sex.length >2){
    formData.append('sex', sex)
  }
  if (language.length >3){
    formData.append('language', language)
  }

 

  

  AxiosFunction('post', 'v1/api/account/', formData).then(resp=>{
    if(resp.bknd_data.status === 200){
      toast.success(resp.bknd_data.status + '-' + resp.bknd_data.msg)
      setuserData(resp.bknd_data.data.profile)
      setUsername(resp.bknd_data.data.user)
    }
    else{
      toast.error(resp.bknd_data.status + '-' + resp.bknd_data.msg)
    }
    setLoader(false)
  })




}


useEffect(() => {
let mounted = true;
if (mounted) {
    AxiosFunction('get', 'v1/api/account/', {})
    .then(resp => {
      setuserData(resp.bknd_data.data.profile)
      let geo_data = JSON.parse(localStorage.getItem('v1_user_data')).geo_data.geo_data
      setLocalData({
      ip: geo_data.ip,
      city: geo_data.city,
      state: geo_data.region_name,
      longitude: geo_data.longitude,
      latitude: geo_data.latitude,
      zip: geo_data.zip,
      country: geo_data.country_name,

      })
      setUsername(resp.bknd_data.data.user)
      setLoader(false)
    })
    .catch(err=>{
      setLoader(false)
      alert('Failed To Load')
      //localStorage.removeItem('v1_user_data')
      //window.location.href = ('/login')
    })



}
return () => mounted = false;
}, [])


//alert("ok.....")

return <>
  <LoadingOverlay active={loader} spinner>
    <ToastContainer />
    <div className="container-scroller">
      
      <Nav />
      <div className="container-fluid page-body-wrapper">
        <Sidebar user={props.user}/>

        <div className="main-panel">
          
          <div className="content-wrapper">

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">

                      {/*Left Side */}
                      <div className="col-lg-4">

                      {userData.map((i,id)=>(

                      <>
                        <div className="border-bottom text-center pb-4">
                      
                          <>
                          {!i.photo?<>
                            <img src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" alt="profile"
                            className="img-lg rounded-circle mb-3" />
                          </>
                          :
                          <>
                           <img src={'http://127.0.0.1:8000'+i.photo} alt="profile"
                            className="img-lg rounded-circle mb-3" />
                          </>
                            }
                          </>

                          
                          {username.name !== '' ?
                          <p>Name: {username.name} </p>
                          :
                          "No Name Found!"
                          }
                          
                          

                        </div>

                        <div className="py-4">

                          <p className="clearfix mb-2">
                            <span className="float-left">
                              Email Id
                            </span>
                            <span className="float-right text-muted">
                              {username.email}
                            </span>
                          </p>


                          <p className="clearfix mb-2">
                            <span className="float-left">
                              Contact No
                            </span>
                            <span className="float-right text-muted">
                              +{username.username}
                            </span>
                          </p>


                          <p className="clearfix mb-2">
                            <span className="float-left">
                              Gender
                            </span>
                            <span className="float-right text-muted">
                              {i.sex}
                            </span>
                          </p>

                          <p className="clearfix mb-2">
                            <span className="float-left">
                              Date Of Birth
                            </span>
                            <span className="float-right text-muted">
                              {i.dob}
                            </span>
                          </p>

                          {/* <p className="clearfix mb-2">
                            <span className="float-left">
                              Language
                            </span>
                            <span className="float-right text-muted">
                              {i.language}
                            </span>
                          </p> */}

                          <p className="clearfix mb-2">
                            <span className="float-left">
                              Address Line
                            </span>
                            <span className="float-right text-muted">
                              {i.address}
                            </span>
                          </p>

                          {/* <p className="clearfix mb-2">
                            <span className="float-left">
                            Address Line 2
                            </span>
                            <span className="float-right text-muted">
                              {i.address2}
                            </span>
                          </p>

                          <p className="clearfix mb-2">
                            <span className="float-left">
                              Locality
                            </span>
                            <span className="float-right text-muted">
                              {i.locality}
                            </span>
                          </p> */}

                          <p className="clearfix mb-2">
                            <span className="float-left">
                              City
                            </span>
                            <span className="float-right text-muted">
                              {i.city}
                            </span>
                          </p>

                          <p className="clearfix">
                            <span className="float-left">
                              State
                            </span>
                            <span className="float-right text-muted">
                              {i.state}
                            </span>
                          </p>

                          <p className="clearfix mb-2">
                            <span className="float-left">
                              Area Code
                            </span>
                            <span className="float-right text-muted">
                              {i.pincode}
                            </span>
                          </p>

                          <p className="clearfix mb-2">
                            <span className="float-left">
                              Country
                            </span>
                            <span className="float-right text-muted">
                              {i.country}
                            </span>
                          </p>

                          


                        </div>
                      </>

                      ))}

                        

                        <div className="border-bottom py-4">
                          <div className="d-flex">
                            <div className="progress progress-md flex-grow">
                              <div className="progress-bar bg-success" role="progressbar" aria-valuenow="75"
                                style={{ "width" : "75%" }} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </div>


                        <div className="py-4">

                          <p className="clearfix">
                            <span className="float-left">
                              Ip
                            </span>
                            <span className="float-right text-muted">
                              {localData.ip}
                            </span>
                          </p>






                          <p className="clearfix">
                            <span className="float-left">
                              State
                            </span>
                            <span className="float-right text-muted">
                              {localData.state}
                            </span>
                          </p>

                          <p className="clearfix">
                            <span className="float-left">
                              Locality
                            </span>
                            <span className="float-right text-muted">
                              {localData.city}
                            </span>
                          </p>

                          <p className="clearfix">
                            <span className="float-left">
                              Area Code
                            </span>
                            <span className="float-right text-muted">
                              {localData.zip}
                            </span>
                          </p>

                          <p className="clearfix">
                            <span className="float-left">
                              Country
                            </span>
                            <span className="float-right text-muted">
                              {localData.country}
                            </span>
                          </p>

                          {/* <p className="clearfix">
                            <span className="float-left">
                              Latitude
                            </span>
                            <span className="float-right text-muted">
                              {localData.latitude}
                            </span>
                          </p>

                          <p className="clearfix">
                            <span className="float-left">
                              Longitude
                            </span>
                            <span className="float-right text-muted">
                              {localData.longitude}
                            </span>
                          </p> */}


                        </div>

                        <button className="btn btn-primary btn-block">Live Location</button>
                      </div>




                          {/*Right Side */}
                      <div className="col-lg-8">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h3>
                               
                                {username.name !== '' ?
                                <>
                                {username.name} 
                                </>
                                :
                                username.username
                                }
                          </h3>
                            <div className="d-flex align-items-center">
                              
                              {/* {userData.map((i,id)=>(
                                <h5 className="mb-0 mr-2 text-muted" key={id}>
                                  {i.occupation}
                                </h5>
                                
                                ))} */}
                                
                              
                            </div>
                          </div>
                          <div>
                            
                          </div>
                        </div>
                        
                        <div className="row profile-feed  mt-3">


                          <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body">
                                <h4 className="card-title">Profile form</h4>

                                {userData.map((i,id)=>(
                                  <div className="forms-sample" key={id}>

                                  <div className="row">
                                    <h5 className="mb-0 mt-2 text-muted">Profile Section</h5>
                                    <hr/>
                                    
                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputUsername1">Name*</label>
                                      <input type="text" className="form-control" id='name'
                                      
                                      placeholder={username.name}/>
                                    </div>

                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputEmail1">Email(Optional)</label>
                                      <input type="email" className="form-control"
                                      id='email'
                                      placeholder={username.email}/>
                                    </div>

                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputEmail1">Language</label>
                                      <select  className="form-control" id="language" >
                                        <option value="Hindi">Hindi</option>
                                        <option value="English">English</option>
                                        <option value="Bengali">Bengali</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputEmail1">Gender</label>
                                      <select  className="form-control" id='sex' >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputEmail1">Profile Pic</label>
                                      <input type="file" className="form-control" id="attach_file"
                                      
                                      placeholder="Upload Image"/>
                                    </div>

                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputEmail1">DOB</label>
                                      <input type="date" className="form-control"
                                      id="dob" />
                                    </div>

                                    <h5 className="mb-0 mt-2 text-muted">Address</h5>
                                    <hr/>

                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputUsername1">Address Line*</label>
                                      <input type="text" className="form-control"
                                      id="address"
                                      placeholder={i.address}/>

                                    </div>

                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputEmail1">Address Line2</label>
                                      <input type="email" className="form-control"
                                      id="address2"
                                      placeholder={i.address2}/>
                                    </div>

                                    <div className="form-group mb-2 col-md-12">
                                      <label for="exampleInputUsername1">Locality*</label>
                                      <input type="text" className="form-control"
                                      id="locality"
                                      placeholder={i.locality}/>

                                    </div>

                                    
                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputUsername1">City*</label>
                                      <input type="text" className="form-control"
                                      id="city"
                                      placeholder={i.city}/>

                                    </div>

                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputEmail1">Country</label>
                                      <input type="text" className="form-control"
                                      id="country"
                                      placeholder={i.country} readOnly/>
                                    </div>

                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputUsername1">State*</label>
                                      <input type="text" className="form-control"
                                      id="state"
                                      placeholder={i.state}/>

                                    </div>

                                    <div className="form-group mb-2 col-md-6">
                                      <label for="exampleInputEmail1">Zip Code*</label>
                                      <input type="email" className="form-control" id="exampleInputEmail1"
                                      id="pincode"
                                      placeholder={i.pincode}/>
                                    </div>

                                    {/* <h5 className="mb-0 mt-2 text-muted">Geo Location</h5>
                                    <hr/> */}


                                    <div className="form-group mb-2 col-md-6" style={{'display':'none'}}>
                                      <label for="exampleInputUsername1">Longitude*</label>
                                      <input type="text" className="form-control"
                                      id='longitude_coordinate'
                                      placeholder={i.longitude_coordinate}/>

                                    </div>

                                    <div className="form-group mb-2 col-md-6" style={{'display':'none'}}>
                                      <label for="exampleInputEmail1">Latitude*</label>
                                      <input type="email" className="form-control"
                                      id='latitude_coordinate'
                                      placeholder={i.latitude_coordinate}/>
                                    </div>

                                    <div className="form-group mb-2 col-md-6">
                                    <label className="form-check-label" onClick={show_map_function}>
                                    {!showMap?
                                        "Show Map"
                                        :
                                        "Hide"
                                    }
                                      
                                      </label>
                          
                                    </div>

                                    {showMap?
                                    <div className="form-group mb-2 col-md-12">
                                      <GoogleMapReact
                                        bootstrapURLKeys=""
                                          defaultCenter={mapCenter}
                                          defaultZoom={mapZoom}
                                        >
                                          <AnyReactComponent
                                            lat={59.955413}
                                            lng={30.337844}
                                            text="My Marker"
                                          />
                                      </GoogleMapReact>                            
                                    </div>
                                    :
                                    ''
                                    }





                                  </div>


                                  <button className="btn btn-primary mr-2"
                                  onClick={update_profile}
                                  >Submit</button>
                                  
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
              </div>
            </div>

            {userData.map((i,id)=>(console.log(i)))}                      



          </div>

        </div>

        
      </div>
    </div>
  </LoadingOverlay>

</>;
};

export default PatientProfile;