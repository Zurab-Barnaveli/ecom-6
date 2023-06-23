import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import { Alert, Slide, Snackbar } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

const Register = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

  const { values, handleChange, errors, handleSubmit } =
    useFormik<RegisterFormData>({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
      },
      validationSchema,

      onSubmit: async (values: RegisterFormData) => {
        try {
          // Perform any necessary validation before storing the password in local storage
          // ...

          // Store the password in local storage
          localStorage.setItem("password", values.password);
          console.log("parol", values.password);

          // Proceed with other registration logic

          const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const data = await response.text();
          const parsedData = data ? JSON.parse(data) : null;

          if (response.ok) {
            // Store the token and userId in localStorage
            localStorage.setItem("lastName", values.lastName);
            localStorage.setItem("email", values.email);
            localStorage.setItem("firstName", values.firstName);
            const key = localStorage.getItem("token");
            console.log(key);

            console.log(parsedData);
            setOpen((prev) => !prev);
          } else {
            console.error(response.status);
            setErrorSnackbarOpen(true);
          }
        } catch (error) {
          console.error("error", error);
          setErrorSnackbarOpen(true);
        }
      },
    });

  return (
    <div>
      <h3>რეგისტრაცია</h3>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='firstName'
                  fullWidth
                  id='firstName'
                  label='First Name'
                  value={values.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='lastName'
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  value={values.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='email'
                  fullWidth
                  id='email'
                  label='Email'
                  value={values.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type='password'
                  name='password'
                  fullWidth
                  label='Password'
                  value={values.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type='password'
                  name='password2'
                  fullWidth
                  label='Confirm Password'
                  value={values.password2}
                  onChange={handleChange}
                  error={!!errors.password2}
                  helperText={errors.password2}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar
        autoHideDuration={2000}
        open={errorSnackbarOpen}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='error'
          sx={{
            width: "40%",
            top: "64px", // Add top position
            right: "24px", // Add right position
            position: "fixed",
            backgroundColor: "#d32f2f",
            color: "#fff",
            "& .MuiAlert-icon": {
              color: "white", // Change icon color to white
            },
          }}
        >
          Error occurred during registration.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
