import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import Nav from '../Parts/Nav';
import Sidebar from '../Parts/Sidebar';
import Footer from '../Parts/Footer';

import AxiosFunction from '../AxiosFunction';

const Appoiment = (props) => {
    const [loader, setLoader] = useState(false)


    return <>
    <LoadingOverlay active={loader} spinner>
      <ToastContainer />
      <div className="container-scroller">
        
        <Nav user={props.user}/>
        <div className="container-fluid page-body-wrapper">
          <Sidebar user={props.user}/>
  
          <div className="main-panel">
            <div className="content-wrapper">
            <h1>APPOIMENT </h1>
              {props.user.username}
  
            </div>
          </div>
  
          
        </div>
      </div>
    </LoadingOverlay>
    </>;
};

export default Appoiment;
