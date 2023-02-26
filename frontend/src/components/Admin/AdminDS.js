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
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import Visibility from "@material-ui/icons/Visibility";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MenuItem from "@material-ui/core/MenuItem";
import { VictoryPie, VictoryLabel } from "victory";

import { postReviewAssessment, postScheduleAppointment, getListForReview, logout, getReport } from "../../api/Api";

import back from "../../assets/Images/Subtract.svg";
import pds1 from "../../assets/Images/pds1.png";
import list from "../../assets/Images/list.png";
const day = 30;
const month = 12;
const week = 4;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function createData(name, createdAt) {
  return { name, createdAt };
}
const currDate = moment(new Date()).format("YYYY-MM-DD");
// const nextDate = moment(currDate, "YYYY-MM-DD").add("days", 1).format("YYYY-MM-DD");
const AdminDS = ({ history }) => {
  const [state, setState] = React.useState({
    detail: history.location.state.detail,
    patientList: history.location.state.patientList,
    nurseList: history.location.state.nurseList,
    doctorList: history.location.state.doctorList,
    report: history.location.state.report,
    from: currDate,
    to: currDate,
    index: 0,
    selected: "daily",
  });
  const classes = useStyles();

  const fetchAPI = async () => {
    let response;
    response = await getReport(state.from, state.to);
    await setState({ ...state, report: response.count });
  };
  const [open, setOpen] = React.useState(false);

  const handleChangeFrom = (prop) => async (event) => {
    setState({ ...state, from: event.target.value });
    let response;
    response = await getReport(event.target.value, state.to);
    await setState({ ...state, from: event.target.value, report: response.count });
  };
  const handleChangeTo = (prop) => async (event) => {
    // let date = moment(event.target.value, "YYYY-MM-DD");
    await setState({ ...state, to: event.target.value });
    let response;
    response = await getReport(state.from, event.target.value);
    await setState({ ...state, to: event.target.value, report: response.count });
  };
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {}, [state.report]);

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
                    report: history.location.state.report,
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
                    report: history.location.state.report,
                  },
                }}
                className={classes.link}
                style={{ borderBottom: "solid 3px", paddingBottom: 7, borderRadius: 2 }}>
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
                    report: history.location.state.report,
                  },
                }}
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
                Hello, {state.detail.firstName}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#9296A6", marginTop: "-2%", fontSize: 19 }}
                className={classes.text}>
                Welcome to your personal dashboard! Here, You Can see the statistics of all users as well as can see
                analysitcs for number of appointments daily, weekly or montly.
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm={11}>
            <Typography style={{ fontSize: 28, fontFamily: "product_sansbold" }} gutterBottom className={classes.title}>
              User Statistics
            </Typography>
            <Grid
              container
              direction="row"
              style={{
                height: 550,
                backgroundColor: "#F2F6F8",
                borderRadius: 32,
                overflow: "scroll",
                padding: 40,
                // marginTop: 20,
              }}>
              <Grid item style={{ width: "50%" }}>
                <Grid container alignItems="center" direction="column">
                  <Grid container alignItems="center" style={{ width: "100%" }}>
                    <Grid item style={{ width: "50%", marginBottom: 10 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        style={{ color: "#3C4161", marginTop: "-2%", fontSize: 16 }}
                        className={classes.text}>
                        From:
                      </Typography>
                      <TextField
                        id="from"
                        type="date"
                        variant="filled"
                        InputProps={{
                          classes: {
                            input: classes.textDate,
                          },
                        }}
                        inputProps={{ min: "2021-02-01", max: state.to }}
                        value={state.from}
                        className={classes.textField}
                        onChange={handleChangeFrom()}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item style={{ width: "50%", marginBottom: 10 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        style={{ color: "#3C4161", marginTop: "-2%", fontSize: 16 }}
                        className={classes.text}>
                        To:
                      </Typography>
                      <TextField
                        id="to"
                        type="date"
                        variant="filled"
                        InputProps={{
                          classes: {
                            input: classes.textDate,
                          },
                        }}
                        inputProps={{ min: state.from, max: currDate }}
                        value={state.to}
                        className={classes.textField}
                        onChange={handleChangeTo()}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <VictoryPie
                      padAngle={({ datum }) => datum.y}
                      innerRadius={120}
                      colorScale={["#3C4161", "#3C76EF"]}
                      height={450}
                      width={700}
                      labelComponent={<VictoryLabel renderInPortal />}
                      // padding="10"
                      style={{
                        parent: { overflow: "visible" },
                        labels:
                          state.report > 0 && state.patientList.length != state.report
                            ? {
                                fontFamily: "product_sansregular",
                                fontSize: 19,
                                fill: "#9296A6",
                                padding: 40,
                              }
                            : { fontSize: 0 },
                      }}
                      data={[
                        { x: "assessment taken", y: state.report },
                        { x: "assessment not taken", y: state.patientList.length - state.report },
                      ]}
                    />
                  </Grid>
                  <Grid container justify="flex-end" alignItems="center" style={{ marginTop: 20 }}>
                    {/* <Typography
                      style={{
                        color: "#3C4161",
                        fontSize: 19,
                        fontFamily: "product_sansregular",
                        marginRight: 10,
                      }}
                      className={classes.listText}>
                      Currently seeing :
                    </Typography> */}
                    <Button
                      variant="contained"
                      size="large"
                      className={classes.loginBtn}
                      disableElevation
                      style={
                        state.selected == "daily"
                          ? {
                              color: "#3C4161",
                              backgroundColor: "white",
                              border: "1px solid #3C76EF",
                              borderLeft: "12px solid #3C76EF",
                              borderColor: "#3C76EF",
                            }
                          : { color: "#3C4161", backgroundColor: "white" }
                      }
                      onClick={async () => {
                        let response;
                        response = await getReport(currDate, currDate);
                        await setState({ ...state, report: response.count });
                        await setState({
                          ...state,
                          report: response.count,
                          selected: "daily",
                          from: currDate,
                          to: currDate,
                        });
                      }}>
                      Today
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      className={classes.loginBtn}
                      disableElevation
                      style={
                        state.selected == "weekly"
                          ? {
                              color: "#3C4161",
                              backgroundColor: "white",
                              border: "1px solid #3C76EF",
                              borderLeft: "12px solid #3C76EF",
                              borderColor: "#3C76EF",
                            }
                          : { color: "#3C4161", backgroundColor: "white" }
                      }
                      onClick={async () => {
                        let response;
                        let from = moment(currDate, "YYYY-MM-DD").subtract("days", 7).format("YYYY-MM-DD");
                        let to = currDate;
                        response = await getReport(from, to);
                        await setState({ ...state, report: response.count });
                        await setState({
                          ...state,
                          report: response.count,
                          selected: "weekly",
                          to: currDate,
                          from: moment(currDate, "YYYY-MM-DD").subtract("days", 7).format("YYYY-MM-DD"),
                        });
                      }}>
                      This Week
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      className={classes.loginBtn}
                      disableElevation
                      style={
                        state.selected == "monthly"
                          ? {
                              color: "#3C4161",
                              backgroundColor: "white",
                              border: "1px solid #3C76EF",
                              borderLeft: "12px solid #3C76EF",
                              borderColor: "#3C76EF",
                            }
                          : { color: "#3C4161", backgroundColor: "white" }
                      }
                      onClick={async () => {
                        let from = moment(currDate, "YYYY-MM-DD").subtract("months", 1).format("YYYY-MM-DD");
                        let to = currDate;
                        let response;
                        response = await getReport(from, to);
                        await setState({ ...state, report: response.count });
                        setState({
                          ...state,
                          report: response.count,
                          selected: "monthly",
                          to: currDate,
                          from: moment(currDate, "YYYY-MM-DD").subtract("months", 1).format("YYYY-MM-DD"),
                        });
                      }}>
                      This Month
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ width: "50%" }}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  style={{ padding: 20 }}
                  alignContent="center"
                  justify="center">
                  <Grid container direction="row" alignItems="center" justify="center">
                    <Grid
                      alignItems="center"
                      justify="center"
                      container
                      style={{
                        height: 90,
                        width: "75%",
                        backgroundColor: "white",
                        border: "4px solid #3C76EF",
                        margin: 20,
                        marginLeft: 0,
                        marginRight: 0,
                        borderRadius: 20,
                      }}>
                      <Typography
                        variant="h5"
                        className={classes.text}
                        style={{
                          textAlign: "center",
                          color: "#3C4161",
                          fontFamily: "product_sansbold",
                        }}>
                        Registered Patients
                      </Typography>
                      <Typography
                        variant="h2"
                        className={classes.text}
                        style={{
                          marginLeft: 40,
                          textAlign: "center",
                          color: "#3C4161",
                          fontFamily: "product_sansbold",
                        }}>
                        {state.patientList.length}
                      </Typography>
                    </Grid>
                    {/* <Grid
                      container
                      alignItems="center"
                      justify="center"
                      style={{
                        height: 83,
                        width: 90,
                        borderTop: "4px solid #3C76EF",
                        borderRight: "4px solid #3C76EF",
                        borderBottom: "4px solid #3C76EF",
                        borderLeft: "none",
                        // margin: 20,
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                      }}>
                      <Typography
                        variant="h4"
                        gutterBottom
                        className={classes.text}
                        style={{ padding: 20, textAlign: "center", color: "#3C4161", fontFamily: "product_sansbold" }}>
                        {state.patientList.length}
                      </Typography>
                    </Grid> */}
                  </Grid>
                  <Grid container direction="row" alignItems="center" justify="center">
                    <Grid
                      container
                      alignItems="center"
                      justify="center"
                      style={{
                        height: 83,
                        width: 90,
                        backgroundColor: "#3C4161",
                        marginLeft: 18,
                        borderTopLeftRadius: 15,
                        borderBottomLeftRadius: 15,
                      }}>
                      <Typography
                        variant="h2"
                        className={classes.text}
                        style={{ textAlign: "center", color: "white", fontFamily: "product_sansbold" }}>
                        {state.report}
                      </Typography>
                    </Grid>
                    <Grid
                      alignItems="center"
                      justify="center"
                      container
                      style={{
                        height: 110,
                        width: "55%",
                        backgroundColor: "white",
                        margin: 20,
                        marginLeft: 0,
                        borderRadius: 20,
                      }}>
                      <Typography
                        variant="h5"
                        className={classes.text}
                        style={{
                          textAlign: "center",
                          color: "#3C4161",
                          fontFamily: "product_sansregular",
                        }}>
                        Patients who took Self-assessment
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" alignItems="center" justify="center">
                    <Grid
                      alignItems="center"
                      justify="center"
                      container
                      style={{
                        height: 110,
                        width: "55%",
                        backgroundColor: "white",
                        margin: 20,
                        marginRight: 0,
                        borderRadius: 20,
                      }}>
                      <Typography
                        variant="h5"
                        className={classes.text}
                        style={{
                          textAlign: "center",
                          color: "#3C4161",
                          fontFamily: "product_sansregular",
                        }}>
                        Patients who have not taken assessment
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      alignItems="center"
                      justify="center"
                      style={{
                        height: 83,
                        width: 90,
                        backgroundColor: "#3C76EF",
                        // margin: 20,
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                      }}>
                      <Typography
                        variant="h2"
                        className={classes.text}
                        style={{ textAlign: "center", color: "white", fontFamily: "product_sansbold" }}>
                        {state.patientList.length - state.report}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Appointment has been successfully forwarded to a Doctor.
        </Alert>
      </Snackbar>
      <Snackbar open={openTwo} autoHideDuration={4000} onClose={handleCloseTwo}>
        <Alert onClose={handleCloseTwo} severity="success">
          Appointment has been successfully rejected and the patient will be notified.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AdminDS;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textDate: {
    textAlign: "center",
    fontFamily: "product_sansbold",
    height: 10,
    color: "white",
    border: "none",
    borderBottom: "none",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#364161",
    letterSpacing: 0.5,
    lineHeight: 1.3,
    fontSize: 18,
  },
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
    marginTop: "50%",
    fontFamily: "product_sans_blackregular",
  },
  loginBtn: {
    backgroundColor: "#3C4161",
    color: "white",
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "product_sansregular",
    fontSize: 18,
    borderRadius: 10,
    height: 40,
    horizontalPadding: 20,
    width: 150,
    marginRight: 20,
  },
  loginBtn2: {
    // backgroundColor: '#3C76EF',
    color: "#3c4161",
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "product_sansregular",
    width: "25%",
    marginTop: "5%",
    fontSize: 16,
    borderColor: "#3c4161",
    borderWidth: 2,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "25ch",

    // margin:20
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
