import {react, useState} from "react"
import "./Settings.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import settigsIcon from "../../images/undraw_typewriter_re_u9i2.svg"

const Settings = () =>{

  const Lorem = `Lorem ipsum dolor sit amet,
  consectetur adipisicing elit.
   Earum eligendi nihil, vel 
   necessitatibus saepe laboriosam!
    Perspiciatis laboriosam culpa veritatis
     ea voluptatum commodi tempora unde, dolorum
      debitis quia id dicta vitae. `

    const [currentStep, setCurrentStep] = useState(1);

    const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

    const handleLinkClick = (step) => {
        setCurrentStep(step);
      };

    return (
        <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
         <div className="naslov"><div className="illustrations">
           <img src={settigsIcon} className="illustration"></img> 
           <h1>Podesavanja</h1></div>
         </div> 
         <Link>
          <button
            className={`toggle-button ${currentStep === 1 ? "active" : ""}`}
            onClick={() => handleLinkClick(1)}
          >
            Polisa
          </button>
        </Link>
        <Link className="link-p">
          <button
            className={`toggle-button ${currentStep === 2 ? "active" : ""}`}
            onClick={() => handleLinkClick(2)}
          >
           Kategorije
          </button>
        </Link>
        <Link className="link-p">
          <button
            className={`toggle-button ${currentStep === 3 ? "active" : ""}`}
            onClick={() => handleLinkClick(3)}
          >
            Zanrovi
          </button>
        </Link>
        <Link className="link-p">
          <button
            className={`toggle-button ${currentStep === 4 ? "active" : ""}`}
            onClick={() => handleLinkClick(4)}
          >
            Izdavac
          </button>
        </Link>
        <Link className="link-p">
          <button
            className={`toggle-button ${currentStep === 5 ? "active" : ""}`}
            onClick={() => handleLinkClick(5)}
          >
            Povez
          </button>
        </Link>
        <Link className="link-p">
          <button
            className={`toggle-button ${currentStep === 6 ? "active" : ""}`}
            onClick={() => handleLinkClick(6)}
          >
            Format
          </button>
        </Link>
        <Link className="link-p">
          <button
            className={`toggle-button ${currentStep === 7 ? "active" : ""}`}
            onClick={() => handleLinkClick(7)}
          >
            Pismo
          </button>
        </Link>
        <div className="line2"></div>
         <div>
         <div className="flexcont">
                <div className="bigflexcont">
                <h1>
                Rok vracanja 
                </h1>
                <p>
               {Lorem}
                </p>
                </div>
                <div className="miniflexcont">
                    <input placeholder="..." className="default-input"></input>
                    <label>Dana</label>
                </div>
            </div>
            <div className="flexcont">
                <div className="bigflexcont">
                <h1>
                Rok vracanja 
                </h1>
                <p>
                {Lorem}
                </p>
                </div>
                <div className="miniflexcont">
                    <input placeholder="..." className="default-input"></input>
                    <label>Dana</label>
                </div>
            </div>
            <div className="flexcont">
                <div className="bigflexcont">
                <h1>
                Rok vracanja 
                </h1>
                <p>
                {Lorem}
                </p>
                </div>
                <div className="miniflexcont">
                    <input placeholder="..." className="default-input"></input>
                    <label>Dana</label>
                </div>
            </div>
    
         </div>
        </div>
    )
}

export default Settings;

