import './App.css';
import LogIn from './components/account-components/LogIn';
import SignUp from './components/account-components/SignUp';
import EvidentionOfBooks from './components/books-evidention/EvidentionOfBooks'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NewBook from './components/books-evidention/new-book/NewBook';
import BookDetails from './components/books-evidention/book-details/details';
import EditBook from './components/books-evidention/edit-book/EditBook';
import Specification from './components/books-evidention/edit-book/Specification'
import Multimedia from './components/books-evidention/edit-book/Multimedia'
import SpecificationBook from './components/books-evidention/new-book/SpecificationBook';
import MultimediaBook from './components/books-evidention/new-book/MultimediaBook';

function App() {
  return (
    <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/EvidentionOfBooks' element={<EvidentionOfBooks/>}/>
        <Route path='/EvidentionOfBooks/NewBook/BookDetails' element={<NewBook/>}/>
        <Route path='/EvidentionOfBooks/NewBook/Specification' element={<SpecificationBook/>}/>
        <Route path='/EvidentionOfBooks/NewBook/Multimedia' element={<MultimediaBook/>}/>
        <Route path='/EvidentionOfBooks/EditBook/BookDetails' element={<EditBook/>}/>
        <Route path='/EvidentionOfBooks/EditBook/Specification' element={<Specification/>}/>
        <Route path='/EvidentionOfBooks/EditBook/Multimedia' element={<Multimedia/>}/>
      </Routes>
    </BrowserRouter></div>
  );
}

export default App;