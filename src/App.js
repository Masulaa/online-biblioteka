import './App.css';
import LogIn from './components/account-components/LogIn';
import SignUp from './components/account-components/SignUp';
import EvidentionOfBooks from './components/books-evidention/EvidentionOfBooks'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NewBook from './components/books-evidention/new-book/NewBook';
import EditBook from './components/books-evidention/edit-book/EditBook';
import Multimedia from './components/books-evidention/edit-book/Multimedia';
import Specification from './components/books-evidention/edit-book/Specification'

function App() {
  return (
    <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/EvidentionOfBooks' element={<EvidentionOfBooks/>}/>
        <Route path='/EvidentionOfBooks/NewBook/BookDetails' element={<NewBook/>}/>
        <Route path='EvidentionOfBooks/EditBook/BasicDetails' element={<EditBook/>}></Route>
        <Route path='EvidentionOfBooks/EditBook/Specification' element={<Specification/>}></Route>
        <Route path='EvidentionOfBooks/EditBook/Multimedia' element={<Multimedia/>}></Route>
      </Routes>
    </BrowserRouter></div>
  );
}

export default App;