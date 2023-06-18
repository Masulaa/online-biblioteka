import './App.css';
import LogIn from './components/account-components/LogIn';
import SignUp from './components/account-components/SignUp';

import { Route, Routes, BrowserRouter } from "react-router-dom";

import EvidentionOfBooks from './components/books-evidention/EvidentionOfBooks'

import NewBook from './components/books-evidention/new-book/NewBook';

import EditBook from './components/books-evidention/edit-book/EditBook';

import BookDetails from './components/books-evidention/book-details/BookDetails';
import BookEvid from './components/books-evidention/book-details/BookEvid';
import BookMulti from './components/books-evidention/book-details/BookMulti';
import BookSpec from './components/books-evidention/book-details/BookSpec';

import StudentEvidention from './components/student/StudentEvidention'
import NewStudent from './components/student/NewStudent';
import LibrarianEvidention from './components/librarian/LibrarianEvidention';
import NewLibrarian from './components/librarian/NewLibrarian';
import AuthorEvidention from './components/author/AuthorEvidention';
import NewAuthor from './components/author/NewAuthor';
import LoadingSpinner from './components/account-components/loading-spinner/LoadingSpinner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/test' element={<LoadingSpinner/>}/>
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/EvidentionOfBooks' element={<EvidentionOfBooks/>}/>
        <Route path='/EvidentionOfBooks/NewBook' element={<NewBook/>}/>
        <Route path='/EvidentionOfBooks/EditBook' element={<EditBook/>}/>
        <Route path='/EvidentionOfBooks/BookDetails' element={<BookDetails/>}/>
        <Route path='/EvidentionOfBooks/BookDetails/Evidention' element={<BookEvid/>}/>
        <Route path='/EvidentionOfBooks/BookDetails/Specification' element={<BookSpec/>}/>
        <Route path='/EvidentionOfBooks/BookDetails/Multimedia' element={<BookMulti/>}/>
        <Route path='/StudentEvidention' element={<StudentEvidention/>}/>
        <Route path='/StudentEvidention/NewStudent' element={<NewStudent/>}/> 
        <Route path='/LibrarianEvidention' element={<LibrarianEvidention/>}/>
        <Route path='/LibrarianEvidention/NewLibrarian' element={<NewLibrarian/>}/> 
        <Route path='/AuthorEvidention' element={<AuthorEvidention/>}/>
        <Route path='/AuthorEvidention/NewAuthor' element={<NewAuthor/>}/> 


      </Routes>
    </BrowserRouter>
  );
}

export default App;