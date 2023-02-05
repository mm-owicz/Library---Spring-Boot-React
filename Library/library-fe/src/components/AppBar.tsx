import React, { useEffect } from 'react'
import auth from "../data/Auth";
import 'bootstrap/dist/js/bootstrap.bundle';


const AppBar = () => {
 
     return(
         <nav className="navbar navbar-expand-lg nav-fill w-100 bg-light">
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                     aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNav">
                 <ul className="navbar-nav">
                     <li className="nav-item active">
                         <a className="nav-link" href="/">Home </a>
                     </li>
                     {auth.isAuthenticated() ?
                         <>
                             <li className="nav-item">
                                 <a className="nav-link" href="/search">Search Books</a>
                             </li>
                             <li className="nav-item">
                                 <a className="nav-link" href="/leased">Leased</a>
                             </li>
                             <li className="nav-item">
                                 <a className="nav-link" href="/reserved">Reserved</a>
                             </li>
                             <li className="nav-item">
                                 <a className="nav-link" href="/myaccount">My account</a>
                             </li>
                         </>
                         :
                         <>
                             <li className="nav-item">
                                 <a className="nav-link" href="/signin">Sign in</a>
                             </li>
                             <li className="nav-item">
                                 <a className="nav-link" href="/login">Log in</a>
                             </li>
                         </>

                     }
                 </ul>
             </div>
         </nav>
     )
 }

export default AppBar