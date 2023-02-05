import React, {useEffect, useState} from 'react'
import {bookDTO} from "../data/bookDTO";
import auth from "../data/Auth";
import {bookActionDTO} from "../data/bookActionDTO";
import AppBar from "../components/AppBar";
import {useNavigate} from "react-router-dom";


const ReservedBooksPage = () => {
    const [books, setBooks] = useState<bookDTO[]>([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    let username = auth.getUser() || "";
    const navigate = useNavigate();

    useEffect( () => {
        if(!auth.isAuthenticated()){
            navigate("/login");
        }
        fetchReserved();
    }, [])

    const fetchReserved = () => {
        fetch("/book/reservations?user=" + auth.getUser(),
            {method: "GET", headers: {'Content-Type': 'application/json'}})
            .then(result => result.json())
            .then(books => setBooks(books));
    }


    const handleLeased = (bkId: number, ver: number) => {
        const bookAct: bookActionDTO = {
            bookId: bkId,
            username: username,
            version: ver
        }

        fetch("/book/lease",
            {method: "PUT", body: JSON.stringify(bookAct), headers: {'Content-Type': 'application/json'}})
            .then(
                response => {
                    if(response.ok){
                        setMessage("Książka pożyczona!");
                    }else if(response.status == 409){
                        setError("Książka już pożyczona!");
                    }
                }
            )
    }

    const handleDel = (bkId: number, ver: number) => {
        const bookAct: bookActionDTO = {
            bookId: bkId,
            username: username,
            version: ver
        }

        fetch("/book/deleteRes",
            {method: "PUT", body: JSON.stringify(bookAct), headers: {'Content-Type': 'application/json'}})
            .then(
                response => {
                    if(response.ok){
                        setMessage("Rezerwacja usunięta!");
                    }else if(response.status == 409){
                        setError("Rezerwacja już była usunięta!");
                    }
                }
            )
    }

    return(
        <>
            <AppBar />
            <h1>Library - reserved books</h1>

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
                    <th scope="col">Reserved until</th>

                    {auth.isLibrarian() ?
                        <>
                        <th scope="col">User</th>
                        <th scope="col">Lease</th>
                        </>
                        :
                        <th scope="col">Cancel reservation</th>
                    }

                </tr>
                </thead>
                <tbody>

                {books.map((item, index) =>
                    <tr>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.publisher}</td>
                        <td>{item.reserved}</td>

                        {auth.isLibrarian() ?
                            <>
                            <td>{item.user}</td>
                            <td>
                                <button className="primary"
                                        onClick={() => handleLeased(item.bookId, item.version)}>Mark Leased</button>
                            </td>
                            </>
                            :
                            <td>
                                <button className="primary"
                                        onClick={() => handleDel(item.bookId, item.version)}>Delete Reservation</button>
                            </td>

                        }
                    </tr>)}

                </tbody>
            </table>

        </>
    )
}

export default ReservedBooksPage