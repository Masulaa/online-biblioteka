import './EvidencijaKnjige.css';
import Table from './table';
import { useNavigate } from "react-router-dom";

import { GiHamburgerMenu} from 'react-icons/gi';
import { TbDashboard} from 'react-icons/tb';
import { AiOutlineProfile} from 'react-icons/ai';
import { MdPeopleAlt} from 'react-icons/md';
import { HiDocumentDuplicate} from 'react-icons/hi';
import { TbArrowsLeftRight} from 'react-icons/tb';
import { FiSettings} from 'react-icons/fi';
import { HiMagnifyingGlassCircle } from 'react-icons/hi2';
import { SlArrowDown} from 'react-icons/sl';
import { SlArrowLeft} from 'react-icons/sl';
import { SlArrowRight} from 'react-icons/sl';

function EvidencijaKnjige() {
  const navigate = useNavigate();
  return (
    <html>
      <head>
        <title>My Site</title>
      </head>
      <body>
        <header className='header'>
          <nav className="top-nav">
            <div className="logo">Biblioteka</div>
            <div className="profile">
              <button className="create-btn">Kreiraj</button>
              <div className="profile1">
                <div className="profile-tab"></div>
              </div>
            </div>
          </nav>
        </header>

        <div className="main-content">
          <aside>
            <nav className="side-nav">
              <ul className='lista'>
                <li><GiHamburgerMenu className="icon"/></li>
                <li><TbDashboard className="icon"/></li>
                <li><AiOutlineProfile className="icon"/></li>
                <li><MdPeopleAlt className="icon"/></li>
                <li><HiDocumentDuplicate className="icon"/></li>
                <li><AiOutlineProfile className="icon"/></li>
                <li><TbArrowsLeftRight className="icon"/></li>
              </ul>
              <span className='prav'></span>
              <div className='line'></div>
              <FiSettings className="settings"/>
            </nav>
          </aside>
          <main>
            <div className='ak47'>
              <div className='dva'>
                <h2 className='pokemon'>Knjige</h2>
                <div className='chugchug'></div>
                <button className="lovcen" onClick={()=>{navigate('/EvidencijaKnjige/NovaKnjiga')}}>Nova Knjiga</button>
              </div>
              <div className='jedan'>
                <HiMagnifyingGlassCircle className="RTX4080" />
                <input type="text" placeholder="Search..." className="RTX4090" />
              </div>
              <Table className="alooo"></Table>
            </div>
          </main>
        </div>
        <footer>
          <div className="f1">
            Rows per page:20<SlArrowDown />
          </div>
          <div className="f2">
            1 of 1
            <SlArrowLeft /><SlArrowRight />
          </div>
        </footer>
      </body>
    </html>
  );
}

export default EvidencijaKnjige;
