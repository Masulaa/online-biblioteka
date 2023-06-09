import { lazy, Suspense } from "react";

import "./App.css";

import  './style/global.css'

import LoadingSpinner from "./components/account-components/loading-spinner/LoadingSpinner"
import { Route, Routes, BrowserRouter } from "react-router-dom";

import ErrorHandlerPage from './components/error/ErrorHandlerPage'

import AppLayout from "./components/navbars/navbar";


const LogIn = lazy(() => import("./components/account-components/LogIn"))
const SignUp = lazy(() => import("./components/account-components/SignUp"))

const EvidentionOfBooks = lazy(() =>
  import("./components/books-evidention/EvidentionOfBooks")
);

const EditBook = lazy(() =>
  import("./components/books-evidention/edit-book/EditBook")
);

const BookDetails = lazy(() =>
  import("./components/books-evidention/book-details/BookDetails")
);
const BookEvid = lazy(() =>
  import("./components/books-evidention/book-details/BookEvid")
);
const BookMulti = lazy(() =>
  import("./components/books-evidention/book-details/BookMulti")
);
const BookSpec = lazy(() =>
  import("./components/books-evidention/book-details/BookSpec")
);

const StudentEvidention = lazy(() =>
  import("./components/student/StudentEvidention")
);
const NewStudent = lazy(() => import("./components/student/NewStudent"));
const LibrarianEvidention = lazy(() =>
  import("./components/librarian/LibrarianEvidention")
);
const NewLibrarian = lazy(() => import("./components/librarian/NewLibrarian"));
const AuthorEvidention = lazy(() =>
  import("./components/author/AuthorEvidention")
);
const NewAuthor = lazy(() => import("./components/author/NewAuthor"));

const NewBook = lazy(() =>
  import("./components/books-evidention/new-book/NewBook")
);

function App() {
  return (
    <BrowserRouter>

    <AppLayout>
      
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/LogIn"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <LogIn />
            </Suspense>
          }
        />
        <Route
          path="/test"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <LoadingSpinner />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <EvidentionOfBooks />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks/NewBook"
          element={
            <Suspense fallbac="null">
              <NewBook />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks/EditBook"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <EditBook />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks/BookDetails"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <BookDetails />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks/BookDetails/Evidention"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <BookEvid />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks/BookDetails/Specification"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <BookSpec />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks/BookDetails/Multimedia"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <BookMulti />
            </Suspense>
          }
        />
        <Route
          path="/StudentEvidention"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <StudentEvidention />
            </Suspense>
          }
        />
        <Route
          path="/StudentEvidention/NewStudent"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <NewStudent />
            </Suspense>
          }
        />
        <Route
          path="/LibrarianEvidention"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <LibrarianEvidention />
            </Suspense>
          }
        />
        <Route
          path="/LibrarianEvidention/NewLibrarian"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <NewLibrarian />
            </Suspense>
          }
        />
        <Route
          path="/AuthorEvidention"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <AuthorEvidention />
            </Suspense>
          }
        />
        <Route
          path="/AuthorEvidention/NewAuthor"
          element={
            <Suspense fallback={ErrorHandlerPage}>
              <NewAuthor />
            </Suspense>
          }
        />
      </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
