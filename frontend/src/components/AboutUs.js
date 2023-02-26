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
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Visibility from "@material-ui/icons/Visibility";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import back from "../assets/Images/Subtract.svg";
import aboutImg from "../assets/Images/about.jpg";
import circularProgress from "../assets/Images/circular_progress.png";
import one from "../assets/Images/1.png";
import two from "../assets/Images/2.png";
import three from "../assets/Images/3.png";
import four from "../assets/Images/4.png";
import { loginPatient, checkIfLogin } from "../api/Api";

const Home = ({ history }) => {
  const classes = useStyles();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={false} sm={3} style={{ height: "100%" }}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          style={{ backgroundImage: `url(${back})`, backgroundRepeat: "no-repeat", height: "100%", margin: 0 }}>
          <Typography className={classes.navTitle} variant="h3" gutterBottom>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              CDC
            </Link>
          </Typography>
          <Typography style={{ marginTop: "50%" }} className={classes.navText} variant="h6" gutterBottom>
            <Link to={{ pathname: "/login" }} style={{ textDecoration: "none", color: "white" }}>
              Login
            </Link>
          </Typography>
          <Typography className={classes.navText} variant="h6" gutterBottom>
            <Link to={{ pathname: "/login" }} style={{ textDecoration: "none", color: "white" }}>
              For Nurse
            </Link>
          </Typography>
          <Typography className={classes.navText} variant="h6" gutterBottom>
            <Link to={{ pathname: "/login" }} style={{ textDecoration: "none", color: "white" }}>
              For Doctor
            </Link>
          </Typography>
          <Typography className={classes.navText} variant="h6" gutterBottom>
            <Link
              style={{
                borderBottom: "solid 3px",
                paddingBottom: 7,
                borderRadius: 2,
                textDecoration: "none",
                color: "white",
              }}>
              About Us
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
        </Grid>
      </Grid>

      <Grid item sm={9} style={{ marginLeft: "-3%", height: 500 }}>
        <Grid container direction="row" style={{ marginTop: "4%" }}>
          <Grid item sm={6}>
            <Typography variant="h2" className={classes.title}>
              About Us
            </Typography>
            <Typography variant="h6" gutterBottom style={{ marginTop: "10%" }} className={classes.text}>
              CDC provides easy and efficient way to self assess oneself for COVID-19.
            </Typography>
            <Typography variant="h6" gutterBottom style={{ color: "#9296A6" }} className={classes.text}>
              CDC provides a self assessment tool for COVID-19 and provides you a faster access to Medical system. A
              healthcare professional could provide faster consultation based on the test result.
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Grid
              container
              style={{
                marginTop: "15%",
                marginLeft: "8%",
                backgroundImage: `url(${aboutImg})`,
                backgroundRepeat: "no-repeat",
                height: "200%",
              }}></Grid>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6" gutterBottom style={{ marginTop: "10%" }} className={classes.text}>
              Platform which connects a patient to a healthcare professional online in a very easy way
            </Typography>
            <Typography variant="h6" gutterBottom style={{ color: "#9296A6" }} className={classes.text}>
              No need to go anywhere for assessing your symptoms. Use our self-assessment tool and get it assessed by a
              healthcare professional from the comfort of your home. CDC provides an easy and efficient way for a
              professional to schedule an appointment with you based on their opinion about your self-assessment report.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
            backgroundColor: "rgba(242, 246, 248, 0.58)",
            // borderRadius: 8,
            marginLeft: "-6.15%",
            height: 80,
            position: "absolute",
            bottom: 0,
            width: "90%",
          }}>
          <Grid
            container
            style={{
              height: 48,
              borderTopLeftRadius: 12,
              borderBottomRightRadius: 12,
              width: 20,
              marginLeft: "-5%",
              backgroundColor: "#3C4161",
            }}></Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ height: 48, width: 400, borderBottomRightRadius: 12, backgroundColor: "white" }}>
            <Typography variant="h6" className={classes.title}>
              Design and Developed By
            </Typography>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{
              height: 48,
              width: 120,
              borderBottomRightRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: "#3C4161",
            }}>
            <Typography variant="h6" style={{ color: "white" }} className={classes.title}>
              Group F
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  text: {
    fontFamily: "product_sans_lightregular",
    letterSpacing: "2%",
  },
  title: {
    fontFamily: "product_sans_blackregular",
    color: "#3c4161",
    letterSpacing: 0.4,
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
    marginLeft: "20%",
    fontFamily: "product_sansbold",
    // marginTop: '15%'
  },
  navBot: {
    position: "absolute",
    bottom: 10,
    color: "white",
    margin: "5%",
    marginLeft: "4%",
    marginTop: "50%",
    fontFamily: "product_sansbold",
  },
  loginBtn: {
    // color:'#3C76EF'
    backgroundColor: "#3C76EF",
    color: "white",
    fontFamily: "product_sans_lightregular",
    textTransform: "capitalize",
    fontSize: 19,
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
    fontSize: 19,
  },
  cardText: {
    color: "#787e91",
    textAlign: "center",
    marginTop: "2%",
    fontFamily: "product_sansregular",
  },
}));
