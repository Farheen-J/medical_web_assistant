import React from "react";
import { Link } from "react-router-dom";
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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import DateFnsUtils from "@date-io/date-fns";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import FormHelperText from "@material-ui/core/FormHelperText";
import line from "../../assets/Images/navline.png";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import back from "../../assets/Images/Subtract.svg";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import { registerPatient, getPreviousAssessmentData } from "../../api/Api";
import moment from "moment";
const currDate = moment(new Date()).format("MM/DD/YYYY");
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
const PatientReg = ({ history }) => {
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
    firstName: "",
    lastName: "",

    emailId: "",
    password: "",
    phoneNum: "",
    dob: "",
    address: "",

    showPassword: false,
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
            <div>
              <Typography className={classes.navTitle} variant="h3" gutterBottom>
                <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                  {" "}
                  CDC
                </Link>
              </Typography>
              <Typography className={classes.navTitle} style={{ marginTop: "50%" }} variant="h5" gutterBottom>
                Register as
              </Typography>
              <Typography className={classes.navText} variant="h6" gutterBottom>
                <Link
                  to={"/patient-register"}
                  className={classes.link}
                  style={{ borderBottom: "solid 3px", paddingBottom: 7, borderRadius: 2 }}>
                  Patient
                </Link>
              </Typography>
              <Typography className={classes.navText} variant="h6" gutterBottom>
                <Link to={"/nurse-register"} className={classes.link}>
                  {" "}
                  Nurse
                </Link>
              </Typography>
              <Typography className={classes.navText} variant="h6" gutterBottom>
                <Link to={"/doctor-register"} className={classes.link}>
                  Doctor
                </Link>
              </Typography>
              <Grid container direction="row" className={classes.navBot}>
                <ArrowBackIosIcon fontSize="large"></ArrowBackIosIcon>
                <Typography variant="h5">
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
          style={{ height: "100%", marginLeft: "8%" }}>
          <Typography variant="h2" gutterBottom className={classes.title} style={{ marginBottom: "5%" }}>
            Register
          </Typography>

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
                <FormHelperText id="component-error-text">Phone number should not contain alphabets</FormHelperText>
              )}
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                maxDate={"04/15/2021"}
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
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <Button variant="text" size="large" className={clsx(classes.margin, classes.signInBtn)} color="primary">
                Sign in instead
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
                state.address.length == 0 ||
                !moment(state.dob).isValid()
              }
              onClick={() =>
                validateEmail(state.emailId) &&
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
                      true
                    ).then(async function (response) {
                      if (response.token) {
                        let assessmentData = await getPreviousAssessmentData();
                        history.push({
                          pathname: "/patient",
                          state: { detail: response, assessmentData: assessmentData },
                        });
                      } else window.alert(response.message);
                    })
                  : handleClickError()
              }>
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Resgisteration successful
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={4000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          Please complete the form and try again.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default PatientReg;

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
  link: {
    textDecoration: "none",
    color: "white",
    fontFamily: "product_sansregular",
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
    marginLeft: "20%",
    fontFamily: "product_sans_blackregular",
    // marginTop: '15%'
  },
  navBot: {
    color: "white",
    margin: "5%",
    marginLeft: "12%",
    marginTop: "50%",
    fontFamily: "product_sans_blackregular",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "62ch",
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
  textFieldTwo: {
    width: "30ch",
  },
}));
