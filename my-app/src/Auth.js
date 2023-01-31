
//import React from "react"
import React, { useState } from 'react';

//const Auth = () => {
const isAuthenticated = false;
//}

const LoginComponent = () => {
console.log(isAuthenticated);
  const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
    const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
    }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: inputValue, password: inputValue2 }),

    });
    const data = await response.json();
    console.log(data);

    if (data.access_token) {
      console.log('token', data.access_token);
      localStorage.setItem('token', data.access_token);
      isAuthenticated = true;
      window.location.href = '/dashboard';
    }
    else {
      console.log('no token');
    };
    };

const handleItem = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await fetch('http://localhost:4000/users/me/items/', {
          method: 'GET',
      headers: { 'Content-Type': 'application/json', 'X-Token': token },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      alert('success');
    }
    else {
    alert('error');
    }
};
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              className="form-control mt-1"
              value={inputValue}
              placeholder="Enter email"
                onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              value={inputValue2}
              placeholder="Enter password"
                onChange={handleInputChange2}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export { LoginComponent };
//export { Auth };