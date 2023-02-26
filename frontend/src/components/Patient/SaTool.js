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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Visibility from "@material-ui/icons/Visibility";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import back from "../../assets/Images/Subtract.svg";
import line from "../../assets/Images/line.png";
import homeImg from "../../assets/Images/home.png";
import circularProgress from "../../assets/Images/circular_progress.png";
import one from "../../assets/Images/1.png";
import two from "../../assets/Images/2.png";
import three from "../../assets/Images/3.png";
import four from "../../assets/Images/4.png";
import { postAssessment, getPreviousAssessmentData } from "../../api/Api";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const SaTool = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    let assessmentData = await getPreviousAssessmentData();
    history.push({
      pathname: "/patient",
      state: { detail: history.location.state.detail, assessmentData: assessmentData },
    });
  };
  const [state, setState] = React.useState({
    closeContact: "",
    tested: "",
    travelHistory: "",
    difficultyBreathing: "",
    age: "",
    symptomsSet1: "",
    symptomsSet2: "",
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
  useEffect(() => {
    if (
      history.location.state.assessmentData.length > 0 &&
      history.location.state.assessmentData[0].isReviewed == false
    ) {
      history.push({
        pathname: "/patient",
        state: { detail: history.location.state.detail, assessmentData: history.location.state.assessmentData },
      });
    }
  }, []);
  return (
    <Grid container className={classes.root}>
      <Grid item sm={12}>
        <AppBar position="fixed" color="transparent" elevation={0}>
          <Toolbar>
            <Link
              to={{
                pathname: "/patient",
                state: { detail: history.location.state.detail, assessmentData: history.location.state.assessmentData },
              }}
              style={{ textDecoration: "none", color: "#364161" }}>
              <ArrowBackIosIcon fontSize="large"></ArrowBackIosIcon>
            </Link>
            <Typography variant="h5" className={classes.text}>
              <Link
                to={{
                  pathname: "/patient",
                  state: {
                    detail: history.location.state.detail,
                    assessmentData: history.location.state.assessmentData,
                  },
                }}
                style={{ textDecoration: "none", color: "#364161" }}>
                Home
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container direction="row" justify="center" alignContent="center" style={{ marginTop: "8%" }}>
          <Grid item sm={8}>
            <Typography variant="h6" gutterBottom className={classes.text}>
              Have you been in close contact with a confirmed or probable case of COVID-19
            </Typography>
            <Grid container justify="center" alignItems="center" style={{ margin: 20 }}>
              <Button
                variant="contained"
                size="large"
                className={clsx(classes.margin, classes.loginBtn)}
                style={state.closeContact == "yes" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                color="primary"
                startIcon={state.closeContact == "yes" ? <CheckRoundedIcon fontSize="large" color="#28c37f" /> : null}
                onClick={() => setState({ ...state, closeContact: "yes" })}>
                Yes
              </Button>

              <Button
                variant="contained"
                size="large"
                className={clsx(classes.margin, classes.loginBtn)}
                color="primary"
                style={state.closeContact == "no" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                startIcon={state.closeContact == "no" ? <CheckRoundedIcon /> : null}
                onClick={() => setState({ ...state, closeContact: "no" })}>
                No
              </Button>
            </Grid>
            <Typography variant="h6" gutterBottom className={classes.text}>
              Have you been tested for COVID-19
            </Typography>
            <Grid container justify="center" alignItems="center" style={{ margin: 20 }}>
              <Button
                variant="contained"
                size="large"
                className={clsx(classes.margin, classes.loginBtn)}
                style={state.tested == "yes" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                color="primary"
                startIcon={state.tested == "yes" ? <CheckRoundedIcon fontSize="large" color="#28c37f" /> : null}
                onClick={() => setState({ ...state, tested: "yes" })}>
                Yes
              </Button>

              <Button
                variant="contained"
                size="large"
                className={clsx(classes.margin, classes.loginBtn)}
                color="primary"
                style={state.tested == "no" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                startIcon={state.tested == "no" ? <CheckRoundedIcon /> : null}
                onClick={() => setState({ ...state, tested: "no" })}>
                No
              </Button>
            </Grid>
            <Typography variant="h6" gutterBottom className={classes.text}>
              Have you or someone close to you travelled outside of Canada within the last 14 days
            </Typography>
            <Grid container justify="center" alignItems="center" style={{ margin: 20 }}>
              <Button
                variant="contained"
                size="large"
                className={clsx(classes.margin, classes.loginBtn)}
                style={state.travelHistory == "yes" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                color="primary"
                startIcon={state.travelHistory == "yes" ? <CheckRoundedIcon fontSize="large" color="#28c37f" /> : null}
                onClick={() => setState({ ...state, travelHistory: "yes" })}>
                Yes
              </Button>

              <Button
                variant="contained"
                size="large"
                className={clsx(classes.margin, classes.loginBtn)}
                color="primary"
                style={state.travelHistory == "no" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                startIcon={state.travelHistory == "no" ? <CheckRoundedIcon /> : null}
                onClick={() => setState({ ...state, travelHistory: "no" })}>
                No
              </Button>
            </Grid>

            <Typography variant="h6" gutterBottom className={classes.text}>
              Are you having difficulty breathing? For example, do you feel like you’re out of breath or suffocating?
            </Typography>
            <Typography variant="h6" style={{ textAlign: "center" }} gutterBottom className={classes.text}>
              OR
            </Typography>
            <Typography variant="h6" gutterBottom className={classes.text}>
              Do you have a lot of trouble breathing even when at rest, such as shortness of breath that makes it hard
              to speak?
            </Typography>
          </Grid>
          <Grid container justify="center" alignItems="center" style={{ margin: 20 }}>
            <Button
              variant="contained"
              size="large"
              className={clsx(classes.margin, classes.loginBtn)}
              style={
                state.difficultyBreathing == "yes" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }
              }
              color="primary"
              startIcon={
                state.difficultyBreathing == "yes" ? <CheckRoundedIcon fontSize="large" color="#28c37f" /> : null
              }
              onClick={() => setState({ ...state, difficultyBreathing: "yes" })}>
              Yes
            </Button>

            <Button
              variant="contained"
              size="large"
              className={clsx(classes.margin, classes.loginBtn)}
              color="primary"
              style={
                state.difficultyBreathing == "no" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }
              }
              startIcon={state.difficultyBreathing == "no" ? <CheckRoundedIcon /> : null}
              onClick={() => setState({ ...state, difficultyBreathing: "no" })}>
              No
            </Button>
          </Grid>
          {state.difficultyBreathing == "no" && (
            <React.Fragment>
              <Grid item sm={8}>
                <Typography variant="h6" gutterBottom className={classes.text}>
                  Please select an age range
                </Typography>
              </Grid>
              <Grid container justify="center" alignItems="center" style={{ margin: 20 }}>
                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  style={
                    state.age == "6 months–5 years"
                      ? { backgroundColor: "#3C76EF", width: "18%" }
                      : { backgroundColor: "#8DADF0" }
                  }
                  color="primary"
                  startIcon={state.age == "6 months–5 years" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, age: "6 months–5 years" })}>
                  6 months–5 years
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  color="primary"
                  style={state.age == "6–17 years" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  startIcon={state.age == "6–17 years" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, age: "6–17 years" })}>
                  6–17 years
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  style={state.age == "18 years+" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  color="primary"
                  startIcon={state.age == "18 years+" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, age: "18 years+" })}>
                  18 years+
                </Button>
              </Grid>
            </React.Fragment>
          )}
          {state.difficultyBreathing == "no" && state.age == "18 years+" && (
            <React.Fragment>
              <Grid item sm={8}>
                <Typography variant="h6" gutterBottom className={classes.text}>
                  Are you experiencing <b>ANY</b> of the following symptoms?
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Fever (oral temperature 38.1°C (100.6°F) or higher)
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Sudden loss of sense of smell (anosmia) without nasal congestion, with or without loss of taste
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Recent cough or worsening of a chronic cough
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Shortness of breath
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Trouble breathing
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Sore throat
                </Typography>
                <Typography variant="h6" gutterBottom className={classes.listText}>
                  Runny nose or congestion (of unknown cause)
                </Typography>
              </Grid>
              <Grid container justify="center" alignItems="center" style={{ margin: 20 }}>
                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  style={state.symptomsSet1 == "yes" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  color="primary"
                  startIcon={state.symptomsSet1 == "yes" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, symptomsSet1: "yes" })}>
                  Yes
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  color="primary"
                  style={state.symptomsSet1 == "no" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  startIcon={state.symptomsSet1 == "no" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, symptomsSet1: "no" })}>
                  No
                </Button>
              </Grid>
            </React.Fragment>
          )}
          {state.difficultyBreathing == "no" && state.age == "6–17 years" && (
            <React.Fragment>
              <Grid item sm={8}>
                <Typography variant="h6" gutterBottom className={classes.text}>
                  Does your child have <b>ANY</b> of the following symptoms?
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Fever (oral temperature 38.1°C (100.6°F) or higher)
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Sudden loss of sense of smell (anosmia) without nasal congestion, with or without loss of taste
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Recent cough or worsening of a chronic cough
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Shortness of breath
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Trouble breathing
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Sore throat
                </Typography>
                <Typography variant="h6" gutterBottom className={classes.listText}>
                  Runny nose or congestion (of unknown cause)
                </Typography>
              </Grid>
              <Grid container justify="center" alignItems="center" style={{ margin: 20 }}>
                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  style={state.symptomsSet1 == "yes" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  color="primary"
                  startIcon={state.symptomsSet1 == "yes" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, symptomsSet1: "yes" })}>
                  Yes
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  color="primary"
                  style={state.symptomsSet1 == "no" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  startIcon={state.symptomsSet1 == "no" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, symptomsSet1: "no" })}>
                  No
                </Button>
              </Grid>
            </React.Fragment>
          )}
          {state.difficultyBreathing == "no" && state.age == "6 months–5 years" && (
            <React.Fragment>
              <Grid item sm={8}>
                <Typography variant="h6" gutterBottom className={classes.text}>
                  Is your child experiencing <b>ANY</b> of the following symptoms?
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Fever (38.5°C rectal temperature (101.3°F) or higher)
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Cough (new or worse), shortness of breath, or difficulty breathing
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Runny nose or nasal congestion or sore throat
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  AND
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  fever (38.1°C rectal temperature (100.6°F) or higher)
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Abdominal pain, vomiting, or diarrhea
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  AND
                </Typography>
                <Typography variant="h6" gutterBottom className={classes.listText}>
                  fever (38.1°C rectal temperature (100.6°F) or higher)
                </Typography>
              </Grid>
              <Grid container justify="center" alignItems="center" style={{ margin: 20 }}>
                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  style={state.symptomsSet1 == "yes" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  color="primary"
                  startIcon={state.symptomsSet1 == "yes" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, symptomsSet1: "yes" })}>
                  Yes
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  color="primary"
                  style={state.symptomsSet1 == "no" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  startIcon={state.symptomsSet1 == "no" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, symptomsSet1: "no" })}>
                  No
                </Button>
              </Grid>
            </React.Fragment>
          )}
          {state.symptomsSet1 == "no" && state.age == "18 years+" && (
            <React.Fragment>
              <Grid item sm={8}>
                <Typography variant="h6" gutterBottom className={classes.text}>
                  Are you experiencing <b>at least 2</b> of the following symptoms?
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Stomach aches
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Nausea or vomiting
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Diarrhea
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Major fatigue
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Significant loss of appetite
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Generalized muscle pain (not related to physical exertion)
                </Typography>
                <Typography variant="h6" gutterBottom className={classes.listText}>
                  Headache
                </Typography>
              </Grid>
              <Grid container justify="center" alignItems="center" style={{ margin: 20 }}>
                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  style={state.symptomsSet2 == "yes" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  color="primary"
                  startIcon={state.symptomsSet2 == "yes" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, symptomsSet2: "yes" })}>
                  Yes
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  color="primary"
                  startIcon={state.symptomsSet2 == "no" ? <CheckRoundedIcon /> : null}
                  style={state.symptomsSet2 == "no" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  onClick={() => setState({ ...state, symptomsSet2: "no" })}>
                  No
                </Button>
              </Grid>
            </React.Fragment>
          )}
          {state.symptomsSet1 == "no" && state.age == "6–17 years" && (
            <React.Fragment>
              <Grid item sm={8}>
                <Typography variant="h6" gutterBottom className={classes.text}>
                  Does your child have any <b>at least 2</b> of the following symptoms?
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Stomach aches
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Nausea or vomiting
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Diarrhea
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Major fatigue
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Significant loss of appetite
                </Typography>
                <Typography variant="h6" className={classes.listText}>
                  Generalized muscle pain (not related to physical exertion)
                </Typography>
                <Typography variant="h6" gutterBottom className={classes.listText}>
                  Headache
                </Typography>
              </Grid>
              <Grid container justify="center" alignItems="center" style={{ margin: 20 }}>
                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  style={state.symptomsSet2 == "yes" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  color="primary"
                  startIcon={state.symptomsSet2 == "yes" ? <CheckRoundedIcon /> : null}
                  onClick={() => setState({ ...state, symptomsSet2: "yes" })}>
                  Yes
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  className={clsx(classes.margin, classes.loginBtn)}
                  color="primary"
                  startIcon={state.symptomsSet2 == "no" ? <CheckRoundedIcon /> : null}
                  style={state.symptomsSet2 == "no" ? { backgroundColor: "#3C76EF" } : { backgroundColor: "#8DADF0" }}
                  onClick={() => setState({ ...state, symptomsSet2: "no" })}>
                  No
                </Button>
              </Grid>
            </React.Fragment>
          )}
          <Grid container direction="column" justify="center" alignItems="center" style={{ margin: 20 }}>
            <img src={line} alt="circularProgress" style={{ marginBottom: 20 }} />

            <Button
              variant="contained"
              size="large"
              className={clsx(classes.margin, classes.loginBtn)}
              // style={{ backgroundColor: '#3C76EF', }}
              color="primary"
              style={{ width: "20%" }}
              onClick={() =>
                postAssessment(
                  state.closeContact,
                  state.tested,
                  state.travelHistory,
                  state.difficultyBreathing,
                  state.age,
                  state.symptomsSet1,
                  state.symptomsSet2
                ).then(async function (response) {
                  if (response) {
                    handleClick();
                  }
                })
              }
              disabled={
                (state.difficultyBreathing == "yes"
                  ? false
                  : state.symptomsSet1 == "yes"
                  ? false
                  : state.symptomsSet2.length == 0) ||
                state.closeContact == "" ||
                state.tested == "" ||
                state.travelHistory == ""
              }>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Your assessment has been submitted.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default SaTool;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflowY: "scroll",
  },
  text: {
    fontFamily: "product_sansbold",
    color: "#3c4161",
    fontSize: 24,
  },
  listText: {
    marginLeft: 20,
    color: "#3c4161",
    fontFamily: "product_sansregular",
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
  },
  navText: {
    color: "white",
    margin: "5%",
    marginLeft: "20%",

    // marginTop: '15%'
  },
  navBot: {
    color: "white",
    margin: "5%",
    marginLeft: "12%",
    marginTop: "180%",
  },
  loginBtn: {
    // color:'#3C76EF'
    width: "15%",
    textTransform: "none",
    color: "white",
    boxShadow: "none",
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
  },
  cardText: {
    color: "#3C4161",
    textAlign: "center",
    marginTop: "2%",
  },
}));
