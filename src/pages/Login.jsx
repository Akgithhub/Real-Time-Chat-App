import React, { useEffect, useState } from "react";
import { userAuth } from "../utiles/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { user, handleUserLogin } = userAuth();
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

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
              handleUserLogin(e, credentials);
            }}
          >
            <div className="field--wrapper">
              <label htmlFor="">Email:</label>
              <input
                type="email"
                placeholder="Enter your email..."
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
                name="password"
                value={credentials.password}
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
            Don't have an account? Register{" "}
            <Link to={"/registerpage"}>Here</Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
