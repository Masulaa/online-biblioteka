import './App.css';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/LogIn' element={<LogIn/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
