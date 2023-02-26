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

import Visibility from "@material-ui/icons/Visibility";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { getPatientList, logout, getPatientListForDr } from "../../api/Api";

import back from "../../assets/Images/Subtract.svg";
import pds1 from "../../assets/Images/pds1.png";

function createData(name, dateOfBirth, email, phone, address) {
  return { name, dateOfBirth, email, phone, address };
}
const PatientList = ({ history }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    detail: history.location.state.detail,
    patientData: history.location.state.patientData,
    patientList: history.location.state.patientList,
    appointmentList: history.location.state.appointmentList,
  });
  const fetchMyAPI = async () => {
    let response;
    response = await getPatientList();
    await setState({ ...state, patientList: response });
  };
  // useEffect(() => {
  //   fetchMyAPI();
  // }, []);
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
                        detail: history.location.state.detail,
                        patientData: state.patientData,
                        patientList: state.patientList,
                        appointmentList: state.appointmentList,
                      },
                    }}
                    className={classes.link}>
                    CDC
                  </Link>
                </Typography>

                <Typography style={{ marginTop: "25%" }} className={classes.navText} variant="h6" gutterBottom>
                  <Link
                    to={{
                      pathname: "/nurse",
                      state: {
                        detail: history.location.state.detail,
                        patientData: state.patientData,
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
                      pathname: "/upcoming-appointment",
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
                      pathname: "/Patient-list",
                      state: {
                        detail: history.location.state.detail,
                        patientData: state.patientData,
                        patientList: state.patientList,
                        appointmentList: state.appointmentList,
                      },
                    }}
                    className={classes.link}
                    style={{ borderBottom: "solid 3px", paddingBottom: 7, borderRadius: 2 }}>
                    List of patients
                  </Link>
                </Typography>

                <Typography className={classes.navText} variant="h6" gutterBottom>
                  <Link
                    to={{
                      pathname: "/update-nurse",
                      state: {
                        detail: history.location.state.detail,
                        patientData: state.patientData,
                        patientList: state.patientList,
                        appointmentList: state.appointmentList,
                      },
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
        </div>
      </Grid>

      <Grid item sm={9} style={{ marginLeft: "-3%", width: "100%" }}>
        <Grid container direction="row" style={{ marginTop: "4%", height: "80%" }}>
          <Grid item sm={7} style={{ height: "10%" }}>
            <Typography variant="h3" gutterBottom className={classes.title}>
              List of patients
            </Typography>
          </Grid>
          {/* <Grid item sm={7} style={{ marginTop: 10, height: '10%' }}>
                        <Typography variant="h4" gutterBottom className={classes.text}>
                            search bar
                        </Typography>
                    </Grid> */}
          <Grid item sm={11} style={{ height: "100%" }}>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ backgroundColor: "#F2F6F8", borderRadius: 30 }}>
              <TableContainer component={Paper} elevation={0} style={{ borderRadius: 15, margin: 20, height: 700 }}>
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
                        width="20%"
                        align="right"
                        style={{ fontFamily: "product_sansbold" }}
                        className={classes.tableText}>
                        Date of Birth
                      </TableCell>
                      <TableCell align="right" style={{ fontFamily: "product_sansbold" }} className={classes.tableText}>
                        Email ID
                      </TableCell>
                      <TableCell
                        width="20%"
                        align="right"
                        style={{ fontFamily: "product_sansbold" }}
                        className={classes.tableText}>
                        Phone number
                      </TableCell>
                      <TableCell align="right" style={{ fontFamily: "product_sansbold" }} className={classes.tableText}>
                        Address
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.patientList.map((row) => (
                      <TableRow key={row.name}>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PatientList;

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
  description: {
    color: "#000000",
    fontSize: 18,
    marginHorizontal: 20,
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
    // color:'#3C76EF'
    // backgroundColor: '#3C76EF',
    color: "#3C4161",
    border: "2px solid",
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
  },
  cardText: {
    color: "#3C4161",
    textAlign: "center",
    marginTop: "2%",
  },
}));
