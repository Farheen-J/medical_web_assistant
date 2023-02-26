import React from "react";
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
import back from "../assets/Images/Subtract.svg";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import Visibility from "@material-ui/icons/Visibility";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import {
  loginPatient,
  getPreviousAssessmentData,
  getListForReview,
  getForwardedAssessmentData,
  getPatientListAdmin,
  getNurseListAdmin,
  getDoctorListAdmin,
  getAppointmentList,
  getAppointmentListDr,
  getPatientListForDr,
  getPatientList,
  getReport,
} from "../api/Api";
import moment from "moment";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Login = ({ history }) => {
  const classes = useStyles();

  const [error, setError] = React.useState(false);

  const handleClickError = () => {
    setError(true);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };
  const [state, setState] = React.useState({
    userId: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
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
            style={{
              backgroundImage: `url(${back})`,
              backgroundRepeat: "no-repeat",
              height: "100%",
              margin: 0,
            }}>
            <div>
              <Typography className={classes.navTitle} variant="h3" gutterBottom>
                {" "}
                <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                  CDC
                </Link>
              </Typography>
              <Typography className={classes.navTitle} style={{ marginTop: "50%" }} variant="h5" gutterBottom>
                Register as
              </Typography>
              <Typography className={classes.navText} variant="h6" gutterBottom>
                <Link
                  to={{
                    pathname: "/patient-register",
                  }}
                  className={classes.link}>
                  Patient
                </Link>
              </Typography>
              <Typography className={classes.navText} variant="h6" gutterBottom>
                <Link to={"/nurse-register"} className={classes.link}>
                  Nurse
                </Link>
              </Typography>
              <Typography className={classes.navText} variant="h6" gutterBottom>
                <Link to={"/doctor-register"} className={classes.link}>
                  Doctor
                </Link>
              </Typography>
              <Grid container direction="row" className={classes.navBot}>
                <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                  <ArrowBackIosIcon fontSize="large"></ArrowBackIosIcon>
                </Link>
                <Typography variant="h5" className={classes.text}>
                  <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                    Home
                  </Link>
                </Typography>
              </Grid>
            </div>
          </Grid>
        </div>
      </Grid>

      <Grid item sm={6}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "100%", marginLeft: "10%" }}>
          <Typography variant="h2" gutterBottom className={classes.title}>
            Login
          </Typography>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>
              Email ID
            </InputLabel>
            <OutlinedInput
              autoFocus
              type="text"
              value={state.userId}
              onChange={handleChange("userId")}
              labelWidth={65}
            />
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
          <Button
            variant="contained"
            size="large"
            className={classes.loginBtn}
            color="primary"
            onClick={() =>
              loginPatient(state.userId, state.password).then(async function (response) {
                if (response.token && response.type == "patient") {
                  let assessmentData = await getPreviousAssessmentData();

                  history.push({
                    pathname: "/patient",
                    state: {
                      detail: response,
                      assessmentData: assessmentData,
                    },
                  });
                } else if (response.token && response.type == "nurse") {
                  let patientData = await getListForReview();
                  let appointmentList = await getAppointmentList();
                  let patientList = await getPatientList();
                  history.push({
                    pathname: "/nurse",
                    state: { detail: response, patientData, appointmentList, patientList },
                  });
                } else if (response.token && response.type == "admin") {
                  let from = moment(new Date()).format("YYYY-MM-DD");

                  let patientList = await getPatientListAdmin();
                  let nurseList = await getNurseListAdmin();
                  let doctorList = await getDoctorListAdmin();
                  let report = await getReport(from, from);
                  history.push({
                    pathname: "/admin",
                    state: {
                      detail: response,
                      patientList,
                      nurseList,
                      doctorList,
                      report: report.count,
                    },
                  });
                } else if (response.token && response.type == "doctor") {
                  let patientData = await getForwardedAssessmentData();
                  let appointmentList = await getAppointmentListDr();
                  let patientList = await getPatientListForDr();
                  history.push({
                    pathname: "/doctor",
                    state: { detail: response, patientData, appointmentList, patientList },
                  });
                } else handleClickError();
              })
            }>
            Login
          </Button>
          <Typography variant="h6" gutterBottom style={{ color: "#8e8e8e", marginTop: 20 }} className={classes.text}>
            New User? Check 'Register As' section
          </Typography>
        </Grid>
      </Grid>
      <Snackbar open={error} autoHideDuration={4000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          Please check Email and Password again.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Login;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  text: {
    fontFamily: "product_sansregular",
  },
  title: {
    fontFamily: "product_sans_blackregular",
    color: "#3c4161",
    letterSpacing: 0.4,
  },
  navTitle: {
    color: "white",
    margin: "10%",
    marginLeft: "15%",
    marginTop: "15%",
    fontFamily: "product_sans_blackregular",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontFamily: "product_sansregular",
  },
  navText: {
    color: "white",
    margin: "5%",
    marginLeft: "20%",
    fontFamily: "product_sansregular",
  },
  navBot: {
    color: "white",
    margin: "5%",
    marginLeft: "12%",
    marginTop: "50%",
    fontFamily: "product_sans_blackregular",
  },
  loginBtn: {
    backgroundColor: "#3C76EF",
    color: "white",
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "product_sans_blackregular",
    width: "25%",
    marginTop: "5%",
    fontSize: 19,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "50ch",
  },
}));
