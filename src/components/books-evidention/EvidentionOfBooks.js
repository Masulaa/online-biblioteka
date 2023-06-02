import './EvidentionOfBooks.css';
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
              <div className='linez'>

              <FiSettings className="settings"/>
              </div>
            </nav>
          </aside>
         
        </div>
     <div className='naslov'> Knjige</div>

     <div className='new-book'>
     <button className='nova-knjiga'>Nova Knjiga</button>
     <span className='search-span'>
    <HiMagnifyingGlassCircle className='search-bar-icon'/>
     <input type='text' placeholder='  search...' className='search'></input>
     </span>
     </div>


      <Table></Table>

      </body>
    </html>
  );
}

export default EvidencijaKnjige;
