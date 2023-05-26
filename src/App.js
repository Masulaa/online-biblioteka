import './App.css';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/LogIn' element={<LogIn/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
