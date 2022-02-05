import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import Nav from '../Parts/Nav';
import Sidebar from '../Parts/Sidebar';
import Footer from '../Parts/Footer';
import AxiosFunction from '../AxiosFunction';
import { useParams } from 'react-router-dom';


const DoctorDetails = (props) => {
  
    let {id} = useParams();
    const [loader, setLoader] = useState(false)

    useEffect(() => {
      let mounted = true;
      if (mounted) {
    
    
        AxiosFunction('get',`v1/api/doctors/${id}/`,{}, false).then(resp=>{
          //setDocter(resp.bknd_data.data)
          console.log("Axios Data Doctor Id-->>", resp.bknd_data)
          //setArregement(resp.bknd_data.arregement)
          setLoader(false)
        })
          
      }
      return () => mounted = false;
      }, [])



  return <>
  <LoadingOverlay active={loader} spinner>
    <ToastContainer />
    <div className="container-scroller">
      
      <Nav user={props.user}/>
      <div className="container-fluid page-body-wrapper">
        <Sidebar user={props.user}/>

        <div className="main-panel">
          <div className="content-wrapper">
          <h1>DOCTOR {id}</h1>
            {props.user.username}

            <div class="row">
						<div class="col-md-5 grid-margin grid-margin-md-0 stretch-card">
							<div class="card">
								<div class="card-body text-center">
									<div class="mb-4">
										<img src="https://via.placeholder.com/100x100"
                     class="img-lg rounded-circle mb-2" alt="profile image"/>
										<h4>Maria Johnson</h4>
										<p class="text-muted mb-0">Developer</p>
									</div>
									<p class="mt-4 card-text">
											Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
											Aenean commodo ligula eget dolor. Lorem
									</p>
									<button class="btn btn-info btn-sm mt-3 mb-4">Follow</button>
									<div class="border-top pt-3">
										<div class="row">
											<div class="col-4">
												<h6>5896</h6>
												<p>Post</p>
											</div>
											<div class="col-4">
												<h6>1596</h6>
												<p>Followers</p>
											</div>
											<div class="col-4">
												<h6>7896</h6>
												<p>Likes</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-7 grid-margin grid-margin-md-0 stretch-card">
							<div class="card">
								<div class="card-body">
									<h4 class="card-title">Tickets</h4>
									<div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th class="pt-1 pl-0">
                            Assigned
                          </th>
                          <th class="pt-1">
                            Product
                          </th>
                          <th class="pt-1">
                            Priority
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="py-1 pl-0">
                            <div class="d-flex align-items-center">
                              <img src="https://via.placeholder.com/100x100" alt="profile"/>
                              <div class="ml-3">
                                <p class="mb-2">Sophia Brown</p>
                                <p class="mb-0 text-muted text-small">Product Designer</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            Web App
                          </td>
                          <td>
                            <label class="badge badge-success">Low</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="py-1 pl-0">
                            <div class="d-flex align-items-center">
                              <img src="https://via.placeholder.com/100x100" alt="profile"/>
                              <div class="ml-3">
                                <p class="mb-2">Rachel Newton</p>
                                <p class="mb-0 text-muted text-small">Mobile Developer</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            Mobile App
                          </td>
                          <td>
                            <label class="badge badge-warning">Medium</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="py-1 pl-0">
                            <div class="d-flex align-items-center">
                              <img src="https://via.placeholder.com/100x100" alt="profile"/>
                              <div class="ml-3">
                                <p class="mb-2">Marcus Stevens</p>
                                <p class="mb-0 text-muted text-small">Core Developer</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            Plugin
                          </td>
                          <td>
                            <label class="badge badge-danger">High</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="py-1 pl-0">
                            <div class="d-flex align-items-center">
                              <img src="https://via.placeholder.com/100x100" alt="profile"/>
                              <div class="ml-3">
                                <p class="mb-2">Theresa Becker</p>
                                <p class="mb-0 text-muted text-small">Product Designer</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            Web App
                          </td>
                          <td>
                            <label class="badge badge-success">Low</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="py-1 pl-0">
                            <div class="d-flex align-items-center">
                              <img src="https://via.placeholder.com/100x100" alt="profile"/>
                              <div class="ml-3">
                                <p class="mb-2">Jessie Ortiz</p>
                                <p class="mb-0 text-muted text-small">Web Developer</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            SAAS App
                          </td>
                          <td>
                            <label class="badge badge-danger">High</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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

export default DoctorDetails;
