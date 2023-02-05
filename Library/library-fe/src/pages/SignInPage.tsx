import React, {useState} from 'react'
import {userDTO} from "../data/userDTO";
import {redirect} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AppBar from "../components/AppBar";


const SignInPage = () => {
    const [newUsername, setNewUsername] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newUser: userDTO = {
            username: newUsername,
            pwd: newPwd
        }

        fetch("/user/registration",
            {method: "POST", body: JSON.stringify(newUser), headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if(response.ok){
                    navigate('/login');
                } else if (response.status == 400){
                    setError("Użytkownik o tym loginie już istnieje. Wybierz inny login.")
                } else {
                    setError("Wystąpił nieoczekiwany błąd.")
                }
            })
    }

    return(
        <>
            <AppBar />
            <h1>SignIn</h1>

            {error != "" ?
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                </div> : null
            }

            <div className="form-control form-control-sm">
                <form onSubmit={handleSignIn}>

                    <div className="form-outline mb-4">
                        <input type="text" id="user" required name="user"
                               className="form-control"
                               onChange={(e) => {
                                   setNewUsername(e.target.value)
                               }}/>
                        <label className="form-label" htmlFor="user">Username</label>
                    </div>


                    <div className="form-outline mb-4">
                        <input type="password" id="pwd" required name="pwd"
                               className="form-control"
                               onChange={(e) => {
                                   setNewPwd(e.target.value)
                               }}/>
                        <label className="form-label" htmlFor="pwd">Password</label>
                    </div>

                    <button
                        type = "submit"
                        className = "btn btn-primary btn-block mb-4" >
                        Sign In
                    </button>
                </form>
            </div>
        </>)
}

export default SignInPage