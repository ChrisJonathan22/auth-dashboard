import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Login() {
  return (
    <>
      <div>Login Page</div>

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          placeholder="Enter your username"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          placeholder="Enter your password"
        />
      </Box>
    </>
  );
}

export default Login;
