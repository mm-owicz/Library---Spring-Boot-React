import React, {useState} from 'react'
import {userDTO} from "../data/userDTO";
import auth from "../data/Auth";
import { useNavigate } from 'react-router-dom';
import AppBar from "../components/AppBar";



const LogInPage = () => {
    const [newUsername, setNewUsername] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newUser: userDTO = {
            username: newUsername,
            pwd: newPwd
        }

        fetch("/user/login",
            {method: "POST", body: JSON.stringify(newUser), headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if(response.ok){
                    auth.userLogin(newUsername);
                    navigate('/search');
                } else if (response.status == 404){
                    setError("Niepoprawny login lub hasło!")
                } else {
                    setError("Wystąpił nieoczekiwany błąd.")
                }
            })
    }

    return(
        <>
            <AppBar />
            <h1>LogIn</h1>

            {error != "" ?
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                </div> : null
            }

            <div className="form-control form-control-sm">

                <form onSubmit={handleLogIn}>
                    <div className="form-outline mb-4">
                        <input type="text" name="user" required
                               className="form-control"
                               onChange={(e) => {
                                   setNewUsername(e.target.value)
                               }}/>
                        <label className="form-label" htmlFor="user">Username</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" name="pwd" required
                               className="form-control"
                               onChange={(e) => {
                                   setNewPwd(e.target.value)
                               }}/>
                        <label className="form-label" htmlFor="pwd">Password</label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>

                </form>
            </div>
        </>

    )
}

export default LogInPage