import './EvidentionOfBooks.css';
import Table from './table';
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlassCircle } from 'react-icons/hi2';
import { SlArrowDown} from 'react-icons/sl';
import { SlArrowLeft} from 'react-icons/sl';
import { SlArrowRight} from 'react-icons/sl';
import NavBar from '../navbars/navbar';

function EvidencijaKnjige() {
  const navigate = useNavigate();
  return (
    <html>
      <head>
        <title>My Site</title>
      </head>
      <body>
        <NavBar/>
        <div className="main-content">
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
