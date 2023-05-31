import './App.css';
import LogIn from './components/account-components/LogIn';
import SignUp from './components/account-components/SignUp';
import EvidencijaKnjige from './components/evidencija-knjige/EvidencijaKnjige'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NovaKnjiga from './components/evidencija-knjige/NovaKnjiga/NovaKnjiga';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/EvidencijaKnjige' element={<EvidencijaKnjige/>}/>
        <Route path='/EvidencijaKnjige/NovaKnjiga' element={<NovaKnjiga/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
