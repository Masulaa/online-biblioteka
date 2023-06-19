import { lazy, Suspense } from "react";

import "./App.css";
import LoadingSpinner from "./components/account-components/loading-spinner/LoadingSpinner"
import { Route, Routes, BrowserRouter } from "react-router-dom";

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
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={null}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/test"
          element={
            <Suspense fallback={null}>
              <LoadingSpinner />
            </Suspense>
          }
        />
        <Route
          path="/LogIn"
          element={
            <Suspense fallback={null}>
              <LogIn />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks"
          element={
            <Suspense fallback={null}>
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
            <Suspense fallback={null}>
              <EditBook />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks/BookDetails"
          element={
            <Suspense fallback={null}>
              <BookDetails />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks/BookDetails/Evidention"
          element={
            <Suspense fallback={null}>
              <BookEvid />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks/BookDetails/Specification"
          element={
            <Suspense fallback={null}>
              <BookSpec />
            </Suspense>
          }
        />
        <Route
          path="/EvidentionOfBooks/BookDetails/Multimedia"
          element={
            <Suspense fallback={null}>
              <BookMulti />
            </Suspense>
          }
        />
        <Route
          path="/StudentEvidention"
          element={
            <Suspense fallback={null}>
              <StudentEvidention />
            </Suspense>
          }
        />
        <Route
          path="/StudentEvidention/NewStudent"
          element={
            <Suspense fallback={null}>
              <NewStudent />
            </Suspense>
          }
        />
        <Route
          path="/LibrarianEvidention"
          element={
            <Suspense fallback={null}>
              <LibrarianEvidention />
            </Suspense>
          }
        />
        <Route
          path="/LibrarianEvidention/NewLibrarian"
          element={
            <Suspense fallback={null}>
              <NewLibrarian />
            </Suspense>
          }
        />
        <Route
          path="/AuthorEvidention"
          element={
            <Suspense fallback={null}>
              <AuthorEvidention />
            </Suspense>
          }
        />
        <Route
          path="/AuthorEvidention/NewAuthor"
          element={
            <Suspense fallback={null}>
              <NewAuthor />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
