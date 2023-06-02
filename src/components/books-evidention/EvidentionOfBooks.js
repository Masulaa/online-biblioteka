import './EvidentionOfBooks.css';
import Table from './table';
import { useNavigate } from "react-router-dom";
import NavBar from '../navbars/navbar';

import { HiMagnifyingGlassCircle } from 'react-icons/hi2';


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
     <button className='nova-knjiga' onClick={()=>{navigate('/EvidentionOfBooks/NewBook/BookDetails')}}>Nova Knjiga</button>
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
