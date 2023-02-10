import React from 'react';
import { useState } from 'react';

// verify access token
export function VerifyToken() {

    const token = localStorage.getItem("token");
    const [tokenValid, setTokenValid] = useState(false);

    if (token === null) {
      setTokenValid(false);
      window.location.href = "/auth";
    }
    const ver =  async (event) => {
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
        }
    };