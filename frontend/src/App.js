import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  Home,
  Login,
  PatientReg,
  NurseReg,
  DoctorReg,
  PatientDS,
  NurseDS,
  SaTool,
  PatientList,
  AppointmentScheduler,
  DoctorDS,
  UpdateDoctor,
  UpdateNurse,
  UpdatePatient,
  AppointmentSchedulerDoctor,
  AdminDS,
  AddUserAdmin,
  UserListAdmin,
  AppointmentsDoctor,
  AppointmentsNurse,
  PatientListDoc,
  AboutUs,
} from "./components";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div
          style={{
            height: "100vh",
            minHeight: "100vh",
            marginTop: 0,
          }}>
          <Route path="/" component={Home} exact />
          <Route path="/about-us" component={AboutUs} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/patient-register" component={PatientReg} exact />
          <Route path="/patient" component={PatientDS} exact />
          <Route path="/Self-assessment" component={SaTool} exact />
          <Route path="/update-patient" component={UpdatePatient} exact />

          <Route path="/nurse-register" component={NurseReg} exact />
          <Route path="/nurse" component={NurseDS} exact />
          <Route path="/Patient-list" component={PatientList} exact />
          <Route path="/schedule-appointment" component={AppointmentScheduler} exact />
          <Route path="/upcoming-appointment" component={AppointmentsNurse} exact />
          <Route path="/update-nurse" component={UpdateNurse} exact />

          <Route path="/doctor-register" component={DoctorReg} exact />
          <Route path="/doctor" component={DoctorDS} exact />
          <Route path="/upcoming-appointment-doc" component={AppointmentsDoctor} exact />
          <Route path="/schedule-appointment-doctor" component={AppointmentSchedulerDoctor} exact />
          <Route path="/update-doctor" component={UpdateDoctor} exact />
          <Route path="/patient-list-doc" component={PatientListDoc} exact />

          <Route path="/admin" component={AdminDS} exact />
          <Route path="/user-list" component={UserListAdmin} exact />
          <Route path="/add-user" component={AddUserAdmin} exact />
        </div>
      </Router>
    );
  }
}

export default App;
