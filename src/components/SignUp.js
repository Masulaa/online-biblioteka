import React, {useState} from "react";
import { FiAtSign } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa"
import { Link } from "react-router-dom";
import { BsFillLockFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md"
import { FaLongArrowAltRight } from "react-icons/fa";
import './SignUp.css';
import img01 from '../images/slika1.png'

const SignUp = () => {

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("")

  const showAccount = (e) => {
    e.preventDefault();
    if (userName && lastName && firstName){
      alert("Username:" + userName + "\nFirst name:" + firstName + "Last name:" + lastName);
    }
    else{
      alert("Unesite informacije")
    }
    if (email && password && confirmedPassword) {
      if(confirmedPassword!==password){
        alert("Niste tacno unijeli potvrdjenu lozinku")
      }
      if (password.length < 8 && confirmedPassword!==password) {
        alert("Sifra mora da bude minimum 8 karaktera.");
      } else {
        alert("Email: " + email + "\nPassword: " + password);
      }
    } else {
      alert("Molimo vas da unesete i email i sifru.");
    }
  }

  return (
    <div className="limiter">
      <div className="container-signup">
        <div className="wrap-signup">
          <div className="signup-pic js-tilt">
            <img src={img01} alt="IMG" />
          </div>

          <form className="signup-form" onSubmit={showAccount}>
            <span className="signup-form-title">Online Biblioteka</span>
            <span className="signup-form-title2">Create Your Account</span>

            <div className="wrap-input" data-validate="Username is required">
              <input onChange={(e)=>{setUserName(e.target.value)}} className="input" type="text" name="username" placeholder="Username" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FiAtSign />
              </span>
            </div>            

            <div className="wrap-input" data-validate="First name is required">
              <input onChange={(e)=>{setFirstName(e.target.value)}} className="input" type="text" name="firstname" placeholder="First name" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaUserAlt/>
              </span>
            </div>

            <div className="wrap-input" data-validate="Last name is required">
              <input onChange={(e)=>{setLastName(e.target.value)}} className="input" type="text" name="lastname" placeholder="Last name" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaUserAlt/>
              </span>
            </div>

            <div className="wrap-input" data-validate="Email is required">
              <input onChange={(e)=>{setEmail(e.target.value)}} className="input" type="email" name="email" placeholder="Email" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <MdEmail/>
              </span>
            </div>

            <div className="wrap-input" data-validate="Password is required">
              <input onChange={(e)=>{setPassword(e.target.value)}} className="input" type="password" name="pass" placeholder="Password" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <BsFillLockFill/>
              </span>
            </div>

         <div className="wrap-input" data-validate="Password is required">
              <input onChange={(e)=>{setConfirmedPassword(e.target.value)}} className="input" type="password" name="passconf" placeholder="Password Confirmation" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <BsFillLockFill/></span></div>

            <div className="container-login-form-btn">
              <button type="submit" className="signup-form-btn">Register</button>
            </div>

            <div className="loginbutton">
              <Link to="/Login" className="login-link"><span className="loginicon"><FaLongArrowAltRight/></span>Login instead</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
