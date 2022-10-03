import React, { useEffect, useState, useContext } from "react";
import "src/scss/main.css";

import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Link,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Input,
  InputAdornment,
  IconButton,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Logo from "src/component/Logo";
import DatePicker from "react-datepicker";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "src/context/Auth";

// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { values } from "lodash";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  buttonbox: {
    padding: "10px 18px",
    [theme.breakpoints.only("xs")]: {
      maxWidth: "140px",
      fontSize: "10px",
    },
  },
  date: {
    "& p": {
      marginLeft: "0px !important",
      fontSize: "12px !important",
    },
  },

  logosec: {
    "@media(min-width:1280px)": {
      display: "none",
    },
  },
  formboxes: {
    marginTop: "0px",
  },
  newbox: {
    "&:hover": { textDecoration: "underline" },
  },
}));
function Signup(props) {
  const classes = useStyles();

  const formValidationSchema = yep.object().shape({
    email: yep
      .string()
      .email("You have entered an invalid email address. Please try again")
      .required("Email address is required")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
    phoneNo: yep
      .string()
      .required("Mobile number is required")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "Must be a valid mobile"
      )
      .max(13, "Should not exceeds 13 digits")
      .min(9, "Must be only 9 digits"),
    password: yep
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    firstName: yep
      .string()
      .required("First name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and whitespaces are allowed for this field number are not. "
      ),

    lastName: yep
      .string()
      .required("Last name is required")
      // .trim('The last name cannot include leading and trailing spaces')
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and whitespaces are allowed for this field number are not. "
      ),
    dateOfBirth: yep
      .string()
      .required("Date of birth is required")
      .test(
        "DOB",
        "You must be at least 13 years old or above",
        (date) => moment().diff(moment(date), "years") >= 13
      ),
    country: yep.string().required("Country is required"),
    state: yep.string().required("State is required"),
    city: yep
      .string()
      .required("City is required")

      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    address: yep.string().required("Address is required"),
    countryCode: yep
      .number()
      .required("Zip code is required")
      .typeError("That doesn't look like a zip code number")
      .positive("A Zip code number can't start with a minus")
      .integer("A Zip code number can't include a decimal point"),
  });
  const [countryCode, setCountryCode] = useState("");

  const auth = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [phone, setPhone] = useState();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [Countrylist, setCountrylist] = useState();
  const [showStates, setShowStates] = useState([]);
  const [done, setDone] = useState(false);
  const recaptchaRef = React.createRef();
  const [access, setAccess] = React.useState(true);

  const [btnText, setBtnText] = useState("CREATE AN ACCOUNT");

  const formInitialSchema = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNo: phone,
    password: "",
    dateOfBirth: "",
    country: "",
    state: "",
    city: "",
    address: "",
    countryCode: "",
  };
  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    setBtnText("Creating....");
    console.log("values-----", values);
    try {
      const res = await axios.post(ApiConfig.userSignUp, {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNo: values?.phoneNo?.toString(),
        dob: moment(values.dateOfBirth).format("DD-MM-YYYY"),
        //  moment(values.dateOfBirth).unix()?.toString(),
        country: values.country,
        address: values.address,
        city: values.city,
        state: values.state,
        countryCode: values.countryCode,
      });

      if (res.data.status === 200) {
        setIsLoading(false);
        setBtnText("CREATE AN ACCOUNT");
        toast.success("OTP sent successfully, Please check your email.");
        auth.setEndtime(moment().add(3, "m").unix());
        history.push("/verify-email-otp");
      } else if (res.data.status === 205) {
        toast.warn("Email Already Registered");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
      setBtnText("CREATE AN ACCOUNT");
    }
  };

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

  return (
    <Grid className="d-flex height100">
      <Box className="loginForm">
        <Box className="signupBox">
          <Box className="signupbox">
            <Formik
              initialValues={formInitialSchema}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={formValidationSchema}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Grid container direction={"column"}>
                    <Grid item>
                      <Box className={classes.logosec}>
                        <Logo width="110" style={{ cursor: "pointer" }} />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      style={{ marginTop: "20px", marginBottom: "10px" }}
                    >
                      <Typography variant="h3">Register</Typography>
                      <Typography variant="body2">
                        Create New Toga Account.
                      </Typography>
                    </Grid>
                    <Grid item>
                      <label>First Name</label>
                      <TextField
                        placeholder="Enter Your First Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="firstName"
                        value={values.firstName}
                        error={Boolean(touched.firstName && errors.firstName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText
                        error
                        style={{
                          fontSize: "12px",
                          paddingBottom: "0px !important",
                        }}
                      >
                        {touched.firstName && errors.firstName}
                      </FormHelperText>
                    </Grid>
                    <Grid item>
                      <label>Last Name</label>
                      <TextField
                        placeholder="Enter Your Last Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="lastName"
                        value={values.lastName}
                        error={Boolean(touched.lastName && errors.lastName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error style={{ fontSize: "12px" }}>
                        {touched.lastName && errors.lastName}
                      </FormHelperText>
                    </Grid>

                    <Grid item>
                      <label>Email</label>
                      <TextField
                        placeholder="Enter Your Email"
                        type="text"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="email"
                        value={values.email}
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // autocomplete="none"
                        autoComplete="off"
                      />
                      <FormHelperText error style={{ fontSize: "12px" }}>
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Grid>

                    <Grid item style={{ marginTop: "7px" }}>
                      <label style={{ marginBottom: "8px" }}>
                        Mobile Number
                      </label>
                      <PhoneInput
                        country={"us"}
                        name="phoneNo"
                        inputStyle={{
                          background: "transparent",
                          width: "100%",
                          color: "#848484",
                          border: "1px solid #848484",
                          height: "37px",
                          marginTop: "5px",
                        }}
                        value={values.phoneNo}
                        error={Boolean(touched.phoneNo && errors.phoneNo)}
                        onBlur={handleBlur}
                        onChange={(phone, e) => {
                          setCountryCode(e.dialCode);
                          setFieldValue("phoneNo", phone);
                        }}
                      />
                      <FormHelperText error style={{ fontSize: "12px" }}>
                        {touched.phoneNo && errors.phoneNo}
                      </FormHelperText>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <label>Country</label>
                      <FormControl
                        variant="outlined"
                        style={{ marginTop: "8px" }}
                        fullWidth
                      >
                        {/* <InputLabel margin="dense" style={{ fontSize: "13px" }}>
                          Select Country
                        </InputLabel> */}
                        <Select
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
                              <MenuItem
                                key={countries.name + countries.id}
                                value={countries.name}
                              >
                                {countries.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormHelperText error className={classes.date}>
                          {touched.country && errors.country}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <label>State</label>
                      <FormControl
                        variant="outlined"
                        style={{ marginTop: "8px" }}
                        fullWidth
                      >
                        <Select
                          fullWidth
                          name="state"
                          margin="dense"
                          placeholder="Enter your state"
                          value={values.state}
                          error={Boolean(touched.state && errors.state)}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            changeState(e);
                            handleChange(e);
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {showStates.lenght !== 0 &&
                            showStates.map((state) => {
                              return (
                                <MenuItem
                                  key={state.name + state.id}
                                  value={state.name}
                                >
                                  {state.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                      <FormHelperText error style={{ fontSize: "12px" }}>
                        {touched.state && errors.state}
                      </FormHelperText>
                    </Grid>
                    <Grid item>
                      <label>Address</label>
                      <TextField
                        placeholder="Enter Your Address"
                        type="text"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="address"
                        value={values.address}
                        error={Boolean(touched.address && errors.address)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error style={{ fontSize: "12px" }}>
                        {touched.address && errors.address}
                      </FormHelperText>
                    </Grid>
                    <Grid item>
                      <label>City</label>
                      <TextField
                        placeholder="Enter Your City"
                        type="text"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="city"
                        value={values.city}
                        error={Boolean(touched.city && errors.city)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error style={{ fontSize: "12px" }}>
                        {touched.city && errors.city}
                      </FormHelperText>
                    </Grid>
                    <Grid item>
                      <label>Zip Code</label>
                      <TextField
                        placeholder="Enter Your Zip Code"
                        type="number"
                        variant="outlined"
                        fullWidth
                        name="countryCode"
                        size="small"
                        value={values.countryCode}
                        onChange={handleChange}
                      />
                      <FormHelperText error style={{ fontSize: "12px" }}>
                        {touched.countryCode && errors.countryCode}
                      </FormHelperText>
                    </Grid>

                    <Grid item>
                      <label>Date Of Birth</label>
                      <FormControl
                        className={classes.formboxes}
                        variant="outlined"
                        fullWidth
                        size="small"
                      >
                        <KeyboardDatePicker
                          className={classes.date}
                          placeholder="DD/MM/YYYY"
                          value={values.dateOfBirth}
                          onChange={(date) => {
                            setFieldValue("dateOfBirth", new Date(date));
                          }}
                          format="DD/MM/YYYY"
                          inputVariant="outlined"
                          InputLabelProps={{ shrink: true }}
                          disableFuture
                          margin="dense"
                          name="dateOfBirth"
                          autoComplete="off"
                          maxDate={moment().subtract(13, "years")}
                          error={Boolean(
                            touched.dateOfBirth && errors.dateOfBirth
                          )}
                          helperText={touched.dateOfBirth && errors.dateOfBirth}
                        />

                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            minDate={!access ? new Date() : undefined}
                            maxDate={!access ? new Date() : undefined}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            inputVariant="outlined"
                            id="date-picker-dialog"
                            label="Select Date"
                            format="MM/dd/yyyy"
                            clearable
                            value={selectedDate}
                            onChange={handleDateChange}
                          />
                          <Button onClick={() => setAccess((a) => !a)}>
                            Toggle
                          </Button>
                        </MuiPickersUtilsProvider> */}
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl fullWidth>
                        <Box
                          style={{
                            width: "100%",
                            marginTop: "-9px",
                            marginBottom: "17px",
                          }}
                        >
                          <label>Password</label>
                          <TextField
                            className={classes.inputvalue}
                            placeholder="Enter Your Password"
                            size="small"
                            variant="outlined"
                            autoComplete="new-password"
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password && errors.password)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            InputProps={{
                              autocomplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                  >
                                    <Box className={classes.passsec}>
                                      {showPassword ? (
                                        <Visibility
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        />
                                      ) : (
                                        <VisibilityOff
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          {touched.password && errors.password && (
                            <FormHelperText error style={{ fontSize: "12px" }}>
                              Must contain 8 characters, one uppercase, one
                              lowercase, one number and one special character
                            </FormHelperText>
                          )}
                        </Box>
                      </FormControl>
                    </Grid>
                    <Box style={{ width: "100%" }}>
                      <form
                        onSubmit={() => {
                          recaptchaRef.current.execute();
                        }}
                      >
                        <ReCAPTCHA
                          // ref={recaptchaRef}
                         