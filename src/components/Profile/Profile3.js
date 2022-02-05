import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Steps, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import GoogleMapReact from "google-map-react";
import logo from "../../images/logo.png";

const AnyReactComponent = ({ text }) => (
  <div className="marker-container">
    <div className="marker-card">
      {/* <div className="front face " id="applyhover">
        <i className="im im-icon-Chef-Hat"></i>
      </div> */}
      {/* <div className="back face">
        <i className="im im-icon-Chef-Hat"></i>
      </div> */}
      <div className="marker-arrow p-1 bg-danger rounded"></div>
    </div>
  </div>
);

const option = (
  <>
    {" "}
    <option className="sort" vlaue="8:00AM" >08:00 AM</option>
    {/* <option className="sort" vlaue="8:15AM">8:15 AM</option> */}
    {/* <option className="sort" vlaue="8:30AM">08:30 AM</option> */}
    {/* <option className="sort" vlaue="8:45AM">8:45 AM</option> */}
    <option className="sort" vlaue="9:00AM">09:00 AM</option>
    {/* <option className="sort" vlaue="9:15AM">9:15 AM</option> */}
    {/* <option className="sort" vlaue="9:30AM">09:30 AM</option> */}
    {/* <option className="sort" vlaue="9:45AM">9:45 AM</option> */}
    <option className="sort" vlaue="10:00AM">10:00 AM</option>
    {/* <option className="sort" vlaue="10:15AM">10:15 AM</option> */}
    <option className="sort" vlaue="11:00AM">11:00 AM</option>
    <option className="sort" vlaue="12:00PM">12:00 PM</option>
    {/* <option className="sort" vlaue="12:30PM">12:30 PM</option> */}
    <option className="sort" vlaue="1:00PM">01:00 PM</option>
    {/* <option className="sort" vlaue="1:30PM">1:30 PM</option> */}
    {/* <option className="sort" vlaue="1:45PM">1:45 PM</option> */}
    <option className="sort" vlaue="2:00PM">02:00 PM</option>
    {/* <option className="sort" vlaue="2:30PM">2:30 PM</option> */}
    {/* <option className="sort" vlaue="2:45PM">2:45 PM</option> */}
    <option className="sort" vlaue="3:00PM">03:00 PM</option>
    {/* <option className="sort" vlaue="3:30PM">3:30 PM</option> */}
    {/* <option className="sort" vlaue="3:45PM">3:45 PM</option> */}
    <option className="sort" vlaue="5:00PM">05:00 PM</option>
    {/* <option className="sort" vlaue="5:30PM">5:30 PM</option> */}
    <option className="sort" vlaue="6:00PM">06:00 PM</option>
    {/* <option className="sort" vlaue="6:30PM">6:30 PM</option> */}
    <option className="sort" vlaue="7:00PM">07:00 PM</option>
    <option className="sort" vlaue="8:00PM">08:00 PM</option>
  </>
);

