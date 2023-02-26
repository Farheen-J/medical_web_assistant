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
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import moment from "moment";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import Visibility from "@material-ui/icons/Visibility";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { getPreviousAssessmentData, logout, cancelAppointment } from "../../api/Api";

import back from "../../assets/Images/Subtract.svg";
import pds1 from "../../assets/Images/pds1.png";
import pds2 from "../../assets/Images/pds2.png";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const PatientDS = ({ history }) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    firstName: history.location.state.detail.firstName,
    lastName: history.location.state.detail.lastName,
    dob: history.location.state.detail.dateOfBirth,
    assessmentData: history.location.state.assessmentData,
    index: 1,
  });

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
                  pathname: "/patient",
                  state: { detail: history.location.state.detail, assessmentData: state.assessmentData },
                }}
                style={{ textDecoration: "none", color: "white" }}>
                CDC
              </Link>
            </Typography>

            <Typography style={{ marginTop: "30%" }} className={classes.navText} variant="h6" gutterBottom>
              <Link
                to={{
                  pathname: "/patient",
                  state: { detail: history.location.state.detail, assessmentData: state.assessmentData },
                }}
                className={classes.link}
                style={{ borderBottom: "solid 3px", paddingBottom: 7, borderRadius: 2 }}>
                Dashboard
              </Link>
            </Typography>

            {state.assessmentData.length > 0 &&
              state.assessmentData[0].isReviewed != false &&
              state.assessmentData[0].appointment.length == 0 && (
                <Typography className={classes.navText} variant="h6" gutterBottom>
                  <Link
                    to={{
                      pathname: "/Self-assessment",
                      state: { detail: history.location.state.detail, assessmentData: state.assessmentData },
                    }}
                    className={classes.link}>
                    Take self assessment
                  </Link>
                </Typography>
              )}

            <Typography className={classes.navText} variant="h6" gutterBottom>
              <Link
                to={{
                  pathname: "/update-patient",
                  state: { detail: history.location.state.detail, assessmentData: state.assessmentData },
                }}
                style={{ textDecoration: "none", color: "white" }}
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

      <Grid item sm={9} style={{ marginLeft: "-3%", width: "100%" }}>
        <Grid container direction="row" style={{ marginTop: "4%", height: 900 }}>
          <Grid item sm={7} style={{ height: "10%" }}>
            <Grid container direction="row">
              <Typography variant="h2" className={classes.title}>
                Hello, {state.firstName}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ color: "#9296A6" }} className={classes.text}>
                Welcome to your personal dashboard! Here, you can see your scheduled appointmet, cancel that appointment
                and take self assessment for covid-19 symptoms.
              </Typography>
            </Grid>
          </Grid>

          {state.assessmentData.length > 0 &&
          "appointment" in state.assessmentData[0] &&
          state.assessmentData[0].appointment.length > 0 ? (
            <Grid item sm={11} style={{ height: "40%", marginTop: "3%" }}>
              <Grid
                container
                justify="flex-start"
                alignContent="center"
                direction="row"
                style={{
                  backgroundImage: `url(${pds1})`,
                  backgroundRepeat: "no-repeat",
                  height: "100%",
                  width: "100%",
                }}>
                <Typography
                  style={{
                    maxWidth: "60%",
                    fontWeight: "bold",
                    fontSize: 28,
                    // lineHeight: 46,
                    fontFamily: "product_sansbold",
                    margin: 20,
                    marginLeft: "5%",
                    letterSpacing: "0.01em",
                    overflow: "visible",
                    color: "#3C4161",
                  }}>
                  Hey, You have got an appointment with{" "}
                  {state.assessmentData[0].appointment[0].doctorName ||
                    state.assessmentData[0].appointment[0].nurseName}{" "}
                  on
                  {moment(state.assessmentData[0].appointment[0].scheduledAt).format(" Do MMMM, YYYY hh:mm A")}
                </Typography>
                <Grid container>
                  <Button
                    variant="outlined"
                    size="large"
                    className={clsx(classes.margin, classes.loginBtn)}
                    style={{ borderRadius: 10, boxShadow: "none", marginLeft: "15%", width: "25%" }}
                    color="primary"
                    onClick={() =>
                      cancelAppointment(state.assessmentData[0].appointment[0]._id).then(async function (response) {
                        let assessmentData = await getPreviousAssessmentData();
                        setState({ ...state, assessmentData: assessmentData });
                      })
                    }>
                    Cancel appointment
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item sm={11} style={{ height: "40%", marginBottom: "5%" }}>
              <Grid
                container
                justify="flex-start"
                alignContent="center"
                direction="row"
                style={{
                  backgroundImage: `url(${pds2})`,
                  backgroundRepeat: "no-repeat",
                  height: "100%",
                  width: "100%",
                }}>
                <Typography
                  style={{
                    maxWidth: "60%",
                    fontWeight: "bold",
                    fontSize: 28,
                    // lineHeight: 46,
                    fontFamily: "product_sansbold",
                    margin: 20,
                    marginTop: "10%",
                    marginLeft: "5%",
                    letterSpacing: "0.01em",
                    overflow: "visible",
                    color: "#3C4161",
                  }}>
                  {state.assessmentData.length > 0 && state.assessmentData[0].isReviewed == false
                    ? "Please wait for the assessment to be reviewed"
                    : "Take COVID-19 symptoms self assessment"}
                </Typography>
                <Grid container>
                  <Button
                    variant="contained"
                    size="large"
                    className={clsx(classes.margin, classes.loginBtn)}
                    disabled={state.assessmentData.length > 0 && state.assessmentData[0].isReviewed == false}
                    style={
                      state.assessmentData.length > 0 && state.assessmentData[0].isReviewed == false
                        ? {
                            borderRadius: 10,
                            boxShadow: "none",
                            marginLeft: "15%",
                            width: "25%",
                            backgroundColor: "#8e8e8e",
                            color: "white",
                          }
                        : {
                            borderRadius: 10,
                            boxShadow: "none",
                            marginLeft: "15%",
                            width: "25%",
                            backgroundColor: "#3C4161",
                            color: "white",
                          }
                    }
                    onClick={() =>
                      history.push({
                        pathname: "/Self-assessment",
                        state: { detail: history.location.state.detail, assessmentData: state.assessmentData },
                      })
                    }>
                    Take Self Assessment
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item sm={10} style={{ height: "40%", marginTop: "-4%" }}>
            <Typography variant="h5" gutterBottom className={classes.title}>
              Previous Assessments
            </Typography>
            <Grid container justify="space-evenly" alignItems="center">
              {/* {state.assessmentData.length > 0 &&
                                <ArrowLeftIcon fontSize='large' />} */}
              {state.assessmentData.length > 0 ? (
                state.assessmentData.map((data, index) =>
                  index < 4 ? (
                    <Card className={classes.paper}>
                      <CardContent style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="body2" style={{ marginTop: "15%" }} className={classes.cardText}>
                          Assessment taken on
                        </Typography>
                        <Typography variant="body1" className={classes.cardTitle}>
                          {moment(data.createdAt).utc().format("DD-MMMM-YYYY")}
                        </Typography>
                        <Typography variant="body2" className={classes.cardText} style={{ marginTop: "15%" }}>
                          Result
                        </Typography>
                        <Typography variant="body1" className={classes.cardTitle}>
                          {data.isReviewed == false
                            ? "Pending"
                            : data.isForwarded
                            ? "Pending"
                            : data.isRejected
                            ? "No signs of concern"
                            : data.appointment.length == 0
                            ? "Appointment Cancelled"
                            : "Appointment scheduled"}
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : null
                )
              ) : (
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ color: "#9296A6", marginTop: "5%" }}
                  className={classes.text}>
                  You do not have any previous assessments, start by clicking on 'Take self assessment'.
                </Typography>
              )}
              {/* {state.assessmentData.length > 0 &&
                                <ArrowRightIcon fontSize='large' />
                            } */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PatientDS;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  text: {
    fontFamily: "product_sans_lightregular",
    letterSpacing: "2%",
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
  paper: {
    marginTop: "1%",
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
    marginLeft: "12%",
    fontFamily: "product_sansbold",
  },
  navBot: {
    color: "white",
    margin: "5%",
    marginLeft: "15%",
    marginTop: "60%",
    fontFamily: "product_sans_blackregular",
  },
  loginBtn: {
    // backgroundColor: '#3C76EF',
    color: "#3c4161",
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "product_sansregular",
    width: "25%",
    marginTop: "5%",
    fontSize: 19,
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
    marginTop: "1%",
    color: "#3C4161",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "product_sans_blackregular",
    fontSize: 19,
  },
  cardText: {
    color: "#3c4161",
    textAlign: "center",
    marginTop: "2%",
    fontSize: 18,
    fontFamily: "product_sans_lightregular",
  },
}));
