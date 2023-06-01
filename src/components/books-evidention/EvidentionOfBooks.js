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
              <div className='line'>

              <FiSettings className="settings"/>
              </div>
            </nav>
          </aside>
          <main>
            <div className='abc'>
              <div className='dva'>
                <h2 className='bca'>Knjige</h2>
                <div className='regul'></div>
                <button className="dugme1" onClick={()=>{navigate('/EvidentionOfBooks/NewBook')}}>Nova Knjiga</button>
              </div>
              <div className='jedan'>
                <HiMagnifyingGlassCircle className="ikonica-search" />
                <input type="text" placeholder="Search..." className="search" />
              </div>
              <Table></Table>
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
