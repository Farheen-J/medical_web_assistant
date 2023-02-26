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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Visibility from "@material-ui/icons/Visibility";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { deleteUser, postScheduleAppointment, getListForReview, logout, getReport } from "../../api/Api";

import back from "../../assets/Images/Subtract.svg";
import pds1 from "../../assets/Images/pds1.png";
import list from "../../assets/Images/list.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserListAdmin = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [state, setState] = React.useState({
    detail: history.location.state.detail,
    patientList: history.location.state.patientList,
    nurseList: history.location.state.nurseList,
    doctorList: history.location.state.doctorList,
    report: history.location.state.report,
    selected: "patient",
    index: 0,
  });
  const deletUser = () => {
    deleteUser(
      state.selected == "patient"
        ? state.patientList[state.index]._id
        : state.selected == "nurse"
        ? state.nurseList[state.index]._id
        : state.doctorList[state.index]._id
    ).then(async function (response) {
      if (response.success == true) {
        if (state.selected == "patient") {
          let from = moment(new Date()).format("YYYY-MM-DD");
          let report = await getReport(from, from);
          let tempList = state.patientList;
          tempList.splice(state.index, 1);
          setState({
            ...state,
            report: report.count,
            patientList: tempList,
          });
        } else if (state.selected == "nurse") {
          let tempList = state.nurseList;
          tempList.splice(state.index, 1);
          setState({
            ...state,
            nurseList: tempList,
          });
        } else {
          let tempList = state.doctorList;
          tempList.splice(state.index, 1);
          setState({
            ...state,
            doctorList: tempList,
          });
        }
        handleClick();
      }
    });
    setOpenDialog(false);
  };
  const handleClickOpenDialog = async (index) => {
    setOpenDialog(true);
    await setState({ ...state, index });
  };

  const handleCloseDialogTrue = () => {
    setOpenDialog(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setState({ ...state });
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
                className={classes.link}
                style={{
                  borderBottom: "solid 3px",
                  paddingBottom: 7,
                  borderRadius: 2,
                }}>
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
          <Grid item sm={11} style={{ height: 650 }}>
            <Typography variant="h2" gutterBottom className={classes.title}>
              Registered Users
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "#9296A6", marginTop: "-2%", fontSize: 19 }}
              className={classes.text}>
              Here, You can view the details of the registered users and also add or remove a user.
            </Typography>
            <Grid
              container
              direction="row"
              style={{
                width: 1270,
                height: 700,
                backgroundColor: "#F2F6F8",
                borderRadius: 32,
                // overflow: "scroll",
                padding: 40,
                marginTop: 20,
              }}>
              <Grid item sm={3}>
                <Button
                  variant="contained"
                  size="large"
                  disableElevation
                  color="primary"
                  style={{ width: 200 }}
                  className={classes.loginBtn}
                  onClick={() =>
                    history.push({
                      pathname: "/add-user",
                      state: {
                        detail: state.detail,
                        patientList: state.patientList,
                        doctorList: state.doctorList,
                        nurseList: state.nurseList,
                        report: state.report,
                      },
                    })
                  }>
                  Add a new user
                </Button>
              </Grid>
              <Grid item sm={9}>
                <Grid container justify="flex-end" alignItems="center" style={{ marginBottom: 20 }}>
                  <Typography
                    style={{
                      color: "#3C4161",
                      fontSize: 19,
                      fontFamily: "product_sansregular",
                      marginRight: 10,
                    }}
                    className={classes.listText}>
                    Currently seeing :
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    className={classes.loginBtn}
                    disableElevation
                    style={
                      state.selected == "patient"
                        ? {
                            color: "#3C4161",
                            backgroundColor: "white",
                            border: "1px solid #3C76EF",
                            borderLeft: "12px solid #3C76EF",
                            borderColor: "#3C76EF",
                          }
                        : { color: "#3C4161", backgroundColor: "white" }
                    }
                    onClick={() => setState({ ...state, selected: "patient" })}>
                    Patients
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    className={classes.loginBtn}
                    disableElevation
                    style={
                      state.selected == "nurse"
                        ? {
                            color: "#3C4161",
                            backgroundColor: "white",
                            border: "1px solid #3C76EF",
                            borderLeft: "12px solid #3C76EF",
                            borderColor: "#3C76EF",
                          }
                        : { color: "#3C4161", backgroundColor: "white" }
                    }
                    onClick={() => setState({ ...state, selected: "nurse" })}>
                    Nurses
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    className={classes.loginBtn}
                    disableElevation
                    style={
                      state.selected == "doctor"
                        ? {
                            color: "#3C4161",
                            backgroundColor: "white",
                            border: "1px solid #3C76EF",
                            borderLeft: "12px solid #3C76EF",
                            borderColor: "#3C76EF",
                          }
                        : { color: "#3C4161", backgroundColor: "white" }
                    }
                    onClick={() => setState({ ...state, selected: "doctor" })}>
                    Doctors
                  </Button>
                </Grid>
              </Grid>
              {state.selected == "patient" && state.patientList.length == 0 ? (
                <Typography
                  style={{ color: "#3C4161", fontSize: 32, textAlign: "center" }}
                  className={classes.listText}>
                  No users have registered yet.
                </Typography>
              ) : (
                state.selected == "patient" && (
                  <Grid item sm={12} style={{ height: "100%" }}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      style={{ backgroundColor: "#F2F6F8", borderRadius: 30 }}>
                      <TableContainer
                        component={Paper}
                        elevation={0}
                        style={{ borderRadius: 15, margin: 5, height: 560 }}>
                        <Table
                          stickyHeader
                          className={classes.table}
                          style={{ backgroundColor: "transparent" }}
                          size="medium"
                          aria-label="a dense table">
                          <TableHead>
                            <TableRow style={{ backgroundColor: "#F2F6F8", borderRadius: 10 }}>
                              <TableCell style={{ fontFamily: "product_sansbold" }} className={classes.tableText}>
                                Name
                              </TableCell>
                              <TableCell
                                width="13%"
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Birth Date
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Email ID
                              </TableCell>
                              <TableCell
                                // width="15%"
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Phone
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Address
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {state.patientList.map((row, index) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row" className={classes.tableText}>
                                  {row.firstName + " " + row.lastName}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  {moment(row.dateOfBirth).format("DD-MM-YYYY")}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  {row.email}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  {row.phone}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  {row.address}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  <Button
                                    variant="contained"
                                    size="large"
                                    disableElevation
                                    color="primary"
                                    style={{ width: 120, backgroundColor: "#F72626", fontSize: 14 }}
                                    className={classes.loginBtn}
                                    onClick={() => {
                                      handleClickOpenDialog(index);
                                    }}>
                                    Delete User
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                )
              )}
              {state.selected == "nurse" && state.nurseList.length == 0 ? (
                <Typography
                  style={{ color: "#3C4161", fontSize: 32, textAlign: "center" }}
                  className={classes.listText}>
                  No users have registered yet.
                </Typography>
              ) : (
                state.selected == "nurse" && (
                  <Grid item sm={12} style={{ height: "100%" }}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      style={{ backgroundColor: "#F2F6F8", borderRadius: 30 }}>
                      <TableContainer
                        component={Paper}
                        elevation={0}
                        style={{ borderRadius: 15, margin: 5, height: 560 }}>
                        <Table
                          stickyHeader
                          className={classes.table}
                          style={{ backgroundColor: "transparent" }}
                          size="medium"
                          aria-label="a dense table">
                          <TableHead>
                            <TableRow style={{ backgroundColor: "#F2F6F8", borderRadius: 10 }}>
                              <TableCell style={{ fontFamily: "product_sansbold" }} className={classes.tableText}>
                                Registration
                              </TableCell>
                              <TableCell style={{ fontFamily: "product_sansbold" }} className={classes.tableText}>
                                Name
                              </TableCell>
                              <TableCell
                                width="13%"
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Birth Date
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Email ID
                              </TableCell>
                              <TableCell
                                // width="15%"
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Phone
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Address
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {state.nurseList.map((row, index) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row" className={classes.tableText}>
                                  {row.registrationNum}
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.tableText}>
                                  {row.firstName + " " + row.lastName}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  {moment(row.dateOfBirth).format("DD-MM-YYYY")}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  {row.email}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  {row.phone}
                                </TableCell>
                                <TableCell align="left" className={classes.tableText}>
                                  {row.address}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  <Button
                                    variant="contained"
                                    size="large"
                                    disableElevation
                                    color="primary"
                                    style={{ width: 110, backgroundColor: "#F72626", fontSize: 12 }}
                                    className={classes.loginBtn}
                                    onClick={() => {
                                      handleClickOpenDialog(index);
                                    }}>
                                    Delete User
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                )
              )}
              {state.selected == "doctor" && state.doctorList.length == 0 ? (
                <Typography
                  style={{ color: "#3C4161", fontSize: 32, textAlign: "center" }}
                  className={classes.listText}>
                  No users have registered yet.
                </Typography>
              ) : (
                state.selected == "doctor" && (
                  <Grid item sm={12} style={{ height: "100%" }}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      style={{ backgroundColor: "#F2F6F8", borderRadius: 30 }}>
                      <TableContainer
                        component={Paper}
                        elevation={0}
                        style={{ borderRadius: 15, margin: 5, height: 560 }}>
                        <Table
                          stickyHeader
                          className={classes.table}
                          style={{ backgroundColor: "transparent" }}
                          size="medium"
                          aria-label="a dense table">
                          <TableHead>
                            <TableRow style={{ backgroundColor: "#F2F6F8", borderRadius: 10 }}>
                              <TableCell style={{ fontFamily: "product_sansbold" }} className={classes.tableText}>
                                Registration
                              </TableCell>
                              <TableCell style={{ fontFamily: "product_sansbold" }} className={classes.tableText}>
                                Name
                              </TableCell>
                              <TableCell
                                width="13%"
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Birth Date
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Email ID
                              </TableCell>
                              <TableCell
                                // width="15%"
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Phone
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}>
                                Address
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontFamily: "product_sansbold" }}
                                className={classes.tableText}></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {state.doctorList.map((row, index) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row" className={classes.tableText}>
                                  {row.registrationNum}
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.tableText}>
                                  {row.firstName + " " + row.lastName}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  {moment(row.dateOfBirth).format("DD-MM-YYYY")}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  {row.email}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  {row.phone}
                                </TableCell>
                                <TableCell align="left" className={classes.tableText}>
                                  {row.address}
                                </TableCell>
                                <TableCell align="right" className={classes.tableText}>
                                  <Button
                                    variant="contained"
                                    size="large"
                                    disableElevation
                                    color="primary"
                                    style={{ width: 110, backgroundColor: "#F72626", fontSize: 12 }}
                                    className={classes.loginBtn}
                                    onClick={() => {
                                      handleClickOpenDialog(index);
                                    }}>
                                    Delete User
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleClickOpenDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to permanently delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deletUser} color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      {/* //snackbar */}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          User has been successfully deleted.
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

export default UserListAdmin;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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
  text: {
    fontFamily: "product_sans_lightregular",
    letterSpacing: 0.5,
    lineHeight: 1.3,
  },
  listText: {
    fontFamily: "product_sansregular",
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
    textAlign: "left",
    fontFamily: "product_sansregular",
  },
  table: {
    mixWidth: 500,
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
