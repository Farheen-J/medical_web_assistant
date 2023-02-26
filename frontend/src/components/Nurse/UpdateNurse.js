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
import line from "../../assets/Images/navline.png";
import FormHelperText from "@material-ui/core/FormHelperText";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import back from "../../assets/Images/Subtract.svg";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import { updateNurse, getListForReview, logout } from "../../api/Api";

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
const UpdateNurse = ({ history }) => {
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
    detail: history.location.state.detail,
    firstName: history.location.state.detail.firstName,
    lastName: history.location.state.detail.lastName,

    emailId: history.location.state.detail.email,
    // password: history.location.state.detail.lastName,
    phoneNum: history.location.state.detail.phone,
    dob: history.location.state.detail.dateOfBirth,
    address: history.location.state.detail.address,
    patientData: history.location.state.patientData,
    patientList: history.location.state.patientList,
    appointmentList: history.location.state.appointmentList,
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
                  pathname: "/nurse",
                  state: {
                    detail: state.detail,
                    patientData: state.patientData,
                    patientList: state.patientList,
                    appointmentList: state.appointmentList,
                  },
                }}
                style={{ textDecoration: "none", color: "white" }}>
                CDC
              </Link>
            </Typography>

            <Typography style={{ marginTop: "25%" }} className={classes.navText} variant="h6" gutterBottom>
              <Link
                to={{
                  pathname: "/nurse",
                  state: {
                    detail: state.detail,
                    patientData: state.patientData,
                    patientList: state.patientList,
                    appointmentList: state.appointmentList,
                  },
                }}
                className={classes.link}
                style={{}}>
                Dashboard
              </Link>
            </Typography>
            <Typography className={classes.navText} variant="h6" gutterBottom>
              <Link
                to={{
                  pathname: "/upcoming-appointment",
                  state: {
                    detail: state.detail,
                    patientData: state.patientData,
                    patientList: state.patientList,
                    appointmentList: state.appointmentList,
                  },
                }}
                className={classes.link}>
                Appointments
              </Link>
            </Typography>
            <Typography className={classes.navText} variant="h6" gutterBottom>
              <Link
                to={{
                  pathname: "/Patient-list",
                  state: {
                    detail: state.detail,
                    patientData: state.patientData,
                    patientList: state.patientList,
                    appointmentList: state.appointmentList,
                  },
                }}
                className={classes.link}>
                List of patients
              </Link>
            </Typography>

            <Typography className={classes.navText} variant="h6" gutterBottom>
              <Link
                to={{
                  pathname: "/update-nurse",
                  state: {
                    detail: state.detail,
                    patientData: state.patientData,
                    patientList: state.patientList,
                    appointmentList: state.appointmentList,
                  },
                }}
                style={{
                  borderBottom: "solid 3px",
                  paddingBottom: 7,
                  borderRadius: 2,
                  textDecoration: "none",
                  color: "white",
                }}
                className={classes.link}>
                Personal details
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

      <Grid item sm={6}>
        <Typography variant="h2" className={classes.title} style={{ marginTop: "6%", marginLeft: "-6%" }}>
          Hello, {state.firstName}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "#9296A6", marginLeft: "-5.5%" }}
          className={classes.text}>
          Here, you can update your personal information.
        </Typography>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "70%", marginLeft: "8%" }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginBottom: 10 }}
            error={!validateName(state.firstName)}>
            <FormControl className={clsx(classes.margin, classes.textFieldTwo)} variant="outlined">
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
                <FormHelperText id="component-error-text">Name cannot contain numbers</FormHelperText>
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
                <FormHelperText id="component-error-text">Name cannot contain numbers</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            style={{ marginBottom: 20 }}
            error={!validateEmail(state.emailId)}>
            <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>
              Email Address
            </InputLabel>
            <OutlinedInput
              // id="outlined-adornment-password"
              type="text"
              value={state.emailId}
              onChange={handleChange("emailId")}
              labelWidth={105}
            />
            {!validateEmail(state.emailId) && (
              <FormHelperText id="component-error-text">Please check email format</FormHelperText>
            )}
          </FormControl>
          {/* <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={state.showPassword ? 'text' : 'password'}
                            value={state.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl> */}
          <Grid container direction="row" justify="center" alignItems="center" style={{ marginBottom: 10 }}>
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
                className={clsx(classes.margin, classes.textFieldTwo)}
                disableToolbar
                // inputVariant='outlined'
                variant="inline"
                format="MM/dd/yyyy"
                // margin="normal"
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
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: "#F2F6F8", color: "#3C4161" }}
              className={clsx(classes.margin, classes.registerBtn)}
              onClick={() =>
                history.push({
                  pathname: "/nurse",
                  state: {
                    detail: state.detail,
                    patientData: state.patientData,
                    patientList: state.patientList,
                    appointmentList: state.appointmentList,
                  },
                })
              }>
              Cancel
            </Button>

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
                state.address.length == 0
              }
              onClick={() =>
                validateEmail(state.emailId) &&
                validateName(state.firstName) &&
                validateName(state.lastName) &&
                validateNum(state.phoneNum)
                  ? updateNurse(
                      state.emailId,
                      state.firstName,
                      state.lastName,
                      state.dob,
                      state.phoneNum,
                      state.address
                    ).then(async function (response) {
                      if (response.token) {
                        handleClick();
                        let patientData = await getListForReview();
                        setState({ ...state, detail: response, patientData });
                      } else window.alert(response.message);
                    })
                  : handleClickError()
              }>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Profile updated successfully.
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={4000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          Please check your email and try again.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default UpdateNurse;

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
    fontFamily: "product_sansbold",
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
    // marginTop: '15%'
  },
  navBot: {
    color: "white",
    margin: "5%",
    marginLeft: "15%",
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
    paddingHorizontal: "8%",
    paddingTop: "2%",
    paddingBottom: "2%",
    width: "25%",
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
