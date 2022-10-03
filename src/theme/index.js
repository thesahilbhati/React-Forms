import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
   
    MuiFormLabel: {
      root: { color: "#222" },
      colorSecondary: {
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiListSubheader: {
      root: {
        color: "#000000",
        fontSize: "22px !important",
        fontWeight: "600 !important",
        lineHeight: "33px !important",
      },
    },

    MuiOutlinedInput: {
      colorSecondary: {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          color: "#222",
          borderColor: "#222",
        },
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiPaper: {
      outlined: {
        padding: "20px",
        width: "100%",
      },
    },
    MuiPopover: {
      root: {
        zIndex: 99999,
      },
    },
    MuiListItem: {
      root:{
        alignItems: "self-start",
      },
      gutters: {
        paddingLeft: 0,
      },
    },
    MuiCheckbox: {
      root: {
        padding: "4px",
        fontSize: "12px",
      },
      colorSecondary: {
        "&.Mui-checked": { color: "#000" },
      },
    },
    MuiFormControlLabel: {
      root: {
        paddingBottom: "0",
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        right: 0,
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        Width: 450,
        maxWidth: "100%",
      },
      paper: {
        overflowY: "unset",
      },
      paperWidthSm:{
        maxWidth: "900px !important",
      },
    },
    MuiInputBase: {
      input: {
        fontSize: 14,
        color: "#222",
        height: "0.1876em",
      },
    },
    MuiBackdrop: {
      root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
    },
    MuiButton: {
      containedSecondary: {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "50px",
        color: "#fff",
        fontSize: "14px",
        backgroundColor:"#f30065",
        padding: "5px 19px",
      },

      containedPrimary: {
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "50px",
        color: "#f30065",
        fontSize: "15px",
        height: "40px",
        lineHeight: " 21px",
        padding: "10px 39px",
        marginRight:"10px",
        "&:hover": {
          backgroundColor:"#b2b2b2",
          color: "#fff",
        },
      },
      contained: {
        borderRadius: "50px",
        color: "#f30065",
        fontWeight: 600,
        padding: "5px 19px",

        "&:hover": {
          backgroundColor:"#f30065",

          color: "#fff",
        },
      },
      outlinedPrimary: {
        borderRadius: "50px",
        color: "#300760",
        fontWeight: 600,
        padding: "5px 19px",
        border: "2px solid #300760",
        "&:hover": {
          backgroundColor:"#f30065",
          border: "2px solid #f30065",
          color: "#fff",
        },
      },
      outlinedSizeSmall: {
        padding: "6px 23px",
        fontSize: "16px",
        lineHeight: " 24px",
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "0",
      },
    },
    MuiMenu: {
      paper: { top: "47px" },
    },

    MuiTypography: {
      subtitle1: {
        color: "#000",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: " 16px",
        colorSecondary :{
          color: "#8d8989",
      },
      },
    },
  },
};

const themesOptions = {
  typography: {
    fontWeight: 400,
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    type: "light",
    action: {
      primary: "#20509e",
    },
    background: {
      default: "#FBFBFD",
      dark: "#f3f7f9",
      paper: colors.common.white,
    },
    primary: {
      main: "#898989",
      dark: "#de0d0d",
      light: "#de0d0d",
    },
    secondary: {
      main: "#fff",
    },
    warning: {
      main: "#ffae33",
      dark: "#ffae33",
      light: "#fff1dc",
    },
    success: {
      main: "#54e18c",
      dark: "#54e18c",
      light: "#e2faec",
    },
    error: {
      main: "#ff7d68",
      dark: "#ff7d68",
      light: "#ffe9e6",
    },
    text: {
      primary: "#52565c",
      secondary: "#999999",
    },
    common: {
      black: "#222222",
    },
  },
};

export const createTheme = (config = {}) => {
  let theme = createMuiTheme(_.merge({}, baseOptions, themesOptions));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
