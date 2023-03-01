import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./App.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faKey);

function App() {
  const [password, setPassword] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const token = urlParams.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a request to the server to reset the password
    const response = await fetch(
      `https://fierce-tick-overalls.cyclic.app/resetPassword?userId=${userId}&token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: password,
        }),
      }
    );

    // Handle the response from the server
    const data = await response.json();
    console.log(data);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="App">
      <h1 style={{ marginTop: "80px" }}>Set New Password   <FontAwesomeIcon
        icon="key"
      /></h1>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="New Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit" style={{fontFamily: 'Pacifico',  textTransform: 'none'}}>
          Save 
        </Button>
      </form>
    </div>
  );
}

export default App;
