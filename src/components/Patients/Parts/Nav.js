import React, { useState, useEffect } from 'react';
import logo from "../../../images/logo.png";
import { Link } from 'react-router-dom';
const Nav = (props) => {

  const [patient, setPatient] = useState(false);

  useEffect(() => {

    if (localStorage.getItem("v1_user_data")) {
      setPatient(JSON.parse(localStorage.getItem("v1_user_data")))
    }

  }, []);


  function logout_function() {
    localStorage.removeItem('v1_user_data')
    window.location.href = ('/')
  }




  return <>
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">

      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link class="navbar-brand brand-logo mr-5" to="/">
          <img
            src={logo}
            class="mr-2"
            alt="logo"
            style={{ width: "200px", height: "1%" }}
          />
        </Link>
        <a class="navbar-brand brand-logo-mini" href="../../index.html">
          <img src="../../images/logo-mini.svg" alt="logo" />
        </a>
      </div>

      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">

        <button
          class="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >

          <span class="icon-menu"></span>

        </button>

        {/*Serach Tag */}


        <div class="span12">
					<form id="custom-search-form" class="form-search form-horizontal pull-right">
						<div class="input-append span12">
							<input type="text" class="search-query sr_wd"
								placeholder="Search medicine/ healthcare products"/>
							<button type="submit" class="btn srbtn"><i class="icon-search"></i></button>
						</div>
					</form>
				</div>

        <ul class="navbar-nav navbar-nav-right">


          {patient !== false ? <>
            <li class="nav-item dropdown">
              <a
                class="nav-link count-indicator dropdown-toggle"
                id="notificationDropdown"
                href="#"
                data-toggle="dropdown"
              >
                <i class="icon-bell mx-0"></i>
                <span class="count"></span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="notificationDropdown"
              >
                <p class="mb-0 font-weight-normal float-left dropdown-header">
                  Notifications
                </p>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-success">
                      <i class="ti-info-alt mx-0"></i>
                    </div>
                  </div>
                  <div class="preview-item-content">
                    <h6 class="preview-subject font-weight-normal">
                      Application Error
                    </h6>
                    <p class="font-weight-light small-text mb-0 text-muted">
                      Just now
                    </p>
                  </div>
                </a>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-warning">
                      <i class="ti-settings mx-0"></i>
                    </div>
                  </div>
                  <div class="preview-item-content">
                    <h6 class="preview-subject font-weight-normal">
                      Settings
                    </h6>
                    <p class="font-weight-light small-text mb-0 text-muted">
                      Private message
                    </p>
                  </div>
                </a>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-info">
                      <i class="ti-user mx-0"></i>
                    </div>
                  </div>
                  <div class="preview-item-content">
                    <h6 class="preview-subject font-weight-normal">
                      New user registration
                    </h6>
                    <p class="font-weight-light small-text mb-0 text-muted">
                      2 days ago
                    </p>
                  </div>
                </a>
              </div>
            </li>
            </> : ''}  

            <li class="nav-item nav-profile dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                id="profileDropdown"
              >
                <img
                  src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
                  alt="profile"
                />
              </a>
              <div
                class="dropdown-menu dropdown-menu-right navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                {patient !== false ?<>
               
                <Link class="dropdown-item" to='/account'>
                  <i class="ti-settings text-primary"></i>
                  Account
                </Link>
                <a class="dropdown-item" onClick={logout_function}>
                  <i class="ti-power-off text-primary"></i>
                  Logout
                </a>
                </>
                :
                <>
                <Link class="dropdown-item" to='/login'>
                  <i class="ti-settings text-primary"></i>
                  Login
                </Link>
                </>
                }
              </div>
            </li>



          


          <li class="nav-item nav-settings d-none d-lg-flex">
            <a class="nav-link" href="#">
              <i class="icon-ellipsis"></i>
            </a>
          </li>
        </ul>
        <button
          class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span class="icon-menu"></span>
        </button>
      </div>

    </nav>
  </>;
};

export default Nav;
