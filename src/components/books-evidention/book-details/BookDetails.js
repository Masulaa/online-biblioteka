import "./BookDetails.css";
import { Link } from 'react-router-dom';

import { HiOutlineArrowUturnUp} from 'react-icons/hi2';
import { FaRegHandScissors} from 'react-icons/fa';
import { HiOutlineArrowPath} from 'react-icons/hi2';
import { BsThreeDotsVertical} from "react-icons/bs";
import NavBar from "../../navbars/navbar";


function BookDetails() {
  return (
      <body>
      <NavBar/>

          <main>
            <div className='abc'>
              <div className='dva'>
                <div className="all">
                 <h2 className='bca'>Nesto </h2>
                  <div className="links">
                   <Link className="evidention" to="/EvidentionOfBooks" >Evidencija Knjiga</Link>&nbsp; / &nbsp; <Link className="book" to="/#~~">KNJIGA-404</Link>
                  </div>
              <div className="links2">
               <Link to="#"className="links2"><HiOutlineArrowUturnUp/>Otpisi Knjigu</Link>&nbsp;
               <Link to="#"className="links2"><FaRegHandScissors/>Izdaj Knjigu</Link>&nbsp;
               <Link to="#"className="links2"><HiOutlineArrowPath/>Vrati Knjigu</Link>&nbsp;
            <BsThreeDotsVertical/>
              </div>  
             </div>    
            
            </div>
            </div>
        </main>
      </body>

  );
}

export default BookDetails;