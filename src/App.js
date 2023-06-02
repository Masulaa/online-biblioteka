import './App.css';
import LogIn from './components/account-components/LogIn';
import SignUp from './components/account-components/SignUp';
import EvidentionOfBooks from './components/books-evidention/EvidentionOfBooks'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NewBook from './components/books-evidention/new-book/NewBook';
import BookDetails from './components/books-evidention/book-details/details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/EvidentionOfBooks' element={<EvidentionOfBooks/>}/>
        <Route path='/EvidentionOfBooks/NewBook' element={<NewBook/>}/>
        <Route path='/BD' element={<BookDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
