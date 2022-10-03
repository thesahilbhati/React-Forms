import React from 'react';
import { Formik } from 'formik';
import { Typography,TextField,Button,Box, Container,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';



const useStyles = makeStyles((theme) => ({
  

  main:{
    position: "relative",
    width: "100%",
    height: "100vh",
    
    background: "#FFFFFF",
    position:"relative",

  },
  paper: {
    // margin:"135px -50px",  
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: "#FFFFFF",
    boxShadow: "0px 0px 35px 17px rgba(78, 78, 78, 0.2)",
    borderRadius: "10px",
    transform: "rotate(-0.06deg)",
    height:"90vh",  
    position:"absolute",
     width:"50%",
     "@media(max-width:720px)":{
       width:"50%",
       margin:"60px -30px"
     },
    // white-space: normal;
  },
  h5:{
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "40px",
    lineHeight: "47px",
  
  
  color: "#002E5B",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width:"100%",
    
  },
  typo:{
    fontFamily: 'Roboto',
fontStyle: "normal",
fontWeight: "400",
fontSize: "20px",
lineHeight: "23px",

color: "#000000",
padding:"10px 0px",

  },
  Shadow:{
    background: "rgba(181, 193, 204, 0.43)",
bordeRadius: "5px",
  },
  form: {
    // marginLeft:theme.spacing(3),
    width: '75%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
    background: "#3AADE1",
    height:"9vh",
borderRadius: "10px",
fontFamily: 'Roboto',
fontStyle: "normal",
fontWeight: "700",
fontSize: "25px",
lineHeight: "29px",
color:"#ffffff"
  },
  forget:{
    borderRadius: "10px",
fontFamily: 'Roboto',
fontStyle: "normal",
fontWeight: "500",
fontSize: "22px",
lineHeight: "26px",
color:"#002E5B"
  }
}));

const Basic = () => {
  const classes = useStyles();
return(
  <>
  <div >
    <Formik
      initialValues={{ 
        email: '', 
         password: ''
         }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }else if(!values.password){
            errors.password ='Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
 
  
   
  <Box className={classes.main}>
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>

      </Avatar>
      <Typography className={classes.h5}>
       <b> Login </b>       
         </Typography>
      <form className={classes.form} noValidate>
      <Typography className={classes.typo}>Email ID</Typography>
        <TextField className={classes.Shadow}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            autoComplete="email"
          autoFocus
         
        />
        {errors.email && touched.email && errors.email}
        <Typography className={classes.typo}>Mobile Number</Typography>
        <TextField className={classes.Shadow}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          placeholder="Mobile Number"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Typography className={classes.typo}>Password</Typography>
        <TextField className={classes.Shadow}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          id="password"
          autoComplete="current-password"
        />
        {errors.password && touched.password && errors.password}

        <Button
          type="submit"
          fullWidth
     
          className={classes.submit}
        >
          Login
        </Button>
        <Grid container>
          <Grid item xs style={{display:"flex",justifyContent:"end"}}>
            <Link href="#" className={classes.forget}>
              Forgot password?
            </Link>
          </Grid>
          
          
                                                                                                                                           
        </Grid>
        

      </form>
    </div>
    <Box mt={8}>
    </Box>
  </Container>
  </Box>
  )}
  </Formik>
  </div>
  </>
 
);
      }

export default Basic;