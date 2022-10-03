import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { } from "react-feather";
const useStyles = makeStyles((theme) => ({
  footerSection: {
    // background: "#f30065",
    position: "relative",
    padding: "50px 0px",
    backgroundPosition:" bottom left",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(4),
    },
    // "&"
    "& h5": {
      fontWeight: "bold",
      fontSize: "16px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#2f086a",
    },
    '& ul': {
      paddingLeft: "0",
    },
    "& p": {
      marginBottom: "0px",
      marginTop: "10px",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
      color: "#000000",
    },
  },
  footerBg: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    left: "0",
  },
  ListItem: {
    paddingLeft: "0px",
  },
  borderBottmo: {
    overflow: "hidden",
    background: "#000",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
  signupBtn: {
    color: "#fff",
    display: "flex",
    fontSize: "16px",
    fontWeight: "bold",
    height: "45px",
    minWidth: "100px",
    borderRadius: "50px",
    position: "absolute",
    top: "5px",
    right: "5px",
    boxShadow:
      "0px 8px 24px rgba(38, 50, 56, 0.1), 0px 16px 32px rgba(38, 50, 56, 0.08)",
    lineHeight: "36px",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: " 1px",
    background: "#040405",
    "&:hover": {
      background: "#040405",
      color: "#fff",
    },
  },
  largeIcon: {
    width: 18,
    height: 18,
    marginRight: "8px",
  },
  icons: {
    justify: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justify: "center",
    },
  },
  inputBox: {
    position: "relative",
  },
  footerBgImg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: "1",
  },
  textFild:{
    position:"relative",
    
    "& button":{
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      backgroundColor: "#000",
      minWidth: "90px",
      fontSize: "18px",
      fontWeight: "700",
      color: "#fff",
      "&:hover":{
        backgroundColor: "#000",
      },
    },
  },
}));

export default function Liquidity() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.footerSection}
      style={{backgroundImage:"url('./images/footerIMG.png')"}}
      >

        <Box style={{ margin: "20px 10px 0", position: "relative", zIndex: "2", }}>
          <Container maxWidth="lg">
            <Grid
              container
              justify="space-around"
              spacing={1}
            >
              <Grid item xs={12} md={3}>
                <img alt="" src="images/logo.png" />
                <p> Copyright @2021</p>
              </Grid>


              <Grid item xs={6} md={5} align="center">
                <Typography variant="h5">Find us on Social Media</Typography>
                <Box align="center" mt={3} mb={3} className="follow">
                  <img src="images/facebook-logo.png" alt="facebook" />
                  <img src="images/twitter-logo.png" alt="twitter" />
                  <img src="images/linkedin-logo.png" alt="linkedin" />
                  <img src="images/instagram-logo.png" alt="instagram" />
                </Box>
              </Grid>

              <Grid item xs={12} md={3} align="left">
                <Typography variant="h5">We’r always happy to help.</Typography>
                <Box mt={3} className={classes.textFild}>
                  <TextField id="outlined-basic" fullWidth variant="outlined" placeholder="Your e-mail"/>
                  <Button>I'm In</Button>
                </Box>
              </Grid>
            </Grid>
          </Container>

        </Box>
      </Box>
    </>
  );
}
