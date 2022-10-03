import React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Link from "@material-ui/core/Link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
    boxShadow: "0px 0px 35px 17px rgba(78, 78, 78, 0.2)",
  },

  typo1: {
    padding: "20px 0px",
    fontSize: "40px",
    color: " #002E5B",
    fontFamily: "Roboto",
  },
  typo2: {
    fontSize: "20px",
    fontFamily: "Roboto",
    display: "flex",
  },
  btn1: {
    fontSize:'20px',
    marginTop: "10px",
    borderRadius: "7px",
    // width: "40%",
    backgroundColor: "#3AADE1",
  },
  btn2: {
    backgroundColor: "#F2CB6A",
  },

  textfield:{
    textAlign:"center",
    background: "rgba(181, 193, 204, 0.43)",
    marginTop: "8px",
    "& .MuiOutlinedInput-input":{
      textAlign:'center',
    },
  },
  typo1box: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "centre",
    width: "100%",
  },
  topbox: {
    margin: "0px 50px",
  
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
    marginBottom: "30px",
    "& Button": {
      color: "#ffffff",
      "&:hover": {
        color: "#000000",
      },
    },
  },
  linkbox: {
    width:'100%',
    display:"flex",
    justifyContent:"center",
    marginTop: "50px",
    marginBottom: "30px",
  },
  fpbox: {
    display: "flex",
    justifyContent: "flex-end",
  },
  gobackbox: {
    width: "100%",
    justifyContent: "flex-start",
    display: "flex",
    margin: "10px 50px",
  },
  canclebox:{
    width:"100%",
    color:"#ff0000",
    display:'flex',
    justifyContent:"flex-end",
  },
  timerbox:{
    width:"100%",
    display:"flex",
    justifyContent:"center",
    textAlign:"center",
  },
  timertypo:{
    color:"green",
    margin:"10px 0px",
    fontSize:"22px"
  },
}));
function Emailverify() {
  const classes = useStyles();
  const [country, setCountryCode] = useState();

  return (
    <div>
      <Box className={classes.mainbox}>
        <Container maxWidth="md">
          <Box className={classes.container1}>
            <Box className={classes.canclebox}>
            <CancelOutlinedIcon />
            </Box>
            <Box className={classes.typo1box}>
              <Typography variant="h4" className={classes.typo1}>
                Verify Your Email
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#676767", fontSize: "22px",padding:"0px 10px " }}
              >
                We have sent the Verify code to the <br></br> ******9878 

                &nbsp;
                <Link    style={{
                  color: " #3AADE1",
                  cursor: "pointer",
                  fontSize: "20px",
                }}>Change</Link> 
              </Typography>
            </Box>

            <Container maxWidth="sm">
              <Box className={classes.topbox}>
                <Box className={classes.paddingBox}>
                </Box>
                
                <Box className={classes.paddingBox}>
                  <Box>
                      <Typography className={classes.typo2}>
                        Enter The Code
                      </Typography>
                      </Box>
                  <Grid container spacing={2}>

                    <Grid item xs={2} sm={2}  md={2} lg={2}>
                      <TextField
                        className={classes.textfield}
                        name=""
                        type="number"
                        label=""
                        variant="outlined"
                        placeholder="1"
                      ></TextField>
                    </Grid>
                    <Grid item xs={2} sm={2}  md={2} lg={2}>
                      <TextField
                        className={classes.textfield}
                        type="number"
                        label=""
                        variant="outlined"
                      ></TextField>
                    </Grid>
                    <Grid item xs={2} sm={2}  md={2} lg={2}>
                      <TextField
                        className={classes.textfield}
                        type="number"
                        label=""
                        variant="outlined"
                      ></TextField>
                    </Grid>
                    <Grid item xs={2} sm={2}  md={2} lg={2}>
                      <TextField
                        className={classes.textfield}
                        type="number"
                        label=""
                        variant="outlined"
                      ></TextField>
                    </Grid>
                    <Grid item xs={2} sm={2}  md={2} lg={2}>
                      <TextField
                        className={classes.textfield}
                        type="number"
                        label=""
                        variant="outlined"
                      ></TextField>
                    </Grid>
                    <Grid item xs={2} sm={2}  md={2} lg={2}>
                      <TextField
                        className={classes.textfield}
                        type="number"
                        label=""
                        variant="outlined"
                      ></TextField>
                    </Grid>
                  </Grid>
                </Box> 
                  <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box className={classes.timerbox}>
                    <Typography className={classes.timertypo} >01:00</Typography>
                  </Box>
                  </Grid>
                  </Grid>

                <Box className={classes.paddingBox}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Box className={classes.btntypo}>
                        <Button
                          fullWidth
                          variant="outlined"
                          className={classes.btn1}
                          type="submit"
                        >
                          Verify
                        </Button>
                      </Box>
                    </Grid>

                   
                  </Grid>
                </Box>

                <Grid container spaing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box className={classes.linkbox}>
                    Didn't receive an Email? &nbsp;
                  <Link style={{color:" #002E5B",cursor:"pointer"}}>Resend</Link>
                  </Box>
                    </Grid>
                  </Grid>

              </Box>
            </Container>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Emailverify;
