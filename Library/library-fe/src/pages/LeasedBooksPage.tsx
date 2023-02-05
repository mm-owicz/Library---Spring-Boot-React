import React, {useEffect, useState} from 'react'
// import user from "../dto/user";
 import { bookDTO } from "../data/bookDTO";
import auth from "../data/Auth";
import {bookActionDTO} from "../data/bookActionDTO";
import AppBar from "../components/AppBar";
import {useNavigate} from "react-router-dom";

const LeasedBooksPage = () => {
    const [books, setBooks] = useState<bookDTO[]>([]);
    let username = auth.getUser() || "";
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    useEffect( () => {
        if(!auth.isAuthenticated()){
            navigate("/login");
        }
        fetchLeased();
    }, [])

    const fetchLeased = () => {
        fetch("/book/leases?user=" + auth.getUser(),
            {method: "GET", headers: {'Content-Type': 'application/json'}})
            .then(result => result.json())
            .then(books => setBooks(books));
    }

    const handleReturn = (bkId: number, ver: number) => {
        const bookAct: bookActionDTO = {
            bookId: bkId,
            username: username,
            version: ver
        }

        fetch("/book/markReturned",
            {method: "PUT", body: JSON.stringify(bookAct), headers: {'Content-Type': 'application/json'}})
            .then(
                response => {
                    if(response.ok){
                        setMessage("Książka oddana!");
                    }else if(response.status == 409){
                        setError("Książka już była oddana!");
                    }
                }
            )
    }


    return(
        <>
            <AppBar />
            <h1>Library - leased books</h1>

            {message != "" ?
                <div className="alert alert-success" role="alert">
                    {message}
                </div> : null
            }
            {error != "" ?
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                </div> : null
            }

            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Book Title</th>
                    <th scope="col">Book Author</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Date leased</th>
                    {auth.isLibrarian() ?
                        <>
                            <th scope="col">User</th>
                            <th scope="col">Mark returned</th>
                        </> : null
                    }
                </tr>
                </thead>

                <tbody>
                {books.map((item, index) =>
                    <tr>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.publisher}</td>
                        <td>{item.leased}</td>
                        {auth.isLibrarian() ?
                            <>
                                <td>{item.user}</td>
                                <td>
                                    <button className="primary"
                                            onClick={() => handleReturn(item.bookId, item.version)}>Mark returned</button>
                                </td>
                            </> : null
                        }
                    </tr>
                )}

                </tbody>
            </table>
        </>


    )
}

export default LeasedBooksPage