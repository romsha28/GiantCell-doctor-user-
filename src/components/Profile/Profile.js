import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Steps, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import logo from "../../images/logo.png";



const PatientList = () => {
  const [step1Data, setstep1Data] = useState({ membershipRadios : "male"});
  const [step1Error, setstep1Error] = useState({});
  const [step2Data, setstep2Data] = useState({});
  const [step2Error, setstep2Error] = useState({});
  const [step3Data, setstep3Data] = useState({});
  const [step3Error, setstep3Error] = useState({});
  const [step4Data, setstep4Data] = useState({});
  const [step4Error, setstep4Error] = useState({});
  const [step5Data, setstep5Data] = useState({});
  const [step5Error, setstep5Error] = useState({});
  const [current, setCurrent] = React.useState(0);
  const [userData, setuserData] = useState({});
  const [spe, setspe] = useState([]);
  const [loader, setloader] = useState(false)

  console.log("current", current);
  const navigate = useNavigate();
  const getProfile = () => {
    let data = JSON.parse(localStorage.getItem("user_data"));
    axios
      .post(
        `http://brtechgeeks.pythonanywhere.com/api/profile-details/${data.user_id}`
        // `http://brtechgeeks.pythonanywhere.com/api/profile-details/20`
      )
      .then((res) => {
        console.log("res", res);
        setuserData(res?.data?.data?.profile_detail);
        let step1 = {
          name: res?.data?.data?.profile_detail?.name,
          mobile: res?.data?.data?.profile_detail?.mobile,
          membershipRadios: res?.data?.data?.profile_detail?.sex,
          dob: res?.data?.data?.profile_detail?.dob,
          city: res?.data?.data?.profile_detail?.address,
        };
        setstep1Data(step1);
        let step2 = {
          registrationCouncil: res?.data?.data?.council_detail?.description,
          registrationNumber: res?.data?.data?.council_detail?.registration_no,
          registrationYear: res?.data?.data?.council_detail?.registration_year,
        };
        setstep2Data(step2);
      });
  };
  useEffect(() => {
    axios
      .get("http://brtechgeeks.pythonanywhere.com/api/get-specialty")
      .then((res) => {
        console.log("Reeee", res);
        setspe(res?.data);
      });
    getProfile();
  }, []);

  const { Step } = Steps;
  const next1 = () => {
    // setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleStep1 = (e) => {
    const { value, name } = e.target;
    setstep1Data({
      ...step1Data,
      [name]: value,
    });
  };

  const step1Validation = () => {
    let errors = {};
    let formIsValid = true;

    if (!step1Data.name) {
      formIsValid = false;
      errors["name"] = "Name is requried";
    }

    if (!step1Data.city) {
      formIsValid = false;
      errors["city"] = "City is Requried";
    }
    if (!step1Data.specialization) {
      formIsValid = false;
      errors["specialization"] = "Specialization is Requried";
    }
    if (!step1Data.membershipRadios) {
      formIsValid = false;
      errors["gender"] = "Gender is Requried";
    }
    setstep1Error(errors);

    return formIsValid;
  };

  const handleStep2 = (e) => {
    const { value, name } = e.target;
    setstep2Data({
      ...step2Data,
      [name]: value,
    });
  };

  const step2Validation = () => {
    let errors = {};
    let formIsValid = true;

    if (!step2Data.registrationNumber) {
      formIsValid = false;
      errors["registrationNumber"] = "Registration Number is requried";
    }

    if (!step2Data.registrationCouncil) {
      formIsValid = false;
      errors["registrationCouncil"] = "Registration Council is Requried";
    }
    if (!step2Data.registrationYear) {
      formIsValid = false;
      errors["registrationYear"] = "Registration Year is Requried";
    }

    setstep2Error(errors);

    return formIsValid;
  };

  const handleStep3 = (e) => {
    const { value, name } = e.target;
    setstep3Data({
      ...step3Data,
      [name]: value,
    });
  };

  const step3Validation = () => {
    let errors = {};
    let formIsValid = true;

    if (!step3Data.degree) {
      formIsValid = false;
      errors["degree"] = "Degree is requried";
    }

    if (!step3Data.institute) {
      formIsValid = false;
      errors["institute"] = "Institute is Requried";
    }
    if (!step3Data.yearofcompletion) {
      formIsValid = false;
      errors["yearofcompletion"] = "Year of completion is Requried";
    }
    if (!step3Data.yearofexperience) {
      formIsValid = false;
      errors["yearofexperience"] = "Year of experience is Requried";
    }

    setstep3Error(errors);

    return formIsValid;
  };

  const handleStep4 = (e) => {
    const { value, name } = e.target;
    setstep4Data({
      ...step4Data,
      [name]: value,
    });
  };

  const step4Validation = () => {
    let errors = {};
    let formIsValid = true;

    if (!step4Data.practice) {
      formIsValid = false;
      errors["practice"] = "Select any one";
    }

    setstep4Error(errors);

    return formIsValid;
  };

  const handleStep5 = (e) => {
    const { value, name } = e.target;
    setstep5Data({
      ...step5Data,
      [name]: value,
    });
  };

  const step5Validation = () => {
    let errors = {};
    let formIsValid = true;

    if (!step5Data.name) {
      formIsValid = false;
      errors["name"] = "Name is requried";
    }

    if (!step5Data.city) {
      formIsValid = false;
      errors["city"] = "City is Requried";
    }
    if (!step5Data.locality) {
      formIsValid = false;
      errors["locality"] = "Locality is Requried";
    }

    setstep5Error(errors);

    return formIsValid;
  };

  console.log("step4Error", step5Error);

  const verify = async () => {
    let data = JSON.parse(localStorage.getItem("user_data"));
    await axios
      .post(`http://brtechgeeks.pythonanywhere.com/api/profile-flag-update`, {
        user_id: data?.user_id,
        section_flag: 1,
      })
      .then((res) => {
        // setCurrent(current + 1);
        // getProfile();

        console.log("res", res);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  console.log("step1Data", step1Data);
  const next = () => {
    console.log("99");
    if (current == 0 && step1Validation()) {
      setloader(true)
      let data = JSON.parse(localStorage.getItem("user_data"));

      console.log("pp");
      axios
        .post(`${process.env.REACT_APP_ENV}/api/profile-update`, {
          user_id: data?.user_id,
          name: step1Data?.name,
          mobile: "123",
          sex: step1Data?.membershipRadios,
          // dob: null,
          address: step1Data?.city,
          specialties: step1Data?.specialization,
          // language:
        })
        .then((res) => {
          setCurrent(current + 1);
          getProfile();
          setloader(false);

          console.log("res", res);
        })
        .catch((e) => {
          setloader(false);
          console.log("e", e);
        });
    }
    if (current == 1 && step2Validation()) {
      setloader(true)
      let data = JSON.parse(localStorage.getItem("user_data"));
      axios
        .post(`${process.env.REACT_APP_ENV}/api/profile-council-update`, {
          user_id: data?.user_id,
          name: step2Data?.registrationCouncil,
          registration_no: step2Data?.registrationNumber,
          registration_year: step2Data?.registrationYear,
        })
        .then((res) => {
          console.log("step 2 next click");
          setCurrent(current + 1);
          getProfile();
setloader(false)
          console.log("res", res);
        })
        .catch((e) => {
          setloader(false)
          console.log("e", e);
        });
    }
    if (current == 2 && step3Validation()) {
      setloader(true)
      let data = JSON.parse(localStorage.getItem("user_data"));
      axios
        .post(`${process.env.REACT_APP_ENV}/api/profile-education-update`, {
          user_id: data?.user_id,
          name: step3Data?.degree,
          univercity: step3Data?.institute,
          college: step3Data?.institute,
          passing_year: step3Data?.yearofcompletion,
          description: "",
        })
        .then((res) => {
          console.log("step 3 next click");
          setCurrent(current + 1);
          getProfile();
setloader(false)
          console.log("res", res);
        })
        .catch((e) => {
          setloader(false)
          console.log("e", e);
        });
    }
    if (current === 3 && step4Validation()) {
      setloader(true)
      console.log("step 4 next click");
      setCurrent(current + 1);
      getProfile();
      setloader(false)
    }
    if (current == 4 && step5Validation()) {
      setloader(true)
      let data = JSON.parse(localStorage.getItem("user_data"));
      axios
        .post(`${process.env.REACT_APP_ENV}/api/profile-clinic-update`, {
          user_id: data?.user_id,
          name: step5Data?.establishmentName,
          city: step5Data?.city,
          address: step5Data?.locality,
        })
        .then(async (res) => {
          await verify();
          console.log("step 5 next click");
          message.success("Processing complete!");
          localStorage.setItem("step1", true);
          getProfile();
          toast.success("KYC Step1 Completed Sucessfull!!");
          navigate("/");
          setloader(false)
          console.log("res", res);
        })
        .catch((e) => {
          setloader(false)
          console.log("e", e);
        });
    }
  };
  console.log("step4Data", step5Data);

  const steps = [
    {
      title: "",
      icon: (
        <div class="icon-circle">
          <i class="ti-user"></i>
        </div>
      ),
      content: (
        <div class="tab-pane active" id="about">
          <h3 class="info-text">Profile</h3>
          <div class="profile_mn2">
            <h4>
              Hello Dr. {userData?.name}! Lets build your dedicated profile.
            </h4>
            <span>Section A:Profile details</span>
            <div class="row">
              <div class="col-md-6">
                {/* <div class="profile_frm"> */}

                {/* <div class="input_mn"> */}
                <span class="input_nm">Name</span>
                <div class="input-group mb-2 mr-sm-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text fomm2">Dr./Mr./Ms.</div>
                  </div>
                  <input
                    type="text"
                    class="form-control fomm1"
                    id="inlineFormInputGroupUsername2"
                    placeholder="Ayush"
                    value={step1Data.name}
                    name="name"
                    onChange={handleStep1}
                  />
                </div>
                <p
                  className="errorClass"
                  style={{
                    textAlign: "start",
                    fontSize: "13px",
                    color: "red",
                  }}
                >
                  {step1Error.name}
                </p>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleFormControlSelect2">Specialization</label>
                  <select
                    class="form-control fomm1"
                    id="exampleFormControlSelect2"
                    value={step1Data.specialization}
                    name="specialization"
                    onChange={handleStep1}
                  >
                    <option>Select Specialization</option>
                    
                      return <option value='11'>11</option>;
                    
                  </select>
                  <p
                    className="errorClass"
                    style={{
                      textAlign: "start",
                      fontSize: "13px",
                      color: "red",
                    }}
                  >
                    {step1Error.specialization}
                  </p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group m-0 p-0">
                  <label class="input_nm m-0 p-0">Gender</label>
                  <div className="d-flex">
                    <div class="form-check inlin">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          name="membershipRadios"
                          id="membershipRadios1"
                          value="male"
                          onChange={handleStep1}
                          checked={
                            step1Data.membershipRadios === "male" && true
                          }
                        />
                        Male
                        <i class="input-helper"></i>
                      </label>
                    </div>
                    <div class="form-check inlin">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          name="membershipRadios"
                          id="membershipRadios1"
                          value="female"
                          onChange={handleStep1}
                          checked={
                            step1Data.membershipRadios === "female" && true
                          }
                        />
                        Female
                        <i class="input-helper"></i>
                      </label>
                    </div>

                    <div class="form-check inlin">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          name="membershipRadios"
                          id="membershipRadios1"
                          value="other"
                          onChange={handleStep1}
                          checked={
                            step1Data.membershipRadios === "other" && true
                          }
                        />
                        Other
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </div>
                  <p
                    className="errorClass"
                    style={{
                      textAlign: "start",
                      fontSize: "13px",
                      color: "red",
                    }}
                  >
                    {step1Error.gender}
                  </p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleFormControlSelect2">City</label>
                  <select
                    class="form-control fomm1 valid"
                    id="exampleFormControlSelect2"
                    aria-invalid="false"
                    value={step1Data.city}
                    name="city"
                    onChange={handleStep1}
                  >
                    <option>Select City</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Noida">Noida</option>
                    <option value="4">Surat</option>
                    <option value="5">Mumbai</option>
                  </select>
                  <p
                    className="errorClass"
                    style={{
                      textAlign: "start",
                      fontSize: "13px",
                      color: "red",
                    }}
                  >
                    {step1Error.city}
                  </p>
                </div>
                {/* </div> */}
                {/* </div> */}
              </div>
              <div class="col-md-6"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "",
      icon: (
        <div class="icon-circle">
          <i class="ti-id-badge"></i>
        </div>
      ),
      content: (
        <div class="tab-pane active" id="information">
          <h5 class="info-text">Medical Registration</h5>
          <div class="profile_mn2">
            <div class="row">
              <div class="col-md-6">
                <div class="profile_frm">
                  <div class="input_mn">
                    <span class="input_nm">Registration Number</span>
                    <div class="form-group ">
                      <input
                        type="text"
                        class="form-control fomm1"
                        placeholder="CC12345678"
                        value={step2Data.registrationNumber}
                        name="registrationNumber"
                        onChange={handleStep2}
                      />
                    </div>
                    <p
                      className="errorClass"
                      style={{
                        textAlign: "start",
                        fontSize: "13px",
                        color: "red",
                      }}
                    >
                      {step2Error.registrationNumber}
                    </p>
                    <div class="form-group">
                      <label for="exampleFormControlSelect2">
                        Registration Council
                      </label>
                      <select
                        class="form-control fomm1"
                        id="exampleFormControlSelect2"
                        value={step2Data.registrationCouncil}
                        name="registrationCouncil"
                        onChange={handleStep2}
                      >
                        <option>Select council</option>
                        <option>Delhi Medical Council</option>
                        <option>Noida Medical Council</option>
                        <option>Surat Medical Council</option>
                        <option>Goa Medical Council</option>
                        <option>Panjab Medical Council</option>
                      </select>
                      <p
                        className="errorClass"
                        style={{
                          textAlign: "start",
                          fontSize: "13px",
                          color: "red",
                        }}
                      >
                        {step2Error.registrationCouncil}
                      </p>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlSelect2">
                        Registration Year
                      </label>
                      <select
                        class="form-control fomm1 valid"
                        id="exampleFormControlSelect2"
                        aria-invalid="false"
                        value={step2Data.registrationYear}
                        name="registrationYear"
                        onChange={handleStep2}
                      >
                        <option>Select Year</option>
                        <option>2021</option>
                        <option>2018</option>
                        <option>2017</option>
                        <option>2016</option>
                        <option>2015</option>
                      </select>
                      <p
                        className="errorClass"
                        style={{
                          textAlign: "start",
                          fontSize: "13px",
                          color: "red",
                        }}
                      >
                        {step2Error.registrationYear}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "",
      icon: (
        <div class="icon-circle">
          <i class="ti-book"></i>
        </div>
      ),
      content: (
        <div class="tab-pane active" id="address">
          <h5 class="info-text">Education Qualification</h5>
          <div class="profile_mn2">
            <div class="row">
              <div class="col-md-6">
                {/* <div class="profile_frm"> */}
                {/* <div class="input_mn"> */}
                <div class="form-group">
                  <label for="exampleFormControlSelect2">Degree</label>
                  <select
                    class="form-control fomm1"
                    id="exampleFormControlSelect2"
                    value={step3Data.degree}
                    name="degree"
                    onChange={handleStep3}
                  >
                    <option>Select Degree</option>
                    <option>MBS(H)</option>
                    <option>MBBS</option>
                    <option>MD</option>
                  </select>
                  <p
                    className="errorClass"
                    style={{
                      textAlign: "start",
                      fontSize: "13px",
                      color: "red",
                    }}
                  >
                    {step3Error.degree}
                  </p>
                </div>
              </div>{" "}
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleFormControlSelect2">
                    College/Institute
                  </label>
                  <select
                    class="form-control fomm1 valid"
                    id="exampleFormControlSelect2"
                    aria-invalid="false"
                    value={step3Data.institute}
                    name="institute"
                    onChange={handleStep3}
                  >
                    <option>Select Institute</option>
                    <option>ISBM DELHI</option>
                    <option>IIT Bombay</option>
                    <option>SVNIT</option>
                    <option>Uka Tarsadiya Univercity</option>
                    <option>VNSGU</option>
                  </select>
                  <p
                    className="errorClass"
                    style={{
                      textAlign: "start",
                      fontSize: "13px",
                      color: "red",
                    }}
                  >
                    {step3Error.institute}
                  </p>
                </div>
              </div>{" "}
              <div class="col-md-6">
                <br />
                <br />
                <div class="form-group">
                  <label for="exampleFormControlSelect2">
                    Year of completion
                  </label>
                  <select
                    class="form-control fomm1 valid"
                    id="exampleFormControlSelect2"
                    aria-invalid="false"
                    value={step3Data.yearofcompletion}
                    name="yearofcompletion"
                    onChange={handleStep3}
                  >
                    <option>Select Year</option>
                    <option>2020</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                    <option>2015</option>
                  </select>
                  <p
                    className="errorClass"
                    style={{
                      textAlign: "start",
                      fontSize: "13px",
                      color: "red",
                    }}
                  >
                    {step3Error.yearofcompletion}
                  </p>
                </div>
              </div>{" "}
              <div class="col-md-6">
                <br />
                <br />

                <span class="input_nm">Year of experience</span>
                <div class="form-group ">
                  <input
                    type="text"
                    class="form-control fomm1"
                    placeholder="2"
                    value={step3Data.yearofexperience}
                    name="yearofexperience"
                    onChange={handleStep3}
                  />
                </div>
                <p
                  className="errorClass"
                  style={{
                    textAlign: "start",
                    fontSize: "13px",
                    color: "red",
                  }}
                >
                  {step3Error.yearofexperience}
                </p>
                {/* </div> */}
                {/* </div> */}
              </div>
              <div class="col-md-6"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "",
      icon: (
        <div class="icon-circle">
          <i class="fa fa-plug ti-book"></i>
        </div>
      ),
      content: (
        <div class="tab-pane active" id="address2">
          <h5 class="info-text">Connect a practice</h5>
          <div class="profile_mn2">
            <div class="row">
              <div class="col-md-6">
                <div class="profile_frm">
                  <span class="spn_tx2">
                    Please select any one of the following:
                  </span>
                  <div class="ck_bdr">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          name="practice"
                          id="practice1"
                          value="I own a establishment"
                          onChange={handleStep4}
                        />
                        I own a establishment
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </div>
                  <div class="ck_bdr">
                    <div class="form-check ">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          name="practice"
                          id="practice1"
                          value="I visit a establishment"
                          onChange={handleStep4}
                        />
                        I visit a establishment
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </div>
                  <p
                    className="errorClass"
                    style={{
                      textAlign: "start",
                      fontSize: "13px",
                      color: "red",
                    }}
                  >
                    {step4Error.practice}
                  </p>
                </div>
              </div>
              <div class="col-md-6"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "",
      icon: (
        <div class="icon-circle">
          <i class="fa fa-hospital-o ti-book"></i>
        </div>
      ),
      content: (
        <div class="tab-pane active" id="address3">
          <h5 class="info-text">Establishment basic details</h5>
          <div class="profile_mn2">
            <div class="row">
              <div class="col-md-6">
                <div class="profile_frm">
                  <div class="input_mn">
                    <div class="form-group">
                      <label for="exampleFormControlSelect2">
                        Establishment name
                      </label>
                      <select
                        class="form-control fomm1 valid"
                        id="exampleFormControlSelect2"
                        aria-invalid="false"
                        value={step5Data.name}
                        name="name"
                        onChange={handleStep5}
                      >
                        <option>Select Name</option>
                        <option>MD Hospital</option>
                        <option>New Hospital</option>
                        <option>Kiran Hospital</option>
                        <option>Bhalani Hospital</option>
                        <option>Gov. Hospital</option>
                      </select>
                      <p
                        className="errorClass"
                        style={{
                          textAlign: "start",
                          fontSize: "13px",
                          color: "red",
                        }}
                      >
                        {step5Error.name}
                      </p>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlSelect2">City</label>
                      <select
                        class="form-control fomm1 valid"
                        id="exampleFormControlSelect2"
                        aria-invalid="false"
                        value={step5Data.city}
                        name="city"
                        onChange={handleStep5}
                      >
                        <option>Select City</option>
                        <option>Delhi</option>
                        <option>Noida</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <p
                        className="errorClass"
                        style={{
                          textAlign: "start",
                          fontSize: "13px",
                          color: "red",
                        }}
                      >
                        {step5Error.city}
                      </p>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlSelect2">Locality</label>
                      <select
                        class="form-control fomm1 valid"
                        id="exampleFormControlSelect2"
                        aria-invalid="false"
                        value={step5Data.locality}
                        name="locality"
                        onChange={handleStep5}
                      >
                        <option>Select Locality</option>
                        <option>Noida</option>
                        <option>Delhi</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                      <p
                        className="errorClass"
                        style={{
                          textAlign: "start",
                          fontSize: "13px",
                          color: "red",
                        }}
                      >
                        {step5Error.locality}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6"></div>
            </div>
          </div>
        </div>
      ),
    },
  ];

   const logout = () => {
     localStorage.clear();
     window.location.pathname = "/signin";
   };
  return (
    <LoadingOverlay active={loader} spinner>
      <div class="container-scroller">
        <ToastContainer />
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
                <div class="img-ss rounded-circle bg-dark border mr-3"></div>
                Dark
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
            <ul
              class="nav nav-tabs border-top"
              id="setting-panel"
              role="tablist"
            >
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

          <div class="main-panel">
            <div class="content-wrapper">
              <div class="col-sm-12">
                <div class="wizard-container">
                  <div
                    class="card wizard-card"
                    data-color="orange"
                    id="wizardProfile"
                  >
                    <form action="" method="" novalidate="novalidate">
                      <Steps current={current}>
                        {steps.map((item) => (
                          <Step
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                          />
                        ))}
                      </Steps>
                      <div className="steps-content tab-content">
                        {steps[current].content}
                      </div>
                      <div className="steps-action ml-4 mr-4 text-end mb-4">
                        {current > 0 && (
                          <Button
                            style={{ margin: "0 8px" }}
                            onClick={() => prev()}
                            className="status"
                          >
                            Previous
                          </Button>
                        )}
                        {current < steps.length - 1 && (
                          <Button
                            type="primary"
                            onClick={() => next()}
                            className="status"
                          >
                            Next
                          </Button>
                        )}
                        {current === steps.length - 1 && (
                          <Button
                            type="primary"
                            onClick={() => next()}
                            className="status"
                          >
                            Done
                          </Button>
                        )}
                      </div>
                    </form>
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
    </LoadingOverlay>
  );
};

export default PatientList;
