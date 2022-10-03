import { Box } from "@material-ui/core";
import React from "react";
import Page from "src/component/Page";
// import Login from "./Banner";

// import Contact from "./Contact";
// import Signup from "./Signup";
// import Vform from "./Vform";
// import ForgotPassword from "./ForgotPassword";
import Nlogin from "./Nlogin";
// import App from "./App";


function Home(props) {
  return (
    <Page title="Marketplace | MetaArts">
      <Box>
      <Nlogin />       
      </Box>
    </Page>
  );
}

export default Home;
