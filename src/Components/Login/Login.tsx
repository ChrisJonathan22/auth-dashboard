import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function auth(username: string, password: string) {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include", // Tell the browser to save incoming cookies
    });

    setUsername("");
    setPassword("");

    // console.log("Response:", response.json());

    return response.json();
  }

  useEffect(() => {
    async function checkSessionAndRedirect() {
      const loginCookie = await cookieStore.get("is_logged_in");

      if (!loginCookie) return;

      try {
        const response = await fetch("http://localhost:3000/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          return navigate("/dashboard", { replace: true });
        } else {
          await cookieStore.delete("is_logged_in");
        }
      } catch (error) {
        console.log("Auth verification failed", error);
      }
    }

    checkSessionAndRedirect();
  }, [navigate]);

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
