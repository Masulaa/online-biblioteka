import React, {useState} from "react";
import { FiAtSign } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import { BsFillLockFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md"
import { FaLongArrowAltRight } from "react-icons/fa";
import '../account-components/SignUp.css';
import img01 from '../../images/slika1.png'
import { AuthService } from "../../api/api";

const SignUp = () => {

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const navigate = useNavigate();

  const showAccount = async (e) => {
    e.preventDefault();
   
    if(password.length === 0 || userName.length === 0 || email.length === 0 || firstName.length === 0 || lastName.length === 0 ){
      alert("Unesite informacije")
    }
   if(confirmedPassword!==password){
        alert("Niste tacno unijeli potvrdjenu lozinku")
      }
      else if (password.length < 8 || password.leght >=0) {
        alert("Sifra mora da bude minimum 8 karaktera.");
      }
      else if (userName && lastName && firstName && email && password){
        console.log("Username:" + userName + "\nFirst name:" + firstName + "\nLast name:" + lastName + "\nEmail: " + email + "\nPassword: " + password);
        navigate("/EvidentionOfBooks")
      }

    // if we made it through all the checks let's call API to register
    // Build user data - request body/payload object here
    const userData = {
      name: firstName,
      surname: lastName,
      email: email,
      username: userName,
      password: password,
      password_confirmation: confirmedPassword,
      device: "test",
    };

    // try sending API call to the API, if call fails for whatever reason we will "catch" the error
    try {
      const response = await AuthService.register(userData)
      console.log("API Response", response)
    } catch (error){
      console.error("Error calling registration API", error)
    }

  }

  return (
    <div className="limiter">
      <div className="container-signup">
        <div className="wrap-signup">
          <div className="signup-pic">
            <img src={img01} alt="IMG" />
          </div>

          <form className="signup-form" onSubmit={showAccount}>
            <span className="signup-form-title">Online Biblioteka</span>
            <span className="signup-form-title2">Create Your Account</span>

            <div className="wrap-input" data-validate="Username is required">
              <input onChange={(e)=>{setUserName(e.target.value)}} className="input polja" type="text" name="username" placeholder="Username" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FiAtSign />
              </span>
            </div>            

            <div className="wrap-input" data-validate="First name is required">
              <input onChange={(e)=>{setFirstName(e.target.value)}} className="input polja" type="text" name="firstname" placeholder="First name" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaUserAlt/>
              </span>
            </div>

            <div className="wrap-input" data-validate="Last name is required">
              <input onChange={(e)=>{setLastName(e.target.value)}} className="input polja" type="text" name="lastname" placeholder="Last name" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaUserAlt/>
              </span>
            </div>

            <div className="wrap-input" data-validate="Email is required">
              <input onChange={(e)=>{setEmail(e.target.value)}} className="input polja" type="email" name="email" placeholder="Email" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <MdEmail/>
              </span>
            </div>

            <div className="wrap-input" data-validate="Password is required">
              <input onChange={(e)=>{setPassword(e.target.value)}} className="input polja" type="password" name="pass" placeholder="Password" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <BsFillLockFill/>
              </span>
            </div>

         <div className="wrap-input" data-validate="Password is required">
              <input onChange={(e)=>{setConfirmedPassword(e.target.value)}} className="input polja" type="password" name="passconf" placeholder="Password Confirmation" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <BsFillLockFill/></span></div>

            <div className="container-login-form-btn">
            <button type="submit" className="signup-form-btn" onClick={showAccount}>Register</button>
            </div>

            <div className="loginbutton">
              <Link to="/Login"><span className="login-button"><FaLongArrowAltRight/>Login instead</span></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
