import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";




const MyComponent = () => {

  const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
    const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
    }


  const handleSubmit = async () => {
    const response = await fetch('http://localhost:4000/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: inputValue, password: inputValue2 }),

    })
    const data = await response.json();
    console.log(data);

    if (data.access_token) {
    console.log('token', data.access_token);
      localStorage.setItem('token', data.access_token);
    }
    else {
      console.log('no token');
    };
    }
//    .then(response => {
//     console.log(response.json().access_token);
////        if (response.ok) {
////            console.log(response);
////            localStorage.setItem('token', response.json().access_token);
//////            window.location.href = "http://localhost:4000/dashboard";
////        }
////        else {
////            console.log("Error");
////        }
//    })
//
//    };


  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
        <input type="password" value={inputValue2} onChange={handleInputChange2} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyComponent;
// export default Form;