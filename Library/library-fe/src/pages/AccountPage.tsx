import React, {useEffect, useState} from 'react'
import auth from "../data/Auth";
import {useNavigate} from "react-router-dom";
import AppBar from "../components/AppBar";


const AccountPage = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect( () => {
        if(!auth.isAuthenticated()){
            navigate("/login");
        }
    })

    const handleLogout = () => {
        auth.userLogout();
        navigate("/");
    }

    const handleDeleteAccount = () => {
        fetch("/user/delete?username="+auth.getUser(),
            {method: "DELETE", headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if(response.ok){
                    handleLogout();
                } else if (response.status == 400){
                    setError("Nie można usunąć konta mając pożyczone książki!")
                } else {
                    setError("Wystąpił nieoczekiwany błąd.")
                }
            })
    }

    return(
        <>
            <AppBar />
            <h1>My Account</h1>

            {error != "" ?
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                </div> : null
            }

            <div className="container m-2">

                <div className="row">
                    <div className="col">Username</div>
                    <div className="col">{auth.getUser()}</div>
                    <div className="w-100"></div>
                    <div className="col">User type</div>
                    <div className="col">
                        {auth.isLibrarian() ? "librarian" : "user"}</div>
                </div>

                <div className="d-grid gap-2 d-md-flex mt-2">
                    {!auth.isLibrarian() ?
                        <>
                            <div className="col-md-6">
                                <button className="primary"
                                        onClick={handleDeleteAccount}>Delete my account</button>
                            </div>
                        </>
                        :
                        null}

                    <div className="col-md-6">
                        <button className="primary"
                                onClick={handleLogout}>Log Out</button>
                    </div>

                </div>
            </div>
        </>


    )
}

export default AccountPage