import React, { useState } from "react";
import { userAuth } from "../utiles/AuthContext";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { HandleUserRegister } = userAuth();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const handleInputchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setcredentials({
      ...credentials,
      [name]: value,
    });
    console.log(credentials);
  };
  return (
    <>
      <div className="auth--container">
        <div className="form--wrapper">
          <form
            action=""
            onSubmit={(e) => {
              HandleUserRegister(e, credentials);
            }}
          >
            <div className="field--wrapper">
              <label htmlFor="">Name:</label>
              <input
                type="text"
                placeholder="Enetr your Name..."
                required
                name="name"
                value={credentials.name}
                onChange={handleInputchange}
              />
            </div>
            <div className="field--wrapper">
              <label htmlFor="">Email:</label>
              <input
                type="email"
                placeholder="Enetr your email..."
                required
                name="email"
                value={credentials.email}
                onChange={handleInputchange}
              />
            </div>
            <div className="field--wrapper">
              <label htmlFor="">Password:</label>
              <input
                type="password"
                placeholder="Enter your Password..."
                required
                name="password1"
                value={credentials.password1}
                onChange={handleInputchange}
              />
            </div>
            <div className="field--wrapper">
              <label htmlFor="">Password:</label>
              <input
                type="password"
                placeholder="Conform your Password..."
                required
                name="password2"
                value={credentials.password2}
                onChange={handleInputchange}
              />
            </div>
            <div className="field--wrapper">
              <input
                type="submit"
                value={"login"}
                className="btn btn--lg btn--main"
              />
            </div>
          </form>
          <p>
            Already have an account? Login <Link to={"/login"}>Here</Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
