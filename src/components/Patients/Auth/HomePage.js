//import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import Nav from '../Parts/Nav';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Footer from '../Parts/Footer';

import AxiosFunction from '../AxiosFunction';

const HomePage = (props) => {


    const [banners, setBanners] = useState([]);

    const [specialiest, setSpecialiest] = useState([]);
    const [showSpclItem, setshowSpclItem] = useState(6)

    const [issues, setIssues] = useState([])
    const [showIssueItem, setshowIssueItem] = useState(6)
    const [loader, setLoader] = useState(true)
    // api/get-specialty', views.getSpecialty, name='get-specialty'),
    // path('api/get-health-issues


    function show_all_issue(){
        if (showIssueItem === 6){
            setshowIssueItem(issues.length)
        }
        else{
            setshowIssueItem(6)
        }
        

    }

    function show_all_doctor_type(){
        if (showSpclItem === 6){
            setshowSpclItem(specialiest.length)
        }
        else{
            setshowSpclItem(6)
        }
        

    }




    useEffect(() => {
        let mounted = true;
        if (mounted) {


            axios.get(`${process.env.REACT_APP_ENV}/api/get-banner`).then(resp => {
                //console.log('Axios Data----->>>>',resp.data.data)
                setBanners(resp.data.data)
            })

            axios.get(`${process.env.REACT_APP_ENV}/api/get-specialty`).then(resp => {
                setSpecialiest(resp.data.treatmentdata)
                //setBanners(resp.data.data)
            })

            axios.get(`${process.env.REACT_APP_ENV}/api/get-health-issues`).then(resp => {
                setIssues(resp.data.healthissuedata)
                //setBanners(resp.data.data)
                setLoader(false)
            })

        }
        return () => mounted = false;
    }, [])


    // {console.log('All Specl', specialiest)}   
    //            {console.log('All Issues', issues)} 


    //             {banners.map((i,id)=>(

    //             <p key={id}> 
    //                 Id: {i.id} 
    //                 Name: {i.name} 
    //                 <br/>

    //                 </p>
    //                 ))}

    return (
        <LoadingOverlay active={loader} spinner>
            <ToastContainer />

            <div className='container-scroller'>

                <div className="container-fluid page-body-wrapper">

                    <Nav />

                    

                    <div className="">
                        <div class="container-scroller ">

                            <div class="content-wrapper">
                                <div class="row">
                                    <div class="col-md-12">


                                        <div class="col-md-11" style={{ "margin": "0 auto" }}>

                                            <div id="demo" class="carousel slide" data-ride="carousel">


                                                <ul class="carousel-indicators">
                                                    <li data-target="#demo" data-slide-to="0" class="active"></li>
                                                    <li data-target="#demo" data-slide-to="1"></li>
                                                    <li data-target="#demo" data-slide-to="2"></li>
                                                </ul>


                                                <div class="carousel-inner">


                                                    {banners.map((i, id) => (
                                                        id === 0?
                                                        <div class="carousel-item active" key={id}>
                                                            <img src={process.env.REACT_APP_ENV + i.photo} alt="Los Angeles" width="100%"
                                                                height="270" />
                                                        </div>
                                                        :
                                                        <div class="carousel-item" key={id}>
                                                            <img src="/new/images/b2.jpg" alt="Los Angeles" width="100%"
                                                                height="270" />
                                                        </div>


                                                    ))}


                                                    {/* <div class="carousel-item">
                                                <img src="images/b2.jpg"
                                                alt="Chicago" width="100%" height="270"/>
                                            </div>
                                            <div class="carousel-item">
                                                <img src="images/Group-12422.png"
                                                alt="New York" width="100%" height="270"/>
                                            </div> */}

                                                </div>


                                                <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                                    <span class="carousel-control-prev-icon"></span>
                                                </a>
                                                <a class="carousel-control-next" href="#demo" data-slide="next">
                                                    <span class="carousel-control-next-icon"></span>
                                                </a>
                                            </div>

                                        </div>

                                        <div class="row">

                                            <div class="col-md-3">
                                                <div class="img_sz">
                                                    <img src="/new/images/Frame 4.png" alt="" />
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="img_sz">
                                                    <img src="/new/images/Frame 5.png" alt="" />
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="img_sz">
                                                    <img src="/new/images/Frame 6.png" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="img_sz">
                                                    <img src="/new/images/Frame 7.png" alt="" />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>


                                <div class="hovr_pic">

                                    <div class="well_mn">
                                        <div class="row">
                                            <div class="col-md-6 nt_tx">
                                                <p>Not Feeling Well</p>
                                            </div>
                                            <div class="col-md-6 nt_tx2">
                                                <Link to="#" onClick={show_all_issue}>
                                                    View All 
                                                    <i class="fa fa-fw arr"
                                                 aria-hidden="true" title=""></i>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">



                                        {issues.map((i, id) => (

                                            id < showIssueItem ?

                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 " key={id}>
                                                    <div class="lily-box">
                                                        <img src={process.env.REACT_APP_ENV + i.primary_image} />
                                                        <div class="lily-caption">
                                                            <div class="lily-title">
                                                                {i.name}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                ""

                                        ))}






                                    </div>
                                </div>






                                <div class="hovr_pic">

                                    <div class="well_mn">
                                        <div class="row">
                                            <div class="col-md-6 nt_tx">
                                                <p>Dostors</p>
                                            </div>
                                            <div class="col-md-6 nt_tx2">
                                                <Link to="/my-doctors/">View All <i class="fa fa-fw arr" aria-hidden="true" title=""></i></Link>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">


                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 ">
                                            <div class="lily-box">
                                                <img src="images/doctor.jpg" />
                                                <div class="lily-caption">
                                                    <div class="lily-title">
                                                        Dr.Gaurav
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                            <div class="lily-box">
                                                <img src="images/d2.jpg" />
                                                <div class="lily-caption">
                                                    <div class="lily-title">
                                                        Dr. Vikas
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                            <div class="lily-box">
                                                <img src="images/d3.jpg" />
                                                <div class="lily-caption">
                                                    <div class="lily-title">
                                                        Dr.Mohit
                                                    </div>

                                                </div>
                                            </div>
                                        </div>



                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                            <div class="lily-box">
                                                <img src="images/d4.jpg" />
                                                <div class="lily-caption">
                                                    <div class="lily-title">
                                                        Dr.Suman
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                            <div class="lily-box">
                                                <img src="images/d5.jpg" />
                                                <div class="lily-caption">
                                                    <div class="lily-title">
                                                        Dr. Saurabh
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                            <div class="lily-box">
                                                <img src="images/d6.jpg" />
                                                <div class="lily-caption">
                                                    <div class="lily-title">
                                                        Dr.Vijay
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>







                                <div class="hovr_pic">

                                    <div class="well_mn">
                                        <div class="row">
                                            <div class="col-md-6 nt_tx">
                                                <p>Book Appointment with Specialist</p>
                                            </div>
                                            <div class="col-md-6 nt_tx2">
                                                <Link to="#" onClick={show_all_doctor_type}>View All
                                                 <i class="fa fa-fw arr"
                                                  aria-hidden="true" title=""></i></Link>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">

                                        {console.log(specialiest)}
                                        {specialiest.map((i, id) => (

                                            id < showSpclItem ?

                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 " key={id}>
                                                    <div class="lily-box">
                                                        <img src=
                                                            {i.primary_image ?
                                                                process.env.REACT_APP_ENV + i.primary_image
                                                                :
                                                                "/new/images/f16.png"}
                                                        />
                                                        <div class="lily-caption">
                                                            
                                                        <Link to={'/my-doctors/?doctor_type='+i.name}>
                                                            <div class="lily-title">
                                                                
                                                                {i.name}
                                                                
                                                            </div>
                                                        </Link>    

                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                ""

                                            ))}

                                    </div>
                                </div>




                            </div>

                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default HomePage
