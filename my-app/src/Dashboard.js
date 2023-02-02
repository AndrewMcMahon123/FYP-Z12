import { useEffect, useState } from "react";

const Dashboard = () => {

    const loggedInUser = localStorage.getItem("authenticated");
    const token = localStorage.getItem("token");
    const [auth, setAuth] = useState(loggedInUser);
    const [tokenValid, setTokenValid] = useState(false);

    // check if token exists in local storage and then fetch to verify
    useEffect(() => {
  if (token) {
    const verifyToken = async (event) => {
      const response = await fetch("http://localhost:4000/verify_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
      });

      const data = await response.json();
      console.log(data);

        if (data.message === "Invalid access token") {
        setTokenValid(false);
        }
        else {
        setTokenValid(true);
        }
    };
    verifyToken();
  }
}, [token]);

  if (!loggedInUser || !tokenValid) {
    return (
      <div>
        <p>You are not logged in</p>
      </div>
    );
  }
  else {
    return (
      <div>
        <p>Welcome to your Dashboard</p>
      </div>
    );
  }
  }


export default Dashboard;