const Profile3 = () => {
  const [step1Data, setstep1Data] = useState({});
  const [step1Error, setstep1Error] = useState({});
  const [step2Data, setstep2Data] = useState({});
  const [step2Error, setstep2Error] = useState({});
  const [step3Data, setstep3Data] = useState({});
  const [step3Error, setstep3Error] = useState({});
const [loader, setloader] = useState(false)
  const [current, setCurrent] = React.useState(0);
  const [userData, setuserData] = useState({});

   
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
      });
  };
  useEffect(() => {
    getProfile();
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setstep1Data({
        ...step1Data,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  const inti = {
    center: {
      lat: step1Data?.lat,
      lng: step1Data?.lng,
    },
    zoom: 13,
  };

  const { Step } = Steps;
  const next1 = () => {
    setCurrent(current + 1);
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

    // if (!step1Data.number) {
    //   formIsValid = false;
    //   errors["number"] = "number is requried";
    // }

    // if (!step1Data.email) {
    //   formIsValid = false;
    //   errors["email"] = "email is Requried";
    // }
    if (!step1Data.address) {
      formIsValid = false;
      errors["address"] = "address is Requried";
    }
    if (!step1Data.city) {
      formIsValid = false;
      errors["city"] = "city is Requried";
    }
    if (!step1Data.state) {
      formIsValid = false;
      errors["state"] = "state is Requried";
    }
    if (!step1Data.country) {
      formIsValid = false;
      errors["country"] = "country is Requried";
    }
    if (!step1Data.pincode) {
      formIsValid = false;
      errors["pincode"] = "pincode is Requried";
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

    if (!step2Data.checkbox) {
      formIsValid = false;
      errors["day"] = "Day is requried";
    }
    if (!step2Data.start) {
      formIsValid = false;
      errors["start"] = "start time is requried";
    }
    if (!step2Data.end) {
      formIsValid = false;
      errors["end"] = "end time is requried";
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

    if (!step3Data.fees) {
      formIsValid = false;
      errors["fees"] = "fees is requried";
    }

    setstep3Error(errors);

    return formIsValid;
  };

  const addDay = () => {
    if (current == 1 && step2Validation()) {
      let data = JSON.parse(localStorage.getItem("user_data"));
      axios
        .post(
          `${process.env.REACT_APP_ENV}/api/profile-establishmenttimings-add`,
          {
            user_id: data?.user_id,
            name: data?.username,
            start_at: step2Data?.start,
            end_at: step2Data?.end,
          }
        )
        .then((res) => {
          console.log("step 2 next click");
          //  setCurrent(current + 1);
          setstep2Data({});
          setstep2Error({});
          getProfile();

          console.log("res", res);
        })
        .catch((e) => {
          console.log("e", e);
        });
    }
  };
  const verify = async () => {
    let data = JSON.parse(localStorage.getItem("user_data"));
    await axios
      .post(`http://brtechgeeks.pythonanywhere.com/api/profile-flag-update`, {
        user_id: data?.user_id,
        section_flag: 3,
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

  console.log("step2data", step2Data);
  const next = () => {
    console.log("99");
    if (current == 0 && step1Validation()) {
      setloader(true)
      let data = JSON.parse(localStorage.getItem("user_data"));

      setCurrent(current + 1);
      getProfile();

      console.log("pp");
      axios
        .post(`${process.env.REACT_APP_ENV}/api/profile-maplocations-update`, {
          user_id: data?.user_id,
          name: data?.username,
          address: step1Data?.address,
          city: step1Data?.city,
          state: step1Data?.state,
          country: step1Data?.country,
          pincode: step1Data?.pincode,
          latitude_coordinate: step1Data?.lat,
          longitude_coordinate: step1Data?.lng,
        })
        .then((res) => {
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
    if (current == 1 && step2Validation()) {
      setloader(true)
      let data = JSON.parse(localStorage.getItem("user_data"));
      axios
        .post(
          `${process.env.REACT_APP_ENV}/api/profile-establishmenttimings-add`,
          {
            user_id: data?.user_id,
            name: data?.username,
            start_at: step2Data.start,
            end_at: step2Data.end,
          }
        )
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
        .post(
          `${process.env.REACT_APP_ENV}/api/profile-consultationfees-update`,
          {
            user_id: data?.user_id,
            name: data?.username,
            amount: step3Data?.fees,
          }
        )
        .then(async (res) => {
          console.log("step 3 next click");
          await verify();
          message.success("Processing complete!");
          localStorage.setItem("step3", true);

          getProfile();
          toast.success("KYC Step3 Completed Sucessfull!!");
          setloader(false)
          navigate("/");

          console.log("res", res);
        })
        .catch((e) => {
          setloader(false)
          console.log("e", e);
        });
    }
  };

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
          <h3 class="info-text">Map Location</h3>

          <div class="profile_mn2">
            <div class="row">
              <div class="col-md-6 col-sm-offset-2">
                {/* <div class="form-group">
                  <label for="exampleInputUsername1">Phone number</label>
                  <input
                    type="number"
                    class="form-control fomm1"
                    id="exampleInputUsername1"
                    placeholder="+91 0000 000 000"
                    value={step1Data.number}
                    name="number"
                    onChange={handleStep1}
                  />
                  <span class="spn_cls">
                    Note: Patient calls will be directed to this number. You can
                    update it later also.
                  </span>
                </div>
                <p
                  className="errorClass"
                  style={{
                    textAlign: "start",
                    fontSize: "13px",
                    color: "red",
                  }}
                >
                  {step1Error.number}
                </p>

                <div class="form-group">
                  <label
                    for="exampleInputEmail1"
                    className="w-100"
                    style={{ width: "100%" }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control fomm1"
                    id="exampleInputEmail1"
                    placeholder="Enter email address"
                    value={step1Data.email}
                    name="email"
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
                  {step1Error.email}
                </p> */}
                <div class="form-group">
                  <label for="exampleInputEmail1">Street address</label>
                  <input
                    type="text"
                    class="form-control fomm1"
                    id="exampleInputEmail1"
                    placeholder="Type street address"
                    value={step1Data.address}
                    name="address"
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
                  {step1Error.address}
                </p>
                <div className="row" >
              <div class="col-md-6">

                <div class="form-group">
                  <label
                    for="exampleInputEmail1"
                    className="w-100"
                    style={{ width: "100%" }}
                  >
                    Enter pincode
                  </label>
                  <input
                    type="text"
                    class="form-control fomm1"
                    placeholder="Enter pincode"
                    value={step1Data.pincode}
                    name="pincode"
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
                  {step1Error.pincode}
                  </p>
                </div>
              <div class="col-md-6">
                
                <div class="form-group">
                  <label
                    for="exampleInputEmail1"
                    className="w-100"
                    style={{ width: "100%" }}
                  >
                    Enter City
                  </label>
                  <input
                    type="text"
                    class="form-control fomm1"
                    placeholder="Enter city"
                    value={step1Data.city}
                    name="city"
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
                  {step1Error.city}
                </p>
                </div>
                </div>
                <div className="row" >
              <div class="col-md-6">

                <div class="form-group">
                  <label
                    for="exampleInputEmail1"
                    className="w-100"
                    style={{ width: "100%" }}
                  >
                    Enter State
                  </label>
                  <input
                    type="text"
                    class="form-control fomm1"
                    placeholder="Enter state"
                    value={step1Data.state}
                    name="state"
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
                  {step1Error.state}
                </p>
                  </div>
              <div class="col-md-6">
                  
                <div class="form-group">
                  <label
                    for="exampleInputEmail1"
                    className="w-100"
                    style={{ width: "100%" }}
                  >
                    Enter Country
                  </label>
                  <input
                    type="text"
                    class="form-control fomm1"
                    placeholder="Enter country"
                    value={step1Data.country}
                    name="country"
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
                  {step1Error.country}
                    </p>
                    </div></div>
              </div>

              <div class="col-md-6">
                <p>USE CURRENT LOCATION</p>
                <div style={{ height: "200px" }}>
                  <GoogleMapReact
                    //   bootstrapURLKeys={{
                    defaultCenter={inti.center}
                    defaultZoom={inti.zoom}
                  >
                    <AnyReactComponent
                      lat={step1Data?.lat}
                      lng={step1Data?.lng}
                      text="Gaurang"
                    />
                  </GoogleMapReact>
                </div>

                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4892942431206!2d77.30940131455851!3d28.585094692978352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f97fb7b77%3A0x57e50ec90fd80e55!2sNoida%20Sector-%2015!5e0!3m2!1sen!2sin!4v1639479094913!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: "0px" }}
                  allowfullscreen=""
                  loading="lazy"  
                ></iframe> */}
              </div>
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
          <h5 class="info-text">Establishment Timings</h5>
          <div class="profile_mn2">
            <div class="row">
              <div class="col-md-6 col-sm-offset-2">
                <div class="onboarding-label">Days</div>
                <br />
                <div>
                  <div
                    class="
                                    o-checkbox--oval
                                    u-d-inlineblock
                                    u-spacer-sm--right__mobile
                                    u-spacer-lg--right__desktop
                                  "
                  >
                    <input
                      type="checkbox"
                      class="o-checkbox--oval__input"
                      name="checkbox"
                      id="monday-1"
                      value="monday"
                      onChange={handleStep2}
                      // checked={step2Data?.checkbox === "monday" && true}
                    />
                    <label
                      class="o-checkbox--oval__label"
                      for="monday-1"
                      data-qa-id="clinicTimings-1-monday"
                    >
                      <span class="pos-m-m">Mo</span>
                    </label>
                  </div>
                  <div
                    class="
                                    o-checkbox--oval
                                    u-d-inlineblock
                                    u-spacer-sm--right__mobile
                                    u-spacer-lg--right__desktop
                                  "
                  >
                    <input
                      type="checkbox"
                      class="o-checkbox--oval__input"
                      name="checkbox"
                      id="tuesday-1"
                      value="tuesday"
                      onChange={handleStep2}
                      // checked={step2Data?.checkbox === "tuesday" && true}
                    />
                    <label
                      class="o-checkbox--oval__label"
                      for="tuesday-1"
                      data-qa-id="clinicTimings-1-tuesday"
                    >
                      <span class="pos-m-m">Tu</span>
                    </label>
                  </div>
                  <div
                    class="
                                    o-checkbox--oval
                                    u-d-inlineblock
                                    u-spacer-sm--right__mobile
                                    u-spacer-lg--right__desktop
                                  "
                  >
                    <input
                      type="checkbox"
                      class="o-checkbox--oval__input"
                      name="checkbox"
                      id="wednesday-1"
                      value="wednesday"
                      onChange={handleStep2}
                      // checked={step2Data?.checkbox === "wednesday" && true}
                    />
                    <label
                      class="o-checkbox--oval__label"
                      for="wednesday-1"
                      data-qa-id="clinicTimings-1-wednesday"
                    >
                      <span class="pos-m-m">We</span>
                    </label>
                  </div>
                  <div
                    class="
                                    o-checkbox--oval
                                    u-d-inlineblock
                                    u-spacer-sm--right__mobile
                                    u-spacer-lg--right__desktop
                                  "
                  >
                    <input
                      type="checkbox"
                      class="o-checkbox--oval__input"
                      name="checkbox"
                      id="thursday-1"
                      value="thursday"
                      onChange={handleStep2}
                      // checked={step2Data?.checkbox === "thursday" && true}
                    />
                    <label
                      class="o-checkbox--oval__label"
                      for="thursday-1"
                      data-qa-id="clinicTimings-1-thursday"
                    >
                      <span class="pos-m-m">Th</span>
                    </label>
                  </div>
                  <div
                    class="
                                    o-checkbox--oval
                                    u-d-inlineblock
                                    u-spacer-sm--right__mobile
                                    u-spacer-lg--right__desktop
                                  "
                  >
                    <input
                      type="checkbox"
                      class="o-checkbox--oval__input"
                      name="checkbox"
                      id="friday-1"
                      value="friday"
                      onChange={handleStep2}
                      // checked={step2Data?.checkbox === "friday" && true}
                    />
                    <label
                      class="o-checkbox--oval__label"
                      for="friday-1"
                      data-qa-id="clinicTimings-1-friday"
                    >
                      <span class="pos-m-m">Fr</span>
                    </label>
                  </div>
                  <div
                    class="
                                    o-checkbox--oval
                                    u-d-inlineblock
                                    u-spacer-sm--right__mobile
                                    u-spacer-lg--right__desktop
                                  "
                  >
                    <input
                      type="checkbox"
                      class="o-checkbox--oval__input"
                      name="checkbox"
                      id="saturday-1"
                      value="saturday"
                      onChange={handleStep2}
                      // checked={step2Data?.checkbox === "saturday" && true}
                    />
                    <label
                      class="o-checkbox--oval__label"
                      for="saturday-1"
                      data-qa-id="clinicTimings-1-saturday"
                    >
                      <span class="pos-m-m">Sa</span>
                    </label>
                  </div>
                  <div
                    class="
                                    o-checkbox--oval
                                    u-d-inlineblock
                                    u-spacer-sm--right__mobile
                                    u-spacer-lg--right__desktop
                                  "
                  >
                    <input
                      type="checkbox"
                      class="o-checkbox--oval__input"
                      name="checkbox"
                      id="sunday-1"
                      value="sunday"
                      onChange={handleStep2}
                      // checked={step2Data?.checkbox === "sunday" && true}
                    />
                    <label
                      class="o-checkbox--oval__label"
                      for="sunday-1"
                      data-qa-id="clinicTimings-1-sunday"
                    >
                      <span class="pos-m-m">Su</span>
                    </label>
                  </div>
                  <p
                    className="errorClass"
                    style={{
                      textAlign: "start",
                      fontSize: "13px",
                      color: "red",
                    }}
                  >
                    {step2Error.day}
                  </p>
                </div>

                <div class="col-md-12">
                  <div class="row">
                    <span class="sec_cls">Sessions 1</span>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleFormControlSelect1"></label>
                        <select
                          class="
                                          form-control form-control-lg
                                          fomm1
                                        "
                          id="exampleFormControlSelect1"
                          value={step2Data?.start}
                          name="start"
                          onChange={handleStep2}
                        >
                          {option && option}
                        </select>
                      </div>
                      <p
                        className="errorClass"
                        style={{
                          textAlign: "start",
                          fontSize: "13px",
                          color: "red",
                        }}
                      >
                        {step2Error.start}
                      </p>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleFormControlSelect1"></label>
                        <select
                          class="
                                          form-control form-control-lg
                                          fomm1
                                        "
                          id="exampleFormControlSelect1"
                          value={step2Data.end}
                          name="end"
                          onChange={handleStep2}
                        >
                          {option && option}
                        </select>
                      </div>
                      <p
                        className="errorClass"
                        style={{
                          textAlign: "start",
                          fontSize: "13px",
                          color: "red",
                        }}
                      >
                        {step2Error.end}
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <span class="sec_cls">Sessions 2</span>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleFormControlSelect1"></label>
                        <select
                          class="
                                          form-control form-control-lg
                                          fomm1
                                        "
                          id="exampleFormControlSelect1"
                        >
                          {option && option}
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleFormControlSelect1"></label>
                        <select
                          class="
                                          form-control form-control-lg
                                          fomm1
                                        "
                          id="exampleFormControlSelect1"
                        >
                          {option && option}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p
                data-qa-id="section-1-change"
                class="
                                    onboarding-link
                                    u-cushion--xsm-left
                                    u-bold
                                    text-blue
                                    curser-pointer
                                  "
                onClick={addDay}
              >
                Add more Days
              </p>
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
          <h5 class="info-text">Details of consultant doctor</h5>
          <div class="profile_mn2">
            <div class="row">
              <div class="col-md-6">
                <span class="input_nm">Consultation Fees</span>
                <div class="input-group mb-2 mr-sm-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text fomm2">Rs.</div>
                  </div>
                  <input
                    type="text"
                    class="form-control fomm1"
                    id="inlineFormInputGroupUsername2"
                    placeholder="500"
                    value={step3Data.fees}
                    name="fees"
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
                  {step3Error.fees}
                </p>

                <div class="profile_frm">
                  <span class="spn_tx2">Doctor’s hours</span>

                  <div class="ck_bdr">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          name="optionsRadios"
                          id="optionsRadios2"
                          value="option1"
                          //   checked=""
                        />
                        Same as establishment hours
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </div>

                  <div class="ck_bdr">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          name="optionsRadios"
                          id="optionsRadios1"
                          value="option2"
                        />
                        Different from establishment hours
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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

export default Profile3;
