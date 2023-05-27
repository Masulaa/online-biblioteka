import React, {useState} from "react";
import { FiAtSign } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BsFillLockFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import './LogIn.css';
import img01 from '../images/slika1.png'

const SignUp = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const showAccount = (e) => {
    e.preventDefault();
    if (userName && password) {
      if (password.length < 8) {
        alert("Sifra mora da bude minimum 8 karaktera.");
      } else {
        alert("Username: " + userName + "\nPassword: " + password);
      }
    } else {
      alert("Molimo vas da unesete i email i sifru.");
    }
  }

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
              <input onChange={(e)=>{setUserName(e.target.value)}} className="input" type="text" name="username" placeholder="Username" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FiAtSign />
              </span>
            </div>            

            <div className="wrap-input" data-validate="Password is required">
              <input onChange={(e)=>{setPassword(e.target.value)}} className="input" type="password" name="pass" placeholder="Password" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <BsFillLockFill/>
              </span>
            </div>

            <div className="container-login-form-btn">
              <button type="submit" className="login-form-btn">Login</button>
            </div>

            <div>
              <Link to="">
                <p className="forgot">
                Forgot Username / Password?</p>
              </Link>
            </div>

            <div className="signupbutton">
              <Link to="/"><span className="signup-button"><FaLongArrowAltRight/>Create your account</span ></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
