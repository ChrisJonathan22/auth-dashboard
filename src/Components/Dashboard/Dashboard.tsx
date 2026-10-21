import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import "./Dashboard.css";

function Dashboard() {
  type User = {
    displayName: string;
    profilePicture: string;
  };

  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);

  async function logout() {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        return navigate("/login", { replace: true });
      } else {
        console.log("Logout failed on the server");
      }
    } catch (error) {
      console.log("Network error during logout", error);
    }
  }

  useEffect(() => {
    async function getUserData() {
      const loginCookie = await cookieStore.get("is_logged_in");

      if (!loginCookie) return navigate("/login", { replace: true });

      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.userData);
          console.log("Dashboard response: ", data);
          return;
        } else {
          await cookieStore.delete("is_logged_in");
          return navigate("/login", { replace: true });
        }
      } catch (error) {
        console.log("Auth verification failed", error);
      }
    }

    getUserData();
  }, [navigate]);

  return (
    <>
      <div className="login_container">
        <h1 id="title">Dashboard Page</h1>

        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <p>Welcome back! {userData?.displayName}</p>
          <img src={userData?.profilePicture} />
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" endIcon={<LogoutIcon />} onClick={logout}>
            Logout
          </Button>
        </Stack>
      </div>
    </>
  );
}

export default Dashboard;
