
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {Link} from "react-router-dom";
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
  
  
  import PhoneInput from "react-phone-input-2";
  import "react-phone-input-2/lib/style.css";
  import { FormControl } from "@material-ui/core";
  
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width:"100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  
  
  
    mainbox: {
      width:"100%",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    
    container1: {
      width: "100%",
      margin: "30px 0px",
      justifyContent: "center",
  
      // display: "flex",
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
      fontStyle:"normal",
    },
    btn1: {
      fontSize: "20px",
      marginTop: "10px",
      borderRadius: "7px",
      width: "100%",
      backgroundColor: "#3AADE1",
    },
    btn2: {
      backgroundColor: "#F2CB6A",
    },
  
    textfield: {
      background: "rgba(181, 193, 204, 0.43)",
      marginTop: "8px",
      
    },
    typo1box: {
      textAlign: "center",
      width: "100%",
    },
    topbox: {
      margin: "0px 50px",
      // paddingTop: "0px",
    },
    formControl:{
      // background: "rgba(181, 193, 204, 0.43)",
      width:"100%",
      "& .MuiSelect-selectMenu":{
      //  border:"1px #b5c1cc",
       minHeight:"0rem",
       padding:"13px 14px",
      },
    },
  
    outlineborder1: {
      paddingTop: "8px",
      "& .react-tel-input .flag-dropdown ": {
        borderRight: "transparent",
        "&:hover": {
          backgroundColor: "skyblue !important",
        },
      },
      "& .react-tel-input .selected-flag": {
        "&:hover": {},
      },
      "& .react-tel-input .country-list": {
        background: "#B5C1CC6E",
      },
      "& .react-tel-input .flag-dropdown.open .selected-flag": {
        background: "#B5C1CC6E",
      },
    },
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
      fontFamily: 'Roboto',
fontStyle: "normal",
fontWeight: "500",
// fontSize: "20px",
// lineHeight: "23px",
      display:"flex",
      justifyContent:"flex-end",
      marginTop: "5px",
      // marginLeft:"5px",
      marginBottom: "30px",
    },
    linkbox1: {
      fontFamily: 'Roboto',
fontStyle: "normal",
fontWeight: "500",
fontSize: "15px",
lineHeight: "23px",
      display:"flex",
      justifyContent:"center",
      // marginTop: "5px",
      // marginLeft:"5px",
      marginBottom: "30px",
    },
  }));



  
 


  function Nlogin() {
    const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const classes = useStyles();
    const [phone, setPhone] = useState();
    const [country, setCountry] = React.useState("");
    const [countryCode, setCountryCode] = useState("");
    const handleChange = (event) => {
      setCountry(event.target.value);
    };

    const [email, setEmail] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [password, setName] = useState("");
    const [message, setMessage] = useState("");
  
    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let res = await fetch("http://172.16.1.35:1859/api-docs/#/CUSTOMER%20DASHBOARD/post_api_v1_user_signUp", {
          method: "POST",
          body: JSON.stringify({
            
            email: email,
            phoneno: phoneNo,
            password: password,
          }),
        });
        let resJson = await res.json();
        if (res.status === 200) {
         
          setEmail("");
          setphoneNo("");
          setMessage("User created successfully");
        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div>
        <Box className={classes.mainbox}>
          <Container maxWidth="md" Style={{width:"80%"}}>
            <Container maxWidth="sm" >
            <Box className={classes.container1}>
              <Box className={classes.box3}>
              <Box className={classes.typo1box}>
                <Typography variant="h4" className={classes.typo1}>
                  Login
                </Typography>
              </Box>
  
              <Formik
                initialValues={{

                  email: "",
                  phoneNo: "",
                  password: "",
                
                }}
                validationSchema={Yup.object().shape({
               
                  email: Yup
                  .string()
                  .email("You have entered an invalid email address. Please try again")
                  .required("Email address is required")
                  .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
                  phoneNo: Yup
                  .string()
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
                    "Password must include number , alphabets and special characters"
                  ),
  
                })}
                onSubmit={async ({
                  name,
                  message,
                  subject,
                  email,
                  
                  phonenumber,
                  password,
              
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
              
                    <Box className={classes.topbox}>
                      <Box className={classes.paddingBox}>
                        <Grid container>
                          <Grid item xs={12} sm={12}>
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
                              onChange={(e) => setEmail(e.target.value)}
                              
                              onBlur={handleBlur}
                            ></TextField>
                            <FormHelperText style={{ color: "red" }}>
                              {touched.email && errors.email}
                            </FormHelperText>
                          </Grid>
                        </Grid>
                      </Box>
  
                      <Box className={classes.paddingBox}>
                      <Grid item style={{ marginTop: "7px" }}>
                      <label style={{ marginBottom: "8px" }} className={classes.typo2}>
                        Mobile Number
                      </label>
                      <PhoneInput

                        country={"us"}
                        name="phoneNo"
                        inputStyle={{
                          background: "rgba(181, 193, 204, 0.43)",
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
                      <FormHelperText error style={{ fontSize: "12px" ,color: "red" }}>
                        {touched.phoneNo && errors.phoneNo}
                      </FormHelperText>
                    </Grid>
                      </Box>
  
                      <Box className={classes.paddingBox}>
                        <Grid container >
                          <Grid item xs={12}>
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
                         
                        </Grid>
                      </Box>
  
                      <Box className={classes.paddingBox}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Box className={classes.btntypo}>
                              <Button
                                variant="outlined"
                                className={classes.btn1}
                                type="submit"
                              >
                                Login
                              </Button>
                            </Box>
                          </Grid> 
                          <div className="message">{message ? <p>{message}</p> : null}</div>


                          <Grid item xs={12}>
                            <Box className={classes.linkbox}>
                    
                              <Link to="/ForgotPassword"
                                style={{ color: " #002E5B", cursor: "pointer",textDecoration:"none",
                              }}
                              >
                                Forgot password?
                              </Link>
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                          <Box className={classes.linkbox1}>
                              <b>New Customer?</b>
                            <Link to="/Signup"
                              style={{ color: " #002E5B",textDecoration:"none",
                            }}
                            >
                                <b>Register</b>
                              </Link>
                          </Box>
                        </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  
                  </Form>
                )}
                
              </Formik>
              </Box>
            </Box>
            </Container>
          </Container>
        </Box>
      </div>
    );
  }
  
  export default Nlogin;
  