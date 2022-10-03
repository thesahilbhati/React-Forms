import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    exact: true,
    path: "/Nlogin",
    component: lazy(() => import("src/views/pages/Home/Nlogin")),
  },
  {
    exact: true,
    path: "/ForgotPassword",
    component: lazy(() => import("src/views/pages/Home/ForgotPassword")),
  },
  {
    exact: true,
    path: "/Signup",
    component: lazy(() => import("src/views/pages/Home/Signup")),
  },
  {
    exact: true,
    path: "/Emailverify",
    component: lazy(() => import("src/views/pages/Home/Emailverify")),
  },

  


  {
    component: () => <Redirect to="/404" />,
  },
];
