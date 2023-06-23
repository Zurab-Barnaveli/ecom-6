/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Avatar, MenuItem, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Box from "@mui/material/Box";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import "./LogIn.scss";
import React from "react";
import User from "../User/User";
import jwtDecode, { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  isAdmin?: boolean;
}

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LogIn = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isReloaded, setIsReloaded] = useState<boolean>(false);

  const navigate = useNavigate();

  const { handleChange, submitForm, values, errors } = useFormik<LogInType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values: LogInType) => {
      try {
        const res = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          const data = await res.json();
          console.log("data", data.AccessToken);
          localStorage.setItem("token", data.AccessToken);
          localStorage.setItem("User", JSON.stringify(data.User));
          setIsAuth(true);
          window.location.reload();
        } else {
          console.log("status", res.status);
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  const handleLogOut = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    navigate("/");
    window.location.reload();
  };

  const handleOpenProfilePage = () => {
    navigate("/user");
  };

  const handleToggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  const token = localStorage.getItem("token");

  const decodedToken = token ? jwtDecode<CustomJwtPayload>(token) : {};
  const isAdmin = decodedToken.isAdmin;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const handleOpenAdminPage = () => {
    useEffect(() => {
      if (token && isAdmin && !isReloaded) {
        setIsReloaded(true);
      }
    }, []);
  };

  return (
    <>
      {isAuth ? (
        // Render the authenticated settings menu
        <Box sx={{ position: "relative" }}>
          <Button variant="contained" onClick={handleToggleSettings}>
            <AccountCircleIcon />
          </Button>
          {showSettings && (
            <Box
              sx={{
                position: "absolute",
                zIndex: 15,
                top: "40px",
                right: 0,
                width: "150px",
                backgroundColor: "#fff",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            >
              <MenuItem>
                <Typography color="success" onClick={handleLogOut}>
                  Logout
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography color="success" onClick={handleOpenProfilePage}>
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography color="success">Settinges</Typography>
              </MenuItem>
            </Box>
          )}
        </Box>
      ) : (
        <>
          <h3>ავტორიზაცია</h3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              margin: "0 10%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                name="email"
                fullWidth
                id="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ my: 2 }}
              />
              <TextField
                type="password"
                name="password"
                fullWidth
                label="Password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  submitForm();
                  handleOpenAdminPage();
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default LogIn;
