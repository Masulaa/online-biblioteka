import './EvidentionOfBooks.css';
import Table from './table';
import { useNavigate } from "react-router-dom";
import NavBar from '../navbars/navbar';

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
      <NavBar></NavBar>

     <div className='naslov'> Knjige</div>

     <div className='new-book'>
     <button className='nova-knjiga' onClick={()=>{navigate('/EvidentionOfBooks/NewBook')}}>Nova Knjiga</button>
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
