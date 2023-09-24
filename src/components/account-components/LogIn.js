import React, { useState } from "react";
import { FiAtSign } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { BsFillLockFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./LogIn.css";
import img01 from "../../images/slika1.png";

import { AuthService } from "../../api/api";

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const showAccount = async (e) => {
    e.preventDefault();
    if (userName && password) {
      if (password.length < 8) {
        return alert("Sifra mora da bude minimum 8 karaktera.");
      } else {
        console.log("Username: " + userName + "\nPassword: " + password);
      }
    } else {
      return alert("Molimo vas da unesete i username i sifru.");
    }

    // if we made it through all the checks let's call API to register
    // Build user data - request body/payload object here

    const userData = {
      username: userName,
      password: password,
      device: "test",
    };

    // try sending API call to the API, if call fails for whatever reason we will "catch" the error
    try {
      const response = await AuthService.signup(userData);
      console.log("API Response", response);
      navigate("/EvidentionOfBooks");
    } catch (error) {
      console.error("Error calling registration API", error);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login">
        <div className="wrap-login">
          <div className="login-pic">
            <img src={img01} alt="IMG" />
          </div>

          <form className="login-form" onSubmit={showAccount}>
            <span className="login-form-title">Online Biblioteka</span>
            <span className="login-form-title2">Log Into Your Account</span>

            <div className="wrap-input" data-validate="Username is required">
              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="input polja"
                type="text"
                name="username"
                placeholder="Username"
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FiAtSign />
              </span>
            </div>

            <div className="wrap-input" data-validate="Password is required">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input polja"
                type="password"
                name="pass"
                placeholder="Password"
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <BsFillLockFill />
              </span>
            </div>

            <div className="container-login-form-btn">
              <button
                type="submit"
                className="login-form-btn"
                onClick={showAccount}
              >
                Login
              </button>
            </div>

            <div>
              <Link to="" className="a">
                <p className="forgot">Forgot Username / Password?</p>
              </Link>
            </div>

            <div className="signupbutton">
              <Link to="/sign-up" className="a">
                <span className="signup-button">
                  <FaLongArrowAltRight />
                  Create your account
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
