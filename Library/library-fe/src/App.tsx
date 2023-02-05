import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import SearchBooksPage from "./pages/SearchBooksPage";
import ReservedBooksPage from "./pages/ReservedBooksPage";
import AccountPage from "./pages/AccountPage";
import LogInPage from "./pages/LogInPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import LeasedBooksPage from "./pages/LeasedBooksPage";


function App() {

  return (
      <div className="App">

        <Router>
          {/*<AppBar />*/}
          <Routes>
            <Route path={"/search"} element={<SearchBooksPage/>} />
            <Route path={"/reserved"} element={<ReservedBooksPage/>} />
            <Route path={"/leased"} element={<LeasedBooksPage/>} />
            <Route path={"/myaccount"} element={<AccountPage/>} />
            <Route path={"/login"} element={<LogInPage/>} />
            <Route path={"/signin"} element={<SignInPage/>} />
            <Route path={"/"} element={<HomePage/>} />
          </Routes>
        </Router>

      </div>
  );
}

export default App;
