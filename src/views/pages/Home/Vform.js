import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import * as yep from "yup";
import { Formik, ErrorMessage, Form } from "formik";
import { ReactCountryDropdown } from 'react-country-dropdown'
import Autocomplete from '@material-ui/lab/Autocomplete';
import  { useEffect, useContext } from "react";


import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  makeStyles,
  FormHelperText,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";
// import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
  }

const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "50px",
    paddingBottom: "50px",
    "& h2": {
      color: "black",
    },
    "& label": {
      color: "#000",
      padding: "0",
      fontSize: "14px",
      lineHeight: "33px",
      transition:
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    "& p": {
      // paddingTop: "15px",
      color: "#000",
      //   marginTop:"30px"
    },

  },
  maintext: {
    padding: "30px 40px",
    marginTop: "10px",
    bordeRadius: "10px",
    // backgroundColor: "#fff",
    borderRadius: "10px",
    background: "#FFFFFF",
boxShadow: "0px 0px 35px 17px rgba(78, 78, 78, 0.2)",
borderRadius: "10px",
transform: "rotate(-0.06deg)",
    // border: "1px solid #5685ff54",
    "& label": {
      color: "#000"
    }
  },
  btn:{
      display:"flex",
      justifyContent:"center",
     
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
    alu:{
        width:"100%",
        "& .MuiMenu-list":{
            padding:"100px",
            marginLeft:"100px"
        },
    },
},
inputvalue:{
    width:"100%",
    "@media(max-width:1000px)":{
        width:"50%",
    },
}
}));


const handleSelect = (country) => {
    console.log(country)
    /* returns the details on selected country as an object
    	{
          name: "United States of America", 
          code: "US", 
          capital: "Washington, D.C.", 
          region: "Americas", 
          latlng: [38, -97]
        }
    */
  }

const Vform = (props) => {
  const classes = useStyles();
  const [confirmation, setConfirmation] = useState(false);
  const history = useHistory()
  const [states, setStates] = useState([]);
  const [phone, setPhone] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [countries, setCountries] = useState([]);
  const [showStates, setShowStates] = useState([]);

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
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


  return (
      <>
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
       
        <Formik
          initialValues={{
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
            Cpassword:"",
            
          }}
          validationSchema={yep.object().shape({
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
            Cpassword: yep
            .string()
            .label('confirm password')
            .required()
            .oneOf([yep.ref('password'), null], 'Passwords must match'),
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
          })}
          onSubmit={async ({ name, message, Password, email }) => {
            setIsUpdating(true);
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
            <form onSubmit={handleSubmit}>
              <Box className={classes.maintext}>
              <Box mb={5} textAlign="center">
              <Container maxWidth="sm">
                <Typography variant="h2" style={{ color: "#002E5B" }}>Sign Up</Typography>
               
              </Container>
            </Box>
                <Grid container spacing={2} >
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>First Name*</label>
                      <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        id="outlined-basic"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        type="name"
                        name="firstName"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Box>
                    <label>Last Name*</label>
                    <TextField
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      id="outlined-basic"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      type="name"
                      name="lastName"
                    />
                  </Box>
                </Grid>
                  <Grid item xs={12} sm={12}>
                    <Box>
                      <label>Email*</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                      />
                    </Box>
                  </Grid>
                 <Grid item xs={12} md={6}>
                  <label>Country</label>
                  <FormControl className={classes.alu}
                    variant="outlined"
                    style={{ marginTop: "8px"}}
                    fullWidth
                  >
                 
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
                     
                      {countries.map((countries ) => {
                        return (
                          <MenuItem style={{display:"flex",justifyContent:"center"}}
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
                  <Grid item xs={12} sm={6} >
                  <label>Mobile*</label>

                      <PhoneInput
                            country={"us"}
                            name="phoneNo"
                            variant="outlined"
                            inputStyle={{
                                background: "transparent",
                                width: "100%",
                                color: "#848484",
                                border: "1px solid #848484",
                                height: "37px",
                                
                         
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

                <Grid item xs={12} sm={6}>
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
                      variant="outlined"
                      autoComplete="new-password"
                      fullWidth
                      size="large"

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
              <Grid item xs={12} sm={6}>
              <Box>
                <label>Confirm Password*</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  error={Boolean(touched.Cpassword && errors.Cpassword)}
                  fullWidth
                  helperText={touched.Cpassword && errors.Cpassword}
                  name="Cpassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="Password"
                  value={values.Cpassword}
                />
              </Box>
            

            </Grid>
                </Grid>
               
                <Grid item xs={12} sm={12} lg={6}>
                <Box mt={4} className={classes.btn}>
                  <Button style={{ width:"100%",
                  background: "#3AADE1",
                  borderRadius: "10px",
                  color:"#fff"}}
                    // color="primary"
                    // disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={isUpdating}
                  >Get Started
                  </Button>
                </Box>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
    </>
  );
};

export default Vform;

