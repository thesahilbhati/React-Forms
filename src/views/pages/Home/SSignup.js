import React, { useState } from "react";
import {
  formik,
  form,
  field,
  errorMessage,
  Form,
  Formik,
  yupToFormErrors,
} from "formik";
import * as Yup from "yup";
import axios from "axios";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { InputAdornment } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
// import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  makeStyles,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";

import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FormControl } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },



  mainbox: {
    // width:"100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  container1: {
    width: "100%",
    margin: "30px 0px",
    justifyContent: "center",

    display: "flex",
    flexWrap: "wrap",
    borderRadius: "5px",
    "boxShadow": "0px 0px 35px 17px rgb(78 78 78 / 42%)",
  },

  typo1: {
    padding: "20px 0px",
    fontSize: "40px",
    color: " #002E5B",
    fontFamily: "Roboto",
  },
  typo2: {
    fontSize: "16px",
    fontFamily: "Roboto , sans-serif",
    display: "flex",
    fontStyle: "normal",
  },
  btn1: {
    fontSize: "20px",
    marginTop: "10px",
    borderRadius: "7px",
    width: "40%",
    backgroundColor: "#3AADE1",
  },
  btn2: {
    backgroundColor: "#F2CB6A",
  },

  textfield: {
    background: "rgba(181, 193, 204, 0.43)",
    marginTop: "8px",
    width: "100%",
    "&:hover": {
      borderColor: "#3AADE1 !important",

    },
  },
  typo1box: {
    textAlign: "center",
    width: "100%",
  },
  topbox: {
    margin: "0px 50px",
    paddingTop: "50px",
  },
  // box3:{
  //   marginLeft:"15%",
  //   marginRight:"15%",
  // },
  formControl: {
    // background: "rgba(181, 193, 204, 0.43)",
    width: "100%",
    "& .MuiSelect-selectMenu": {
      //  border:"1px #b5c1cc",
      minHeight: "0rem",
      padding: "13px 14px",
    },
  },

  // outlineborder1: {
  //   // paddingTop: "10px",
  //   "& .react-tel-input .flag-dropdown ": {
  //     borderRight: "transparent",
  //     background: "rgba(181, 193, 204, 0.43)",

  //     "&:hover": {
  //       backgroundColor: "skyblue !important",
  //     },
  //   },
  //   "& .react-tel-input .selected-flag": {
  //     background: "rgba(181, 193, 204, 0.43)",

  //   },
  //   "& .react-tel-input .country-list": {
  //     background: "#B5C1CC6E",
  //   },


  // },
  paddingBox: {
    paddingTop: "25px",
  },
  btntypo: {
    "& Button": {
      color: "#ffffff",
      "&:hover": {
        color: "#000000",
      },
    },
  },
  linkbox: {
    marginTop: "15px",
    marginBottom: "30px",
  },
}));
export default function Newsignup() {
  const classes = useStyles();
  useEffect(() => {
    axios.get("/static/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
      axios.get("/static/json/states.json").then(function (response) {
        setStates(response.data.states);
        // axios.get("/static/json/cities.json").then(function (response) {
        //   setCities(response.data.cities);
        // });
      });
    });
  }, []);

  const changeStateList = (name) => {
    const selectted = states.filter((cont) => {
      return cont.name === name;
    });
    if (selectted.length !== 0) {
      const contId = selectted[0].id;
      // const allCity = cities.filter((city) => {
      //   return city.state_id === contId;
      // });
      // setShowCities(allCity);
    }
  };

  const changeState = (e) => {
    const name = e.target.value;
    changeStateList(name);
  };

  const changeCountryList = (name) => {
    const selectted = countries?.filter((cont) => {
      return cont.name === name;
    });
    const contId = selectted[0]?.id;

    const allState = states?.filter((state) => {
      return state.country_id === contId;
    });
    setShowStates(allState);
  };

  const changeCountry = (e) => {
    const name = e.target.value;
    changeCountryList(name);
  };
  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showStates, setShowStates] = useState([]);
  const [country, setCountry] = React.useState("");
  const [countryCode, setCountryCode] = useState("");
  const [Countrylist, setCountrylist] = useState();

  // const handleChange = (event) => {
  //   setCountry(event.target.value);

  //   //   const name = e.target.value;
  //   //   changeCountryList(name);
  //   // };
  // handleUserInput(e) {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   this.setState({ name: value, isAvaila: true });
  // }
  function handleclick() {
    history.push("/Signin");
  }
  const history = useHistory();
  // isFormValid = () => {
  //   const {firstName, lastName, email, password, confirmPassword,phoneNo,country} = this.state

  //   return firstName && lastName && email && password && confirmPassword && phoneNo && country
  // }
  return (



    <div>
      <Box className={classes.mainbox}>
        <Container maxWidth="md">
          <Box className={classes.container1}>
            <Box className={classes.box3}>
              <Box className={classes.typo1box}>
                <Typography variant="h4" className={classes.typo1}>
                  Sign up
                </Typography>
                <Typography variant="body1" style={{ color: "#676767" }}>
                  Get started with your account
                </Typography>
              </Box>

              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  country: "",
                  phoneNo: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string()
                    .required("First name is required")
                    .min(2, "Please enter at least 2 characters")
                    .max(35, "You can enter only 35 characters")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  lastName: Yup.string()
                    .required("Last name is required")
                    .min(2, "Please enter at least 2 characters")
                    .max(35, "You can enter only 35 characters")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),
                  email: Yup
                    .string()
                    .email("You have entered an invalid email address. Please try again")
                    .required("Email address is required")
                    .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
                  country: Yup.string()
                    .required("Select Country"),

                  phoneNo: Yup.string()
                    .required("Mobile number is required")
                    .matches(
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                      "Must be a valid mobile"
                    )
                    .max(13, "Should not exceeds 13 digits")
                    .min(9, "Must be only 9 digits"),
                  password: Yup.string()
                    .required("Password is required")

                    .matches(
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      "password must contain special character , number and alphabets "
                    ),
                  confirmPassword: Yup.string()

                    .required("Password Must be Same")
                    .when("password", {
                      is: val => (val && val.length > 0 ? true : false),
                      then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Both password need to be the same"
                      ),
                    })
                })}

                onSubmit={async ({
                  name,
                  message,
                  subject,
                  email,
                  firstName,
                  lastName,
                  phonenumber,
                  password,
                  confirmPassword,
                  country,
                }) => {
                  try {
                    // if (userType === "USER") {
                    axios.catch((err) => {
                      console.log(err.message);
                    });
                    // }
                  } catch (err) {
                    console.log("submitted");
                    console.error(err.response);
                    //  setIsLoading(false);
                  }
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Container maxWidth="sm">
                      <Box className={classes.topbox}>
                        <Box className={classes.paddingBox}>
                          <Grid container spacing={6}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Typography className={classes.typo2} fullWidth>
                                First Name
                              </Typography>
                              <TextField
                                name="firstName"
                                className={classes.textfield}
                                type="text"
                                label=""
                                variant="outlined"
                                placeholder="Enter First Name"
                                fullWidth
                                error={Boolean(
                                  touched.firstName && errors.firstName
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></TextField>
                              <FormHelperText style={{ color: "red" }}>
                                {touched.firstName && errors.firstName}
                              </FormHelperText>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Typography className={classes.typo2}>
                                Last Name
                              </Typography>
                              <TextField
                                name="lastName"
                                className={classes.textfield}
                                type="text"
                                label=""
                                variant="outlined"
                                placeholder="Enter Last Name"
                                fullWidth
                                error={Boolean(touched.lastName && errors.lastName)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></TextField>

                              <FormHelperText style={{ color: "red" }}>
                                {touched.lastName && errors.lastName}
                              </FormHelperText>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box className={classes.paddingBox}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography className={classes.typo2}>
                                Email ID
                              </Typography>
                              <TextField
                                name="email"
                                className={classes.textfield}
                                type="email"
                                label=""
                                variant="outlined"
                                placeholder="Enter Email ID"
                                fullWidth
                                error={Boolean(touched.email && errors.email)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></TextField>
                              <FormHelperText style={{ color: "red" }}>
                                {touched.email && errors.email}
                              </FormHelperText>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box className={classes.paddingBox}>
                          <Grid container spacing={6}>
                            <Grid item xs={12} sm={6} lg={6} md={6}>
                              <label className={classes.typo2}>Country</label>
                              <FormControl
                                variant="outlined"
                                style={{ marginTop: "8px" }}
                                fullWidth
                              >
                                {/* <InputLabel margin="dense" style={{ fontSize: "13px" }}>
                          Select Country
                        </InputLabel> */}
                                <Select
                                  className={classes.textfield}
                                  placeholder="Enter your country"
                                  margin="dense"
                                  // label="Select Country"
                                  name="country"
                                  value={values.country}
                                  error={Boolean(touched.country && errors.country)}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    handleChange(e);
                                    changeCountry(e);
                                  }}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {countries.map((countries) => {
                                    return (
                                      <MenuItem style={{ marginLeft: "3px" }}
                                        key={countries.name + countries.id}
                                        value={countries.name}
                                      >
                                        {countries.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                                <FormHelperText error className={classes.date} style={{ color: "red" }}>
                                  {touched.country && errors.country}
                                </FormHelperText>
                              </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} lg={6} md={6}>
                              <Grid item >

                                <label style={{ marginBottom: "16px" }} className={classes.typo2}>
                                  Mobile Number
                                </label>
                                {/ <FormControl className={classes.outlineborder1}> /}


                                <PhoneInput
                                  className={classes.textfield}
                                  country={"us"}
                                  name="phoneNo"
                                  inputStyle={{
                                    background: "rgba(181, 193, 204, 0.43)",
                                    width: "100%",
                                    color: "#848484",
                                    border: "1px solid #848484",
                                    height: "37px",
                                    // marginTop: "5px",
                                  }}

                                  value={values.phoneNo}
                                  error={Boolean(touched.phoneNo && errors.phoneNo)}
                                  onBlur={handleBlur}

                                  onChange={(phone, e) => {
                                    setCountryCode(e.dialCode);
                                    setFieldValue("phoneNo", phone);
                                  }}

                                />
                                <FormHelperText error style={{ fontSize: "12px", color: "red" }}>
                                  {touched.phoneNo && errors.phoneNo}
                                </FormHelperText>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box className={classes.paddingBox}>
                          <Grid container spacing={6}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Typography className={classes.typo2} fullWidth>
                                Password
                              </Typography>
                              <TextField
                                className={classes.textfield}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                label=""
                                variant="outlined"
                                placeholder="Enter Password"
                                fullWidth
                                error={Boolean(touched.password && errors.password)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                      // edge="end"
                                      >
                                        {showPassword ? (
                                          <VisibilityIcon />
                                        ) : (
                                          <VisibilityOffIcon />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              ></TextField>
                              <FormHelperText style={{ color: "red" }}>
                                {touched.password && errors.password}
                              </FormHelperText>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Typography className={classes.typo2}>
                                Confirm-Password
                              </Typography>
                              <TextField
                                name="confirmPassword"
                                className={classes.textfield}
                                type={showPassword1 ? "text" : "password"}

                                label=""
                                variant="outlined"
                                placeholder="Re-Enter Password"
                                fullWidth
                                error={Boolean(
                                  touched.confirmPassword && errors.confirmPassword
                                )}
                                // helperText={
                                //   touched.confirmPassword && errors.confirmPassword
                                // }

                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword1}
                                        onMouseDown={handleMouseDownPassword1}
                                      // edge="end"
                                      >
                                        {showPassword1 ? (
                                          <VisibilityIcon />
                                        ) : (
                                          <VisibilityOffIcon />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              ></TextField>
                              <FormHelperText style={{ color: "red" }}>
                                {touched.confirmPassword && errors.confirmPassword}
                              </FormHelperText>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box className={classes.paddingBox}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Box className={classes.btntypo}>
                                <Button
                                  type="submit"
                                  // disabled={!this.isFormValid}
                                  variant="outlined"
                                  className={classes.btn1}

                                >
                                  Sign Up
                                </Button>
                              </Box>
                            </Grid>

                            <Grid item xs={12}>
                              <Box className={classes.linkbox}>
                                Already have an account? &nbsp;
                                <Link to="/signin"
                                  style={{ color: " #002E5B", cursor: "pointer" }}
                                >
                                  Login
                                </Link>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Container>
                  </Form>
                )}
              </Formik>
            </Box>
            </Box>
            </Container>
            </Box>
        </div>
  )                    