import { Fragment } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  

    main:{
      position: "relative",
      width: "100%",
      height: "100vh",
      
      background: "#FFFFFF",
      position:"relative",
  
    },
    paper: {
      margin:"135px 0px",  
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
    //    "@media(max-width:720px)":{
    //      width:"50%",
    //      margin:"60px -30px"
    //    },
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


const CustomForms = () => {
  const formInitialSchema = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    website: "",
    comment: "",
    termsAndCond: false,
    gender: "",
    picked: "",
  };

  const formValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Please enter Valid email"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")],"Passwords don't match").required("Confirm Password is required"),
    website: yup.string().required("Website is required"),
    comment: yup.string().required("Comment is required"),
    termsAndCond: yup.boolean().oneOf([true], "Terms and condition is required"),
  });

  const handleFormSubmit = (values) => {
    console.log("Submitted values", values);
  };

  const classes = useStyles();
  return (
    <Fragment className={classes.paper}>
      <Box className={classes.paper}>
        <Box>
          <h1>Sign UP</h1>
        </Box>

        <Box>
          <Formik
            initialValues={formInitialSchema}
            validationSchema={formValidationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ values }) => (
              <Form>
                <Box>
                <label>Name</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter your Name"
                  />

                
                    <ErrorMessage name="name" />
             
                </Box>
                <Box>
                <label>Email</label>

                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter your Email"
                  />
                  <p>
                    <ErrorMessage name="email" />
                  </p>
                </Box>
                <Box>
                <label>Gender</label>

                  <Field component="select" name="gender">
                    <option value="" disabled>
                      Please select
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                 
                    <ErrorMessage name="gender" />
                </Box>

                

                <Box>
                <label>Password</label>

                  <Field
                    type="text"
                    name="password"
                    placeholder="Enter your Password"
                  />
                  <p>
                    <ErrorMessage name="password" />
                  </p>
                </Box>

                <Box>
                <label>Confirm Password</label>

                  <Field
                    type="text"
                    name="confirmPassword"
                    placeholder="Enter your Password"
                  />
                  <p>
                    <ErrorMessage name="confirmPassword" />
                  </p>
                </Box>

                <Box>
                <label>URL</label>

                  <Field
                    type="text"
                    name="website"
                    placeholder="Enter your Website Address"
                  />
                  <p>
                    <ErrorMessage name="website" />
                  </p>
                </Box>
                <Box>
                <label>Comment</label>

                  <Field
                    type="text"
                    name="comment"
                    placeholder="Enter your Comment"
                  />
                  <p>
                    <ErrorMessage name="comment" />
                  </p>
                </Box>

                <Box>
                  <label className="form-inline">
                    <Field
                      type="checkbox"
                      name="termsAndCond"
                      placeholder="Enter your Comment"
                    ></Field>
                    Terms and condition
                  </label>
                  <p>
                    <ErrorMessage name="termsAndCond" />
                  </p>
                </Box>

                <Box>
                  <button type="submit">Submit Details</button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Fragment>
  );
};

export default CustomForms;
