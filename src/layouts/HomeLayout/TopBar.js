import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Grid,
  MenuItem,
  Box,
  Container,
  Menu,
  Grow,
  Paper,
  Popper,
  MenuList,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "./../../component/Logo";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Roadmap",
    href: "/roadmap",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Wallet",
    href: "/wallet",
  },
];

const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "500",
    borderRadius: 0,
    minWidth: "auto",
    color: "#757575",
    height: "31px",
    padding: "0px 7px",
    letterSpacing: "1px",
    marginLeft: "15px",
    "@media (max-width: 900px)": {
      fontStyle: "normal",
      letterSpacing: "-0.6px",
      lineHeight: "24px",
      color: "#FFF",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "&:active": {
      color: "#1ed760",
    },
    "&:hover": {
      color: "#d00167",
    },
  },
  menuButton1: {
    width: "100%",
  },
  toolbar: {
    display: "flex",
    padding: "10px 0",
    justifyContent: "space-between",
    height: "100%",
    "@media (max-width: 900px)": {
      paddingLeft: "75px",
      paddingRight: "20px",
      height: "100%",
    },
  },
  maindrawer: {
    height: "100%",
    background: "#0c0731",
    width: "260px",
  },
  logoDrawer: {
    paddingLeft: "10px",
    width: "140px",
    marginBottom: "30px",
  },
  drawerContainer: {
    padding: "20px 0px ",
    height: "100%",
    background: "#000",
    width: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawericon: {
    color: "#000",
    position: "absolute",
    top: "0px",
    right: "-10px",
    fontSize: "25px",
  },
  logoImg: {
    width: "75px",
    // height: '44.5px',
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
    },
  },
  menuMobile: {
    fontSize: "16px",
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: "-0.6px",
    lineHeight: "1.75",
    color: "#fff",
    borderBottom: "1px solid #3e3e3e",
    padding: "16px",
    "@media (max-width: 500px)": {
      padding: "7px 0",
      width: "100%",
    },
  },
  paper1: {
    background: "black",
    color: "white",
  },
  containerHeight: {
    height: "100%",
  },
  mainHeader: {
    justifyContent: "space-between",
    padding: "0px",
  },
  search: {
    height: "31px",
    position: "relative",
    color: "#ABABAB",
    borderRadius: "100px",
    backgroundColor: "#E6E6E6",
    border: "1px solid #fff",
    "&:hover": {
      backgroundColor: "#ececec",
      border: "1px solid #300760",
    },
    marginLeft: 20,
    width: "140px",
    maxWidth: "257px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "180px",
    },
  },
  searchIcon: {
    fontSize: "16px",
    padding: theme.spacing(0, 2),
    color: "#000000",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    fontSize: "16px",
  },
  wallet: {
    fontSize: "14px",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "21px",
    color: "#fff",
    border: "1px solid #ec0066",
    padding: "0 15px",
    background: "#ec0066",
    borderRadius: "50px",
    height: "31px",
    "&:hover": {
      background: "#fff",
      color: "#ec0066",
    },
    "@media (max-width: 900px)": {
      marginLeft: "12px",
      marginTop: "12px",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: "13px",
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100px",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
  submenu: {
    borderTop: "3px solid #300760",
    top: "25px !important",
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const {
    menuMobile,
    menuButton,
    menuButton1,
    toolbar,
    drawerContainer,
    drawericon,
    logoDrawer,
    containerHeight,
    mainHeader,
    wallet,
    submenu,
  } = useStyles();
  const history = useHistory();
  console.log(history.location);

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const [open1, setOpen1] = useState({ community: false, user: false });
  const anchorRef = { community: useRef(null), user: useRef(null) };

  // const handleToggle = (name) => {
  //   setOpen1({ ...open1, [name]: !open1[name] });
  // };

  const handleClose2 = (event, name) => {
    if (
      anchorRef[name].current &&
      anchorRef[name].current.contains(event.target)
    ) {
      return;
    }

    setOpen1({ ...open1, [name]: false });
  };

  function handleListKeyDown(event, name) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen1({ ...open1, [name]: false });
    }
  }

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(open1);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open1 === false) {
  //     anchorRef.current.focus();
  //   }

  //   prevOpen.current = open1;
  // }, [open1]);

  const displayDesktop = () => {
    return (
      <Container maxWidth="lg" className="p-0">
        <Toolbar className={toolbar}>
          {femmecubatorLogo}
          <Grid
            container
            item
            direction="row"
            justify="flex-end"
            alignItems="center"
            style={{ paddingLeft: "0px" }}
          >
            {/* <div className={search}>
              <div className={searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search items, collections, creators"
                classes={{
                  root: inputRoot,
                  input: inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div> */}
            {getMenuButtons()}
            {/* <Button
              ref={anchorRef.community}
              aria-controls={open1.community ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={() => handleToggle("community")}
              endIcon={<ExpandMoreIcon />}
              className={menuButton}
            >
              Community
            </Button> */}
            <Popper
              open={open1.community}
              anchorEl={anchorRef.community.current}
              role={undefined}
              transition
              disablePortal
              className={submenu}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener
                      onClickAway={(e) => handleClose2(e, "community")}
                    >
                      <MenuList
                        autoFocusItem={open1}
                        id="menu-list-grow"
                        onKeyDown={(e) => handleListKeyDown(e, "community")}
                      >
                        <MenuItem component={Link} to="/fungy-token">
                          Fungy Token
                        </MenuItem>
                        <MenuItem component={Link} to="/faq">
                          Discussion
                        </MenuItem>
                        <MenuItem>Voting</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Toolbar>
      </Container>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={mainHeader}>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            <img className={logoDrawer} src="images/footerlogo.png" alt="" />
            {getDrawerChoices()}
            <Button
              className={wallet}
              aria-controls="simple-menu"
              aria-haspopup="true"
              to="/wallet"
              component={Link}
            >
              Connect wallet
            </Button>
          </div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
        <Grid container>
          <Grid item xs={10}>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              className={drawericon}
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
              }}
            >
              <MenuIcon
                width="60px"
                height="60px"
                style={{ color: "#197ab3", fontSize: "30px" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: menuButton1,
            }}
          >
            <MenuItem className={menuMobile}>{label}</MenuItem>
          </Button>
        </>
      );
    });
  };

  const femmecubatorLogo = (
    <Box>
      <Link to="/">
        <Logo className="logoImg" />
      </Link>
    </Box>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: menuButton,
            }}
          >
            {label}
          </Button>
        </>
      );
    });
  };

  return (
    <>
      <AppBar
        position={history.location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{ backgroundColor: "#ccc0", border: "none" }}
      >
        <Container
          maxWidth={history.location.pathname !== "/" ? "lg" : "fixed"}
          className={containerHeight}
        >
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose1}
      >
        <MenuItem>
          <Link to="/profile">My Profile</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/user">My Nft</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/resell-nft">Resell Nft</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/create-nft">Create NFT</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/notification">Notification</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/search">Search</Link>
        </MenuItem>
      </Menu>
    </>
  );
}
