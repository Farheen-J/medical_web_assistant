import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import moment from "moment";
import Snackbar from "@material-ui/core/Snackbar";
import FormHelperText from "@material-ui/core/FormHelperText";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Visibility from "@material-ui/icons/Visibility";

import {
  registerDoctor,
  registerNurse,
  registerPatient,
  logout,
  getPatientListAdmin,
  getNurseListAdmin,
  getDoctorListAdmin,
  getReport,
} from "../../api/Api";

import back from "../../assets/Images/Subtract.svg";
import list from "../../assets/Images/list.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function validateName(name) {
  if (name.length == 0) return true;
  const re = /^[A-Za-z]+$/;
  return re.test(String(name).toLowerCase());
}
function validateNum(num) {
  if (num.length == 0) return true;
  const re = /^[0-9]+$/;
  return re.test(num);
}

function validateEmail(email) {
  if (email.length == 0) return true;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const AdminDS = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const [openTwo, setOpenTwo] = React.useState(false);

  const handleClickTwo = () => {
    setOpenTwo(true);
  };

  const handleCloseTwo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenTwo(false);
  };

  const [state, setState] = React.useState({
    detail: history.location.state.detail,
    patientList: history.location.state.patientList,
    nurseList: history.location.state.nurseList,
    doctorList: history.location.state.doctorList,
    report: history.location.state.report,
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNum: "",
    dob: "",
    address: "",
    regNum: "",
    showPassword: false,
    index: 0,
    selected: "patient",
  });

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };
  const handleDateChange = (date) => {
    setState({ ...state, dob: date });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={false} sm={3}>
        <div style={{ height: "100%" }}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            style={{ backgroundImage: `url(${back})`, backgroundRepeat: "no-repeat", height: "100%", margin: 0 }}>
            <Typography className={classes.navTitle} variant="h3" gutterBottom>
              <Link
                to={{
                  pathname: "/admin",
                  state: {
                    detail: history.location.state.detail,
                    patientList: state.patientList,
                    doctorList: state.doctorList,
                    nurseList: state.nurseList,
                    report: state.report,
                  },
                }}
                className={classes.link}>
                CDC
              </Link>
            </Typography>

            <Typography style={{ marginTop: "45%" }} className={classes.navText} variant="h6" gutterBottom>
              <Link
                to={{
                  pathname: "/admin",
                  state: {
                    detail: history.location.state.detail,
                    patientList: state.patientList,
                    doctorList: state.doctorList,
                    nurseList: state.nurseList,
                    report: state.report,
                  },
                }}
                className={classes.link}>
                Dashboard
              </Link>
            </Typography>

            <Typography style={{}} className={classes.navText} variant="h6" gutterBottom>
              <Link
                to={{
                  pathname: "/user-list",
                  state: {
                    detail: history.location.state.detail,
                    patientList: state.patientList,
                    doctorList: state.doctorList,
                    nurseList: state.nurseList,
                    report: state.report,
                  },
                }}
                style={{ borderBottom: "solid 3px", paddingBottom: 7, borderRadius: 2 }}
                className={classes.link}>
                Users
              </Link>
            </Typography>

            <Typography className={classes.navBot} variant="h6" gutterBottom>
              <Link to={"/"} onClick={() => logout()} className={classes.link}>
                Logout
              </Link>
            </Typography>
          </Grid>
        </div>
      </Grid>

      <Grid item sm={9} style={{ marginLeft: "-3%", height: "100%" }}>
        <Grid container direction="row" style={{ marginTop: "4%", height: 850 }}>
          <Grid item sm={8} style={{ height: "10%" }}>
            <Grid container direction="row" style={{ height: "100%" }}>
              <Typography variant="h2" gutterBottom className={classes.title}>
                Add a new user
              </Typography>
            </Grid>
            <Grid
              container
              alignItems="center"
              justify="space-between"
              style={{
                height: 64,
                backgroundColor: "#F2F6F8",
                borderRadius: 28,
                padding: 12,
                width: 1000,
              }}>
              <Grid container alignItems="center" justify="space-evenly" style={{}}>
                <Typography
                  style={{
                    color: "#3C4161",
                    fontSize: 19,
                    fontFamily: "product_sansbold",
                    marginRight: 5,
                  }}
                  className={classes.listText}>
                  A new user is:
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  className={classes.loginBtn2}
                  disableElevation
                  style={
                    state.selected == "patient"
                      ? {
                          color: "#3C4161",
                          backgroundColor: "white",
                          border: "1px solid #3C76EF",
                          borderLeft: "17px solid #3C76EF",
                          borderColor: "#3C76EF",
                        }
                      : { color: "#3C4161", backgroundColor: "white" }
                  }
                  onClick={() =>
                    setState({
                      ...state,
                      selected: "patient",
                      emailId: "",
                      firstName: "",
                      lastName: "",
                      phoneNum: "",
                      dob: "",
                      address: "",
                      password: "",
                      regNum: "",
                    })
                  }>
                  A Patient
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  className={classes.loginBtn2}
                  disableElevation
                  style={
                    state.selected == "nurse"
                      ? {
                          color: "#3C4161",
                          backgroundColor: "white",
                          border: "1px solid #3C76EF",
                          borderLeft: "17px solid #3C76EF",
                          borderColor: "#3C76EF",
                        }
                      : { color: "#3C4161", backgroundColor: "white" }
                  }
                  onClick={() =>
                    setState({
                      ...state,
                      selected: "nurse",
                      emailId: "",
                      firstName: "",
                      lastName: "",
                      phoneNum: "",
                      dob: "",
                      address: "",
                      password: "",
                      regNum: "",
                    })
                  }>
                  A Nurse
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  className={classes.loginBtn2}
                  disableElevation
                  style={
                    state.selected == "doctor"
                      ? {
                          color: "#3C4161",
                          backgroundColor: "white",
                          border: "1px solid #3C76EF",
                          borderLeft: "17px solid #3C76EF",
                          borderColor: "#3C76EF",
                        }
                      : { color: "#3C4161", backgroundColor: "white" }
                  }
                  onClick={() =>
                    setState({
                      ...state,
                      selected: "doctor",
                      emailId: "",
                      firstName: "",
                      lastName: "",
                      phoneNum: "",
                      dob: "",
                      address: "",
                      password: "",
                      regNum: "",
                    })
                  }>
                  A Doctor
                </Button>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ height: "100%", marginLeft: "12%", marginTop: "5%" }}>
                <Grid container direction="row" justify="center" alignItems="center">
                  <FormControl
                    className={clsx(classes.margin, classes.textFieldTwo)}
                    variant="outlined"
                    error={!validateName(state.firstName)}>
                    <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>
                      First Name
                    </InputLabel>
                    <OutlinedInput
                      autoFocus
                      // id="outlined-adornment-password"
                      type="text"
                      value={state.firstName}
                      onChange={handleChange("firstName")}
                      labelWidth={80}
                    />
                    {!validateName(state.firstName) && (
                      <FormHelperText id="component-error-text">Name can only contain alphabets</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    className={clsx(classes.margin, classes.textFieldTwo)}
                    variant="outlined"
                    error={!validateName(state.lastName)}>
                    <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>
                      Last Name
                    </InputLabel>
                    <OutlinedInput
                      // id="outlined-adornment-password"
                      type="text"
                      value={state.lastName}
                      onChange={handleChange("lastName")}
                      labelWidth={80}
                    />
                    {!validateName(state.lastName) && (
                      <FormHelperText id="component-error-text">Name can only contain alphabets</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {state.selected == "nurse" && (
                  <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>
                      Nurse Registration Number
                    </InputLabel>
                    <OutlinedInput
                      // id="outlined-adornment-password"
                      type="text"
                      value={state.regNum}
                      onChange={handleChange("regNum")}
                      labelWidth={200}
                    />
                  </FormControl>
                )}
                {state.selected == "doctor" && (
                  <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>
                      Doctor Registration Number
                    </InputLabel>
                    <OutlinedInput
                      // id="outlined-adornment-password"
                      type="text"
                      value={state.regNum}
                      onChange={handleChange("regNum")}
                      labelWidth={200}
                    />
                  </FormControl>
                )}
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  error={!validateEmail(state.emailId)}>
                  <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>
                    Email Address
                  </InputLabel>
                  <OutlinedInput
                    helperText="Please correct the email format"
                    type="text"
                    value={state.emailId}
                    onChange={handleChange("emailId")}
                    labelWidth={105}
                  />
                  {!validateEmail(state.emailId) && (
                    <FormHelperText id="component-error-text">Please check email format</FormHelperText>
                  )}
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={state.showPassword ? "text" : "password"}
                    value={state.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end">
                          {state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
                <Grid container direction="row" justify="center" alignItems="center">
                  <FormControl
                    className={clsx(classes.margin, classes.textFieldTwo)}
                    variant="outlined"
                    error={!validateNum(state.phoneNum)}>
                    <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>
                      Phone Number
                    </InputLabel>
                    <OutlinedInput
                      // id="outlined-adornment-password"
                      type="text"
                      value={state.phoneNum}
                      onChange={handleChange("phoneNum")}
                      labelWidth={110}
                    />
                    {!validateNum(state.phoneNum) && (
                      <FormHelperText id="component-error-text">
                        Phone number should not contain alphabets
                      </FormHelperText>
                    )}
                  </FormControl>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={clsx(classes.margin, classes.textFieldTwo)}
                      disableToolbar
                      inputVariant="outlined"
                      error={false}
                      helperText=""
                      variant="inline"
                      format="MM/dd/yyyy"
                      defaultValue="MM/DD/YYYY"
                      id="date-picker-inline"
                      label="Date of Birth"
                      value={state.dob}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>
                    Address
                  </InputLabel>
                  <OutlinedInput
                    // id="outlined-adornment-password"
                    type="text"
                    value={state.address}
                    onChange={handleChange("address")}
                    labelWidth={60}
                  />
                </FormControl>
                <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: "5%" }}>
                  <Link
                    to={{
                      pathname: "/user-list",
                      state: {
                        detail: state.detail,
                        patientList: state.patientList,
                        doctorList: state.doctorList,
                        nurseList: state.nurseList,
                        report: state.report,
                      },
                    }}
                    style={{ textDecoration: "none" }}>
                    <Button
                      variant="text"
                      size="large"
                      className={clsx(classes.margin, classes.signInBtn)}
                      color="primary">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    size="large"
                    className={clsx(classes.margin, classes.registerBtn)}
                    color="primary"
                    disabled={
                      state.emailId.length == 0 ||
                      state.firstName.length == 0 ||
                      state.lastName.length == 0 ||
                      state.phoneNum.length == 0 ||
                      state.password.length == 0 ||
                      state.address.length == 0
                    }
                    onClick={() =>
                      state.selected == "patient"
                        ? validateEmail(state.emailId) &&
                          validateName(state.firstName) &&
                          validateName(state.lastName) &&
                          validateNum(state.phoneNum)
                          ? registerPatient(
                              state.emailId,
                              state.firstName,
                              state.lastName,
                              state.password,
                              state.dob,
                              state.phoneNum,
                              state.address,
                              false
                            ).then(async function (response) {
                              if (response.token) {
                                handleClick();
                                let from = moment(new Date()).format("YYYY-MM-DD");
                                let patientList = await getPatientListAdmin();
                                let nurseList = await getNurseListAdmin();
                                let doctorList = await getDoctorListAdmin();
                                let report = await getReport(from, from);
                                setState({
                                  ...state,
                                  patientList,
                                  nurseList,
                                  doctorList,
                                  report: report.count,
                                  emailId: "",
                                  firstName: "",
                                  lastName: "",
                                  phoneNum: "",
                                  dob: "",
                                  address: "",
                                  password: "",
                                });
                              } else window.alert(response.message);
                            })
                          : handleClickTwo()
                        : state.selected == "nurse"
                        ? validateEmail(state.emailId) &&
                          validateName(state.firstName) &&
                          validateName(state.lastName) &&
                          validateNum(state.phoneNum)
                          ? registerNurse(
                              state.emailId,
                              state.firstName,
                              state.lastName,
                              state.password,
                              state.dob,
                              state.phoneNum,
                              state.address,
                              state.regNum,
                              false
                            ).then(async function (response) {
                              if (response.token) {
                                handleClick();
                                let from = moment(new Date()).format("YYYY-MM-DD");
                                let patientList = await getPatientListAdmin();
                                let nurseList = await getNurseListAdmin();
                                let doctorList = await getDoctorListAdmin();
                                let report = await getReport(from, from);
                                setState({
                                  ...state,
                                  patientList,
                                  nurseList,
                                  doctorList,
                                  report: report.count,
                                  emailId: "",
                                  firstName: "",
                                  lastName: "",
                                  phoneNum: "",
                                  dob: "",
                                  address: "",
                                  password: "",
                                  regNum: "",
                                });
                              } else window.alert(response.message);
                            })
                          : handleClickTwo()
                        : validateEmail(state.emailId) &&
                          validateName(state.firstName) &&
                          validateName(state.lastName) &&
                          validateNum(state.phoneNum)
                        ? registerDoctor(
                            state.emailId,
                            state.firstName,
                            state.lastName,
                            state.password,
                            state.dob,
                            state.phoneNum,
                            state.address,
                            state.regNum,
                            false
                          ).then(async function (response) {
                            if (response.token) {
                              handleClick();
                              let from = moment(new Date()).format("YYYY-MM-DD");
                              let patientList = await getPatientListAdmin();
                              let nurseList = await getNurseListAdmin();
                              let doctorList = await getDoctorListAdmin();
                              let report = await getReport(from, from);
                              setState({
                                ...state,
                                patientList,
                                nurseList,
                                doctorList,
                                report: report.count,
                                emailId: "",
                                firstName: "",
                                lastName: "",
                                phoneNum: "",
                                dob: "",
                                address: "",
                                password: "",
                                regNum: "",
                              });
                            } else window.alert(response.message);
                          })
                        : handleClickTwo()
                    }>
                    Add User
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          User has been successfully created.
        </Alert>
      </Snackbar>
      <Snackbar open={openTwo} autoHideDuration={4000} onClose={handleCloseTwo}>
        <Alert onClose={handleCloseTwo} severity="error">
          Please check all fields and try again.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AdminDS;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  text: {
    fontFamily: "product_sans_lightregular",
    letterSpacing: 0.5,
    lineHeight: 1.3,
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontFamily: "product_sansbold",
  },
  title: {
    fontFamily: "product_sans_blackregular",
    color: "#3c4161",
    letterSpacing: 0.4,
  },
  listText: {
    fontFamily: "product_sansregular",
    letterSpacing: 0.5,
    lineHeight: 1.3,
  },
  table: {
    mixWidth: 450,
  },
  registerBtn: {
    // color:'#3C76EF'
    backgroundColor: "#3C76EF",
    color: "white",
    boxShadow: "none",
    fontFamily: "product_sans_lightregular",
    textTransform: "capitalize",
    paddingHorizontal: "5%",
    width: "20%",
    fontSize: 19,
  },
  signInBtn: {
    color: "#3C76EF",
    boxShadow: "none",
    fontFamily: "product_sans_lightregular",
    textTransform: "capitalize",
    fontSize: 19,
  },
  navTitle: {
    color: "white",
    margin: "10%",
    marginLeft: "15%",
    marginTop: "15%",
    fontFamily: "product_sans_blackregular",
  },

  navText: {
    color: "white",
    margin: "5%",
    marginLeft: "15%",
    fontFamily: "product_sansbold",
  },
  navBot: {
    color: "white",
    margin: "5%",
    marginLeft: "15%",
    marginTop: "50%",
    fontFamily: "product_sans_blackregular",
  },
  loginBtn: {
    // backgroundColor: '#3C76EF',
    color: "#3c4161",
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "product_sansregular",
    width: "20%",
    // marginTop: "5%",
    fontSize: 16,
    borderColor: "#3c4161",
    borderWidth: 2,
  },
  loginBtn2: {
    // backgroundColor: '#3C76EF',
    borderRadius: 16,
    color: "#3c4161",
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "product_sansregular",
    width: "20%",
    // marginTop: "5%",
    fontSize: 16,
    borderColor: "#3c4161",
    borderWidth: 2,
  },
  margin: {
    margin: theme.spacing(1),
  },

  textFieldTwo: {
    width: "30ch",
  },
  textField: {
    width: "62ch",
  },
}));
