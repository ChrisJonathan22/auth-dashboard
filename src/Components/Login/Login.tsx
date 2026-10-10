import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Stack from "@mui/material/Stack";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function auth(username: string, password: string) {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    setUsername("");
    setPassword("");

    return response.json();
  }

  return (
    <>
      <div className="login_container">
        <h1 id="title">Login Page</h1>

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
            value={username}
            onChange={(e) => {
              return setUsername(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              return setPassword(e.target.value);
            }}
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              endIcon={<LoginIcon />}
              onClick={() => {
                return auth(username, password);
              }}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default Login;
