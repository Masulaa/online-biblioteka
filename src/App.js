import './App.css';
import LogIn from './components/account-components/LogIn';
import SignUp from './components/account-components/SignUp';

import { Route, Routes, BrowserRouter } from "react-router-dom";

import EvidentionOfBooks from './components/books-evidention/EvidentionOfBooks'

import NewBook from './components/books-evidention/new-book/NewBook';
import Multimedia from './components/books-evidention/new-book/MultimediaBook';
import Specification from './components/books-evidention/new-book/SpecificationBook';

import EditBook from './components/books-evidention/edit-book/EditBook';
import EditSpecification from './components/books-evidention/edit-book/Specification'
import EditMultimedia from './components/books-evidention/edit-book/Multimedia'

import BookDetails from './components/books-evidention/book-details/BookDetails';
import BookEvid from './components/books-evidention/book-details/BookEvid';
import BookMulti from './components/books-evidention/book-details/BookMulti';
import BookSpec from './components/books-evidention/book-details/BookSpec';
function App() {
  return (
    <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/EvidentionOfBooks' element={<EvidentionOfBooks/>}/>
        <Route path='/EvidentionOfBooks/NewBook/BookDetails' element={<NewBook/>}/>
        <Route path='/EvidentionOfBooks/NewBook/Multimedia' element={<Multimedia/>}/>
        <Route path='/EvidentionOfBooks/NewBook/Specification' element={<Specification/>}/>
        <Route path='/EvidentionOfBooks/EditBook/BookDetails' element={<EditBook/>}/>
        <Route path='/EvidentionOfBooks/EditBook/Specification' element={<EditSpecification/>}/>
        <Route path='/EvidentionOfBooks/EditBook/Multimedia' element={<EditMultimedia/>}/>
        <Route path='/EvidentionOfBooks/BookDetails' element={<BookDetails/>}/>
        <Route path='/EvidentionOfBooks/BookDetails/Evidention' element={<BookEvid/>}/>
        <Route path='/EvidentionOfBooks/BookDetails/Specification' element={<BookSpec/>}/>
        <Route path='/EvidentionOfBooks/BookDetails/Multimedia' element={<BookMulti/>}/>

      </Routes>
    </BrowserRouter></div>
  );
}

export default App;
