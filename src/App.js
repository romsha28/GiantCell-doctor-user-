import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./components/Signup/signup";
import SignIn from "./components/SignIn/Signin";
import Home from "./components/Home/home";
import DoctorList from "./components/Doctors/doctorList";
import PatientList from "./components/Patients/patients";
import DoctorProfile from "./components/Doctors/doctorProfile";
import Profile from "./components/Profile/Profile";
import "antd/dist/antd.css";
import Profile2 from "./components/Profile/Profile2";
import Profile3 from "./components/Profile/Profile3";
import MainPage from "./components/Profile/MainPage";
import Calander from "./components/Calander/Calander";
import UserHome from "./UserPanel/Home/home";
import Appoitment from "./UserPanel/Appoitment";
import Patient2 from "./components/Patients/Patient2";
import { useEffect, useState } from "react";
import OTP from "./components/Signup/OTP";
import Commision from "./components/Commision/Commision";
import LoginPage from "./components/Patients/Auth/LoginPage";
import PatientHome from "./components/Patients/Dashboard/PatientHome";
import PatientProfile from "./components/Patients/Dashboard/PatientProfile";
import Appoiment from "./components/Patients/Dashboard/Appoiment";
import Doctors from "./components/Patients/Dashboard/Doctors";
import DoctorDetails from "./components/Patients/Dashboard/DoctorDetails";
import HomePage from "./components/Patients/Auth/HomePage";

const Main = () => {
  const [user, setuser] = useState(null);
  const [patient, setPatient] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      setuser(true);
    } else {
      setuser(false);
    }

    if (localStorage.getItem("v1_user_data")){
      setPatient(JSON.parse(localStorage.getItem("v1_user_data")))
    }



  }, []);

  return (
    <>
      <Routes>
        {!user && (
          <>
            
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/SignIn" element={<SignIn />} />{" "}
            <Route exact path="/otp" element={<OTP />} />{" "}
            {/* <Route path="*" element={<SignIn />} /> */}
          </>
        )}

        {patient !== false ? (
          


          <>
          <Route exact path="/login" element={<PatientHome user={patient.user}/>} />
          <Route exact path="/account" element={<PatientProfile user={patient.user}/>} />
          <Route exact path="/:userId" element={<PatientHome user={patient.user}/>} />
          <Route exact path="/appoiment" element={<Appoiment user={patient.user}/>} />
          <Route exact path="/doctors/:id" element={<DoctorDetails user={patient.user}/>} />
          </>

        ):
        (<>
          <Route exact path="/login" element={<LoginPage/>} />
        </>)}

        

        {user && (

          <>
            <Route exact path="/otp" element={<OTP />} />
            <Route exact path="/main-profile" element={<MainPage />} />
            <Route exact path="/doctors" element={<DoctorList />} />
            <Route exact path="/doctorProfile" element={<DoctorProfile />} />
            <Route exact path="/patients" element={<PatientList />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/profile2" element={<Profile2 />} />
            <Route exact path="/profile3" element={<Profile3 />} />
            <Route exact path="/dashboard" element={<Home />} />
            <Route exact path="/calander" element={<Calander />} />
            <Route exact path="/patient2" element={<Patient2 />} />
            <Route exact path="/user-home" element={<UserHome />} />
            <Route exact path="/appoitment" element={<Appoitment />} />
            <Route exact path="/user-home" element={<UserHome />} />
            <Route exact path="/commision" element={<Commision />} />
          </>

        )}

        <Route exact path="/my-doctors/" element={<Doctors/>} />
        <Route path="/" element={<HomePage/>}/> 
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

export default App;
