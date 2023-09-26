import { lazy, Suspense } from "react";

import "./App.css";

import "./style/global.css";

import LoadingSpinner from "./components/account-components/loading-spinner/LoadingSpinner";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import ErrorHandlerPage from "./components/error/ErrorHandlerPage";

import AppLayout from "./components/navbars/navbar";
import Evidention from "./components/books-evidention/evidention/Evidention";

const LogIn = lazy(() => import("./components/account-components/LogIn"));
const SignUp = lazy(() => import("./components/account-components/SignUp"));

const CreateAccount = lazy(() =>
  import("./components/create-account/CreateAccount")
);

const EvidentionOfBooks = lazy(() =>
  import("./components/books-evidention/EvidentionOfBooks")
);

const Settings = lazy(() => import("./components/settings/Settings"));

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

const EditBook = lazy(() =>
  import("./components/books-evidention/edit-book/EditBook")
);

const BookDetails = lazy(() =>
  import("./components/books-evidention/book-details/BookDetails")
);
const UserProfile = lazy(() =>
  import("./components/account-components/UserProfile")
);
const EditUserProfile = lazy(() =>
  import("./components/account-components/EditUserProfile")
);
const IzdajBook = lazy(() =>
  import("./components/books-evidention/izdaj-book/IzdajBook")
);
const ReserveBook = lazy(() =>
  import("./components/books-evidention/reserve-book/ReserveBook")
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
const AuthorDetails = lazy(() =>
  import("./components/author/author-details/AuthorDetails")
);

const EditAuthor = lazy(() => import("./components/author/EditAuthor"));

const LibrarianDetails = lazy(() =>
  import("./components/librarian/librarian-details/LibrarianDetails")
);

const EditLibrarian = lazy(() =>
  import("./components/librarian/EditLibrarian")
);

const StudentDetails = lazy(() =>
  import("./components/student/student-details/StudentDetails")
);

const EditStudent = lazy(() => import("./components/student/EditStudent"));

const NewAuthor = lazy(() => import("./components/author/NewAuthor"));

const NewBook = lazy(() =>
  import("./components/books-evidention/new-book/NewBook")
);

function App() {
  return (
    <BrowserRouter>
      {/* <AppLayout> */}
      <Routes>
        <Route
          path="sign-up"
          element={
            <Suspense fallback={<ErrorHandlerPage />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="LogIn"
          element={
            <Suspense fallback={<ErrorHandlerPage />}>
              <LogIn />
            </Suspense>
          }
        />
        <Route path="/" element={<AppLayout />}>
        <Route
            path="/Dashboard"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <Dashboard/>
              </Suspense>
            }
          />
          <Route
            path="/CreateAccount"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <CreateAccount />
              </Suspense>
            }
          />
          <Route
            path="/UserProfile"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <UserProfile />
              </Suspense>
            }
          />
          <Route
            path="/EditUserProfile"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <EditUserProfile />
              </Suspense>
            }
          />
          <Route
            path="/test"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <LoadingSpinner />
              </Suspense>
            }
          />
          <Route
            path="/Settings"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="/EvidentionOfBooks"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <EvidentionOfBooks />
              </Suspense>
            }
          />
          <Route
            path="/GiveBook/:id"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <IzdajBook />
              </Suspense>
            }
          />
          <Route
            path="/ReserveBook/:id"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <ReserveBook />
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
            path="/EvidentionOfBooks/EditBook/:id"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <EditBook />
              </Suspense>
            }
          />
          <Route
            path="/EvidentionOfBooks/BookDetails/:id"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <BookDetails />
              </Suspense>
            }
          />
          <Route
            path="/StudentEvidention/StudentDetails/:id"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <StudentDetails />
              </Suspense>
            }
          />
          <Route
            path="/LibrarianEvidention/LibrarianDetails/:id"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <LibrarianDetails />
              </Suspense>
            }
          />
          <Route
            path="/LibrarianEvidention/EditLibrarian/:id"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <EditLibrarian />
              </Suspense>
            }
          />
          <Route
            path="/StudentEvidention"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <StudentEvidention />
              </Suspense>
            }
          />
          <Route
            path="/StudentEvidention/NewStudent"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <NewStudent />
              </Suspense>
            }
          />

          <Route
            path="/StudentEvidention/EditStudent/:id"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <EditStudent />
              </Suspense>
            }
          />
          <Route
            path="/LibrarianEvidention"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <LibrarianEvidention />
              </Suspense>
            }
          />
          <Route
            path="/LibrarianEvidention/NewLibrarian"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <NewLibrarian />
              </Suspense>
            }
          />
          <Route
            path="/AuthorEvidention"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <AuthorEvidention />
              </Suspense>
            }
          />
          <Route
            path="/AuthorEvidention/AuthorDetails/:id"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <AuthorDetails />
              </Suspense>
            }
          />
          <Route
            path="/AuthorEvidention/NewAuthor"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <NewAuthor />
              </Suspense>
            }
          />
          <Route
            path="/AuthorEvidention/EditAuthor/:id"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <EditAuthor />
              </Suspense>
            }
          />
          <Route
            path="/Evidention"
            element={
              <Suspense fallback={<ErrorHandlerPage />}>
                <Evidention />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      {/* </AppLayout> */}
    </BrowserRouter>
  );
}

export default App;
