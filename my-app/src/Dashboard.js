import { useEffect, useState } from "react";

const Dashboard = () => {
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    const token = localStorage.getItem("token");
    console.log(token)
    console.log(localStorage)
    // check if loggedInUser and token are in localstorage


    if (loggedInUser in localStorage && token in localStorage) {
    console.log('in')
      const verifyToken = async () => {
        const response = await fetch("http://localhost:4000/token/verify_user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token }),
        });
        const data = await response.json();
        console.log(data)
        if (data.message === "Token is valid") {
          setauthenticated(loggedInUser);
        }
      }
    }
  }, []);

  if (!authenticated) {
    return (
      <div>
        <p>You are not logged in</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Welcome to your Dashboard</p>
      </div>
    );
  }
};

export default Dashboard;
