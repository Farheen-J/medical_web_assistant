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
import homeImg from "../assets/Images/home.png";
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
            <Link
              to={{ pathname: "/login" }}
              style={{ textDecoration: "none", color: "white" }}>
              Login
            </Link>
          </Typography>
          <Typography className={classes.navText} variant="h6" gutterBottom>
            <Link
              to={{ pathname: "/login" }}
              style={{ textDecoration: "none", color: "white" }}>
              For Nurse
            </Link>
          </Typography>
          <Typography className={classes.navText} variant="h6" gutterBottom>
            <Link
              to={{ pathname: "/login" }}
              style={{ textDecoration: "none", color: "white" }}>
              For Doctor
            </Link>
          </Typography>
          <Typography className={classes.navText} variant="h6" gutterBottom>
            <Link to={"/about-us"} style={{ textDecoration: "none", color: "white" }}>
              About Us
            </Link>
          </Typography>
        </Grid>
      </Grid>

      <Grid item sm={9} style={{ marginLeft: "-3%" }}>
        <Grid container direction="row" style={{ marginTop: "4%" }}>
          <Grid item sm={6}>
            <Typography variant="h2" className={classes.title}>
              Welcome to CDC
            </Typography>
            <Typography variant="h6" gutterBottom style={{ color: "#9296A6" }} className={classes.text}>
              CDC provides a self assessment tool for COVID-19 and provides you a faster access to Medical system. A
              healthcare professional could provide faster consultation based on the test result.
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Grid
              container
              style={{
                marginTop: "-15%",
                marginLeft: "40%",
                backgroundImage: `url(${homeImg})`,
                backgroundRepeat: "no-repeat",
                height: 429,
              }}></Grid>
          </Grid>
          <Grid item sm={7}>
            <Typography variant="h4" style={{ marginTop: "-16%" }} className={classes.title}>
              COVID-19 Symptom Self-Assessment Tool
            </Typography>
            <Typography variant="h6" gutterBottom style={{ color: "#9296A6" }} className={classes.text}>
              If one or more symptoms persist for more than 24 hours, proceed with self-assessment.
            </Typography>
          </Grid>
          <Grid item sm={10}>
            <Grid container justify="space-between" alignItems="center" style={{ marginTop: "4%" }}>
              <Card className={classes.paper}>
                <CardContent style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
                  <CardMedia style={{ height: 109, width: 37, marginLeft: "42%" }} image={one} title="Fever" />
                  <Typography variant="body1" className={classes.cardTitle}>
                    Fever
                  </Typography>
                  <Typography variant="body2" className={classes.cardText}>
                    Oral temperature of 38.1 °C (100.6 °F) and above
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.paper}>
                <CardContent style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
                  <CardMedia
                    style={{ height: 108, width: 112, marginLeft: "25%" }}
                    image={two}
                    title="Genral symptoms"
                  />
                  <Typography variant="body1" className={classes.cardTitle}>
                    Genral symptoms
                  </Typography>
                  <Typography variant="body2" className={classes.cardText}>
                    loss of smell or appetite, fatigue or muscle pain
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.paper}>
                <CardContent style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
                  <CardMedia
                    style={{ height: 106, width: 100, alignSelf: "center", marginLeft: "25%" }}
                    image={three}
                    title="Respiratory symptoms"
                  />
                  <Typography variant="body1" className={classes.cardTitle} style={{ marginTop: "-2%" }}>
                    Respiratory symptoms
                  </Typography>
                  <Typography variant="body2" className={classes.cardText}>
                    Cough, difficulty in breathing, Sore throat, Runny nose
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.paper}>
                <CardContent style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
                  <CardMedia
                    style={{ height: 83, width: 65, marginLeft: "35%", marginTop: "3%" }}
                    image={four}
                    title="Gastrointestinal symptoms"
                  />
                  <Typography variant="body1" className={classes.cardTitle} style={{ marginTop: "8%" }}>
                    Gastrointestinal symptoms
                  </Typography>
                  <Typography variant="body2" className={classes.cardText}>
                    Nausea, Vomiting, Diarrhea, Stomach aches
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid container justify="center" alignItems="center" style={{ marginTop: "5%" }}>
              <Button
                variant="contained"
                size="large"
                className={clsx(classes.margin, classes.loginBtn)}
                style={{ boxShadow: "none" }}
                color="primary"
                onClick={() => {
                  if (checkIfLogin()) history.push("/self-assessment");
                  else history.push({ pathname: "/login" });
                }}>
                Take Self Assessment
              </Button>
              <img src={circularProgress} alt="circularProgress" />
              <Button
                variant="contained"
                size="large"
                className={clsx(classes.margin, classes.loginBtn)}
                color="primary"
                disabled>
                Get help from a doctor
              </Button>
            </Grid>
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
    marginLeft: "12%",
    marginTop: "50%",
    fontFamily: "product_sans_blackregular",
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
