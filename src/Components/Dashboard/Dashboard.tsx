import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import "./Dashboard.css";

function Dashboard() {
  type User = {
    displayName: string;
    profilePicture: string;
  };

  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);

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
      </div>
    </>
  );
}

export default Dashboard;
