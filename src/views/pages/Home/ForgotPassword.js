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
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  makeStyles,
  TextField,
  Button,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import Link from "@material-ui/core/Link";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    width: "100%",
// 
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  mainbox: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  container1: {
    width: "100%",
    margin: "0px 0px",
    // justifyContent: "center",
    padding: "inherit",
    display: "flex",
    flexWrap: "wrap",
    borderRadius: "5px",
    height: "70vh",
    boxShadow: "0px 0px 35px 17px rgb(78 78 78 / 42%)",
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
    
  },
  formControl: {
    // background: "rgba(181, 193, 204, 0.43)",
    width: "100%",
    "& .MuiSelect-selectMenu": {
      //  border:"1px #b5c1cc",
      minHeight: "0rem",
      padding: "13px 14px",
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
    padding: "",
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
  btnback: {
    color: "#3AADE1",
  },
  back: {
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    color: "#3AADE1",
    fontSize: "0.5rem",
  },
}));
function ForgotPassword() {
  const classes = useStyles();

  const [country, setCountry] = React.useState("");
  const [countryCode, setCountryCode] = useState("");
  const handleChange = (event) => {
    setCountry(event.target.value);
  };
  const history = useHistory();

  function goback() {
    history.push("/Nlogin");
  }

  return (
    <div>
      <Box className={classes.mainbox}>
        <Container maxWidth="sm">
          <Box className={classes.container1}>
            <Box style={{ float: "left" }}>
              <Box className={classes.back}>
             
                <Button className={classes.btnback} onClick={goback}>
                <IconButton className={classes.icon}>
                <ArrowBackIosIcon />
                Go Back
              </IconButton>
             
                </Button>
              </Box>
            </Box>

            <Box className={classes.typo1box}>
              <Typography variant="h4" className={classes.typo1}>
                Forgot Password
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#676767", fontSize: "17px" }}
              >
                Lorem Ipsum is simply dummy text of the printing <br />
                and typesetting industry.
              </Typography>
            </Box>

            <Formik
              initialValues={{
                phoneNo: "",
              }}
              validationSchema={Yup.object().shape({
                phoneNo: Yup.string()
                  .required("*Phone number not registered.")
                  .matches(
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                    "*Phone number not registered."
                  )
                  .max(13, "Should not exceeds 13 digits")
                  .min(9, "Must be only 9 digits"),
              })}
              onSubmit={async ({
                name,
                message,
                subject,

                phonenumber,
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
                      <Grid item>
                        <label
                          style={{ marginBottom: "8px" }}
                          className={classes.typo2}
                        >
                          Mobile Number
                        </label>
                        <PhoneInput
                          country={"us"}
                          name="phoneNo"
                          inputStyle={{
                            //background: "transparent",
                            width: "100%",
                            color: "#848484",
                            border: "1px solid #848484",
                            height: "37px",
                            marginTop: "5px",
                            background: "rgba(181, 193, 204, 0.43)",

                            borderRadius: "5px",
                          }}
                          value={values.phoneNo}
                          error={Boolean(touched.phoneNo && errors.phoneNo)}
                          onBlur={handleBlur}
                          onChange={(phone, e) => {
                            setCountryCode(e.dialCode);
                            setFieldValue("phoneNo", phone);
                          }}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {touched.phoneNo && errors.phoneNo}
                        </FormHelperText>
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
                              Submit
                            </Button>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                        <Box>
                
                          <Link to="/Emailverify"
                            style={{ color: " #002E5B", cursor: "pointer",textDecoration:"none",
                          }} >
                            Verify OTP Click here
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
        </Container>
      </Box>
    </div>
  );
}

export default ForgotPassword;
