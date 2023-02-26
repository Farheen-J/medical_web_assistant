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
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import Visibility from "@material-ui/icons/Visibility";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import {
  postReviewAssessmentByDr,
  getForwardedAssessmentData,
  postScheduleAppointmentByDr,
  getAppointmentListDr,
} from "../../api/Api";

import back from "../../assets/Images/Subtract.svg";
import pds1 from "../../assets/Images/pds1.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const AppointmentSchedulerDoctor = ({ history }) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClickError = () => {
    setError(true);
  };

  const handleClose = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);

    let patientData = await getForwardedAssessmentData();
    let appointmentList = await getAppointmentListDr();
    history.push({
      pathname: "/doctor",
      state: {
        detail: state.detail,
        patientData,
        patientList: state.patientList,
        appointmentList,
      },
    });
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };
  const classes = useStyles();
  const [state, setState] = React.useState({
    date: moment(Date.now()).format("YYYY-MM-DDTHH:mm"),
    detail: history.location.state.detail,
    patientData: history.location.state.patientData,
    patientList: history.location.state.patientList,
    appointmentList: history.location.state.appointmentList,
  });
  const handleChange = (prop) => (event) => {
    setState({ ...state, date: event.target.value });
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
              <Link to={"/"} className={classes.link} style={{ textDecoration: "none", color: "white" }}>
                CDC
              </Link>
            </Typography>
            <Typography style={{ marginTop: "30%" }} className={classes.navText} variant="h6" gutterBottom>
              <Link
                to={{
                  pathname: "/doctor",
                  state: {
                    detail: history.location.state.detail,
                    patientData: state.patientList,
                    patientList: state.patientList,
                    appointmentList: state.appointmentList,
                  },
                }}
                className={classes.link}>
                Dashboard
              </Link>
            </Typography>
            <Typography className={classes.navText} variant="h6" gutterBottom>
              <Link
                to={{
                  pathname: "/upcoming-appointment-doc",
                  state: {
                    detail: history.location.state.detail,
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
                  pathname: "/patient-list-doc",
                  state: {
                    detail: history.location.state.detail,
                    patientData: state.patientList,
                    patientList: state.patientList,
                    appointmentList: state.appointmentList,
                  },
                }}
                className={classes.link}>
                List of patients
              </Link>
            </Typography>

            <Typography className={classes.navBot} variant="h6" gutterBottom>
              <Link to={"/"} className={classes.link} style={{ color: "white" }}>
                Logout
              </Link>
            </Typography>
          </Grid>
        </div>
      </Grid>

      <Grid item sm={9} style={{ marginLeft: "-3%", width: "100%", height: "95%", marginTop: "1.5%" }}>
        <Grid container direction="row" style={{ marginTop: "4%", height: "80%" }}>
          <Grid item sm={7} style={{ height: "10%" }}>
            <Typography
              gutterBottom
              style={{ fontSize: 40, fontFamily: "product_sans_lightregular", letterSpacing: 1, color: "#364161" }}
              className={classes.text}>
              Schedule An Appointment for
            </Typography>
          </Grid>
          <Grid item sm={7} style={{ marginTop: "-1%", height: "10%" }}>
            <Typography variant="h2" gutterBottom className={classes.title}>
              {history.location.state.name}
            </Typography>
          </Grid>
          <Grid item sm={11} style={{ height: 657, marginTop: "5%" }}>
            <Grid
              container
              justify="space-evenly"
              alignItems="center"
              direction="column"
              style={{ height: "70%", backgroundColor: "#F2F6F8", borderRadius: 30, padding: 40 }}>
              <Typography variant="h5" gutterBottom className={classes.text}>
                Here, You can schedule an appointment of patient with you on the specific and date and time. Patient
                will be notified once the appointment is scheduled.
              </Typography>

              <TextField
                id="date"
                type="datetime-local"
                variant="outlined"
                InputProps={{
                  classes: {
                    input: classes.textDate,
                  },
                }}
                inputProps={{ min: moment(Date.now()).format("YYYY-MM-DDTHH:mm") }}
                value={state.date}
                className={classes.textField}
                onChange={handleChange()}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                variant="outlined"
                size="large"
                className={clsx(classes.margin, classes.loginBtn)}
                disableElevation
                style={{
                  textTransform: " none",
                  boxShadow: "none",
                  width: "30%",
                  backgroundColor: "#3C4161",
                  color: "white",
                  borderRadius: 10,
                  marginTop: 30,
                }}
                onClick={() =>
                  postScheduleAppointmentByDr(state.date, history.location.state.id).then(async function (response) {
                    if (response.message == true) {
                      let isReviewed = await postReviewAssessmentByDr(false, true, history.location.state.id);
                      handleClick();
                    } else handleClickError();
                  })
                }
                color="primary">
                Schedule an appointment
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Appointment has been successfully scheduled
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={4000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="warning">
          Appointment could not be scheduled, Please try again.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AppointmentSchedulerDoctor;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  text: {
    fontFamily: "product_sansbold",
    color: "#364161",
    letterSpacing: 0.5,
    lineHeight: 1.3,
  },
  textDate: {
    fontFamily: "product_sansbold",
    color: "#364161",
    letterSpacing: 0.5,
    lineHeight: 1.3,
    fontSize: 19,
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
  description: {
    color: "#000000",
    fontSize: 18,
    marginHorizontal: 20,
    fontFamily: "product_sans_lightregular",
  },
  tableText: {
    textTransform: "capitalize",
    color: "#3C4161",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "product_sansregular",
  },
  table: {
    mixWidth: 450,
  },
  paper: {
    height: 230,
    width: 230,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F6F8",
    boxShadow: "none",
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
    marginTop: "70%",
    fontFamily: "product_sans_blackregular",
  },
  loginBtn: {
    // backgroundColor: '#3C76EF',
    color: "#3c4161",
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "product_sansbold",
    width: "25%",
    marginTop: "5%",
    fontSize: 19,
    letterSpacing: 0.4,
    borderColor: "#3c4161",
    borderWidth: 2,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "50ch",
  },
  cardTitle: {
    marginTop: "8%",
    color: "#3C4161",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "product_sans_blackregular",
  },
  cardText: {
    color: "#3C4161",
    textAlign: "center",
    marginTop: "2%",
    fontFamily: "product_sansregular",
  },
}));
