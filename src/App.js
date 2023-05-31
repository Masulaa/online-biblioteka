import './App.css';
import LogIn from './components/account-components/LogIn';
import SignUp from './components/account-components/SignUp';
import NovaKnjiga from './components/dodavanje-knjige/NovaKnjiga'
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/NovaKnjiga' element={<NovaKnjiga/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
