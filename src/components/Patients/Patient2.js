import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Tabs } from "antd";
import logo from "../../images/logo.png";

const { TabPane } = Tabs;
const Patient2 = () => {
  const [patientsList, setpatientsList] = useState([]);
  const [details, setdetails] = useState({});
  console.log(patientsList, "doctorsList");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ENV}/api/patients-list`)
      .then((data) => {
        setpatientsList(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

   const logout = () => {
     localStorage.clear();
     window.location.pathname = "/signin";
   };
  return (
    <div class="container-scroller">
      <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a class="navbar-brand brand-logo mr-5" href="../../index.html">
            <img
              src={logo}
              class="mr-2"
              alt="logo"
              style={{ width: "200px", height: "1%" }}
            />
          </a>
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
          <ul class="navbar-nav mr-lg-2">
            <li class="nav-item nav-search d-none d-lg-block">
              <div class="input-group">
                <div
                  class="input-group-prepend hover-cursor"
                  id="navbar-search-icon"
                >
                  <span class="input-group-text" id="search">
                    <i class="icon-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="navbar-search-input"
                  placeholder="Search now"
                  aria-label="search"
                  aria-describedby="search"
                />
              </div>
            </li>
          </ul>
          <ul class="navbar-nav navbar-nav-right">
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
                    <h6 class="preview-subject font-weight-normal">Settings</h6>
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
                {/* <a class="dropdown-item">
                  <i class="ti-settings text-primary"></i>
                  Settings
                </a> */}
                <a class="dropdown-item" onClick={logout}>
                  <i class="ti-power-off text-primary"></i>
                  Logout
                </a>
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
      <div class="container-fluid page-body-wrapper">
        <div class="theme-setting-wrapper">
          <div id="settings-trigger">
            <i class="ti-settings"></i>
          </div>
          <div id="theme-settings" class="settings-panel">
            <i class="settings-close ti-close"></i>
            <p class="settings-heading">SIDEBAR SKINS</p>
            <div class="sidebar-bg-options selected" id="sidebar-light-theme">
              <div class="img-ss rounded-circle bg-light border mr-3"></div>
              Light
            </div>
            <div class="sidebar-bg-options" id="sidebar-dark-theme">
              <div class="img-ss rounded-circle bg-dark border mr-3"></div>Dark
            </div>
            <p class="settings-heading mt-2">HEADER SKINS</p>
            <div class="color-tiles mx-0 px-4">
              <div class="tiles success"></div>
              <div class="tiles warning"></div>
              <div class="tiles danger"></div>
              <div class="tiles info"></div>
              <div class="tiles dark"></div>
              <div class="tiles default"></div>
            </div>
          </div>
        </div>
        <div id="right-sidebar" class="settings-panel">
          <i class="settings-close ti-close"></i>
          <ul class="nav nav-tabs border-top" id="setting-panel" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="todo-tab"
                data-toggle="tab"
                href="#todo-section"
                role="tab"
                aria-controls="todo-section"
                aria-expanded="true"
              >
                TO DO LIST
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="chats-tab"
                data-toggle="tab"
                href="#chats-section"
                role="tab"
                aria-controls="chats-section"
              >
                CHATS
              </a>
            </li>
          </ul>
          <div class="tab-content" id="setting-content">
            <div
              class="tab-pane fade show active scroll-wrapper"
              id="todo-section"
              role="tabpanel"
              aria-labelledby="todo-section"
            >
              <div class="add-items d-flex px-3 mb-0">
                <form class="form w-100">
                  <div class="form-group d-flex">
                    <input
                      type="text"
                      class="form-control todo-list-input"
                      placeholder="Add To-do"
                    />
                    <button
                      type="submit"
                      class="add btn btn-primary todo-list-add-btn"
                      id="add-task"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div class="list-wrapper px-3">
                <ul class="d-flex flex-column-reverse todo-list">
                  <li>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="checkbox" type="checkbox" />
                        Team review meeting at 3.00 PM
                      </label>
                    </div>
                    <i class="remove ti-close"></i>
                  </li>
                  <li>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="checkbox" type="checkbox" />
                        Prepare for presentation
                      </label>
                    </div>
                    <i class="remove ti-close"></i>
                  </li>
                  <li>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="checkbox" type="checkbox" />
                        Resolve all the low priority tickets due today
                      </label>
                    </div>
                    <i class="remove ti-close"></i>
                  </li>
                  <li class="completed">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="checkbox" type="checkbox" checked />
                        Schedule meeting for next week
                      </label>
                    </div>
                    <i class="remove ti-close"></i>
                  </li>
                  <li class="completed">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="checkbox" type="checkbox" checked />
                        Project review
                      </label>
                    </div>
                    <i class="remove ti-close"></i>
                  </li>
                </ul>
              </div>
              <h4 class="px-3 text-muted mt-5 font-weight-light mb-0">
                Events
              </h4>
              <div class="events pt-4 px-3">
                <div class="wrapper d-flex mb-2">
                  <i class="ti-control-record text-primary mr-2"></i>
                  <span>Feb 11 2018</span>
                </div>
                <p class="mb-0 font-weight-thin text-gray">
                  Creating component page build a js
                </p>
                <p class="text-gray mb-0">The total number of sessions</p>
              </div>
              <div class="events pt-4 px-3">
                <div class="wrapper d-flex mb-2">
                  <i class="ti-control-record text-primary mr-2"></i>
                  <span>Feb 7 2018</span>
                </div>
                <p class="mb-0 font-weight-thin text-gray">
                  Meeting with Alisa
                </p>
                <p class="text-gray mb-0 ">Call Sarah Graves</p>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="chats-section"
              role="tabpanel"
              aria-labelledby="chats-section"
            >
              <div class="d-flex align-items-center justify-content-between border-bottom">
                <p class="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
                  Friends
                </p>
                <small class="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">
                  See All
                </small>
              </div>
              <ul class="chat-list">
                <li class="list active">
                  <div class="profile">
                    <img src="../../images/faces/face1.jpg" alt="image" />
                    <span class="online"></span>
                  </div>
                  <div class="info">
                    <p>Thomas Douglas</p>
                    <p>Available</p>
                  </div>
                  <small class="text-muted my-auto">19 min</small>
                </li>
                <li class="list">
                  <div class="profile">
                    <img src="../../images/faces/face2.jpg" alt="image" />
                    <span class="offline"></span>
                  </div>
                  <div class="info">
                    <div class="wrapper d-flex">
                      <p>Catherine</p>
                    </div>
                    <p>Away</p>
                  </div>
                  <div class="badge badge-success badge-pill my-auto mx-2">
                    4
                  </div>
                  <small class="text-muted my-auto">23 min</small>
                </li>
                <li class="list">
                  <div class="profile">
                    <img src="../../images/faces/face3.jpg" alt="image" />
                    <span class="online"></span>
                  </div>
                  <div class="info">
                    <p>Daniel Russell</p>
                    <p>Available</p>
                  </div>
                  <small class="text-muted my-auto">14 min</small>
                </li>
                <li class="list">
                  <div class="profile">
                    <img src="../../images/faces/face4.jpg" alt="image" />
                    <span class="offline"></span>
                  </div>
                  <div class="info">
                    <p>James Richardson</p>
                    <p>Away</p>
                  </div>
                  <small class="text-muted my-auto">2 min</small>
                </li>
                <li class="list">
                  <div class="profile">
                    <img src="../../images/faces/face5.jpg" alt="image" />
                    <span class="online"></span>
                  </div>
                  <div class="info">
                    <p>Madeline Kennedy</p>
                    <p>Available</p>
                  </div>
                  <small class="text-muted my-auto">5 min</small>
                </li>
                <li class="list">
                  <div class="profile">
                    <img src="../../images/faces/face6.jpg" alt="image" />
                    <span class="online"></span>
                  </div>
                  <div class="info">
                    <p>Sarah Graves</p>
                    <p>Available</p>
                  </div>
                  <small class="text-muted my-auto">47 min</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Sidebar />

        <div class="patients_mn">
          <section id="tabs">
            <nav class="pat_nm mx-3">
              <h5 className="mt-3 text-center">Patients</h5>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Today" key="1">
                  {/* <div
                    class="tab-content py-3 px-3 px-sm-0 bdn_nn"
                    id="nav-tabContent"
                  > */}
                  <div
                    class="tab-pane fade active show"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div class="due_mn">
                      <h6 style={{ fontSize: "13px" }}>DUE</h6>
                    </div>

                    <div class="due_mn2 active2">
                      <a href="#">
                        <h5 style={{ fontSize: "13px", color: "white" }}>
                          04:15 <span>rom</span>
                        </h5>

                        <h5 style={{ fontSize: "13px", color: "white" }}>
                          PM<span> Visit reason not specified</span>
                        </h5>
                      </a>
                    </div>

                    <div class="due_mn">
                      <h6 style={{ fontSize: "13px" }}>MET</h6>
                    </div>

                    <div class="due_mn2">
                      <a href="#">
                        <h5 style={{ fontSize: "13px", color: "white" }}>
                          10:15 <span>rom</span>
                        </h5>

                        <h5 style={{ fontSize: "13px", color: "white" }}>
                          PM<span> Visit reason not specified</span>
                        </h5>
                      </a>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <div class="lis_nm">
                      <ul>
                        <li>
                          {" "}
                          <a class="active2" href="#">
                            Ayush
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a href="#">Gaurav</a>
                        </li>
                        <li>
                          {" "}
                          <a href="#">Suman</a>
                        </li>
                        <li>
                          {" "}
                          <a href="#">Vikash</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    <div class="lis_nm">
                      <ul>
                        <li>
                          {" "}
                          <a href="#">Ayush</a>
                        </li>
                        <li>
                          {" "}
                          <a href="#">Gaurav</a>
                        </li>
                        <li>
                          {" "}
                          <a href="#">Suman</a>
                        </li>
                        <li>
                          {" "}
                          <a class="active2" href="#">
                            Vikash
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a href="#">Vijay</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* </div> */}
                  {/* {patientsList.map((v, i) => {
                    if (i < 4) {
                      return (
                        <p className="box" onClick={() => setdetails(v)}>
                          {v.name}
                        </p>
                      );
                    }
                  })} */}
                </TabPane>
                <TabPane tab="Recent" key="2">
                  {patientsList.map((v, i) => {
                    if (i < 10) {
                      return (
                        <p className="box" onClick={() => setdetails(v)}>
                          {v.name}
                        </p>
                      );
                    }
                  })}
                </TabPane>
                <TabPane tab="  All" key="3">
                  {patientsList.map((v) => {
                    return (
                      <p className="box" onClick={() => setdetails(v)}>
                        {v.name}
                      </p>
                    );
                  })}
                </TabPane>
              </Tabs>
            </nav>
          </section>
        </div>
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="col-sm-12">
              <div class="wizard-container">
                <div
                  class="card wizard-card h-100"
                  data-color="orange"
                  id="wizardProfile"
                >
                  {details?.name ? (
                    <form action="" method="" novalidate="novalidate">
                      <div class="container bootstrap snippets bootdey">
                        <div class="panel-body inf-content">
                          <div class="row p-2 box2 m-2">
                            <div class="col-md-2 p-2">
                              <img
                                alt=""
                                style={{ width: "80%", borderRadius: "50%" }}
                                title=""
                                class="img-circle img-thumbnail isTooltip"
                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                data-original-title="Usuario"
                              />
                            </div>
                            <div class="col-md-10 pt-3">
                              <div class="table-responsive">
                                <table class="table table-user-information">
                                  <tbody>
                                    <tr>
                                      <td class="tdd_pdg td1">
                                        <strong>Name</strong>
                                      </td>
                                      <td class="text-primary pri_pd td1">
                                        {details?.name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="tdd_pdg td1">
                                        <strong>Mobile no</strong>
                                      </td>
                                      <td class="text-primary pri_pd td1">
                                        {details?.mobile}
                                      </td>
                                    </tr>

                                    <tr>
                                      <td class="tdd_pdg td1">
                                        <strong>Email</strong>
                                      </td>
                                      <td class="text-primary pri_pd td1">
                                        {details?.email}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="dec_dte m-4 d-flex">
                        <div
                          class="dec1 p-2 text-center"
                          style={{ border: "1px solid lightgray" }}
                        >
                          <h5>22</h5>
                          <h6>DEC'21</h6>
                        </div>

                        <div
                          class="dec_dte2 p-2 w-100 d-flex justify-content-md-around"
                          style={{ border: "1px solid lightgray" }}
                        >
                          <div>
                            <p>Appointment with Suman P</p>

                            <span>04:15 pm for 15 minutes</span>
                          </div>

                          <div class="dropdown dup_rt">
                            <button
                              class="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Add Records
                            </button>
                            <div
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <a class="dropdown-item" href="#">
                                Vital Signs
                              </a>
                              <a class="dropdown-item" href="#">
                                Clinical Notes
                              </a>
                              <a class="dropdown-item" href="#">
                                Prescriptions
                              </a>
                              <a class="dropdown-item" href="#">
                                Fils
                              </a>
                              <a class="dropdown-item" href="#">
                                Lab Orders
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <form action="" method="" novalidate="novalidate">
                      <div class="container bootstrap snippets bootdey">
                        <div class="panel-body inf-content">
                          <div class="row p-2 box2 m-2">
                            <div class="col-md-2 p-2">
                              <img
                                alt=""
                                style={{ width: "80%", borderRadius: "50%" }}
                                title=""
                                class="img-circle img-thumbnail isTooltip"
                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                data-original-title="Usuario"
                              />
                            </div>
                            <div class="col-md-10 pt-3">
                              <div class="table-responsive">
                                <table class="table table-user-information">
                                  <tbody>
                                    <tr>
                                      <td class="tdd_pdg td1">
                                        <strong>Name</strong>
                                      </td>
                                      <td class="text-primary pri_pd td1">
                                        {patientsList[0]?.name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="tdd_pdg td1">
                                        <strong>Mobile no</strong>
                                      </td>
                                      <td class="text-primary pri_pd td1">
                                        {patientsList[0]?.mobile}
                                      </td>
                                    </tr>

                                    <tr>
                                      <td class="tdd_pdg td1">
                                        <strong>Email</strong>
                                      </td>
                                      <td class="text-primary pri_pd td1">
                                        {patientsList[0]?.email}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="dec_dte m-4 d-flex">
                        <div
                          class="dec1 p-2 text-center"
                          style={{ border: "1px solid lightgray" }}
                        >
                          <h5>22</h5>
                          <h6>DEC'21</h6>
                        </div>

                        <div
                          class="dec_dte2 p-2 w-100 d-flex justify-content-md-around"
                          style={{ border: "1px solid lightgray" }}
                        >
                          <div>
                            <p>Appointment with Suman P</p>

                            <span>04:15 pm for 15 minutes</span>
                          </div>

                          <div class="dropdown dup_rt">
                            <button
                              class="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Add Records
                            </button>
                            <div
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <a class="dropdown-item" href="#">
                                Vital Signs
                              </a>
                              <a class="dropdown-item" href="#">
                                Clinical Notes
                              </a>
                              <a class="dropdown-item" href="#">
                                Prescriptions
                              </a>
                              <a class="dropdown-item" href="#">
                                Fils
                              </a>
                              <a class="dropdown-item" href="#">
                                Lab Orders
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          <footer class="footer">
            <div class="d-sm-flex justify-content-center justify-content-sm-between">
              <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2021. GiantCell Asia{" "}
                <a href="#" target="_blank"></a> reserved.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Patient2;
