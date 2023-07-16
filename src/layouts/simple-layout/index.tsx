import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { storageKeys } from "../../constants/storageKeys";
import { Link } from "react-router-dom";
import { Link as Href } from "@mui/material";


function Copyright({ props }: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Href color="inherit" href="https://mtwebdev.ir/">
        MTWEBDEV Website
      </Href>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SimpleLayout() {
  useEffect(() => {
    //خط زیر فقط در زمان ایجاد کامپوننت اجرا شود
    localStorage.removeItem(storageKeys.loginInfo);
    console.log("create simple-layout...");

    // window.addEventListener
    // return () => {
    //   window.removeEventListener
    // }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Link to="/">

        </Link>
        <Outlet />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
