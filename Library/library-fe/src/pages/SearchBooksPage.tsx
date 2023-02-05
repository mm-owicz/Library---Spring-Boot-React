import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {bookDTO} from "../data/bookDTO";
import auth from "../data/Auth";
import {bookActionDTO} from "../data/bookActionDTO";
import AppBar from "../components/AppBar";
import {useNavigate} from "react-router-dom";


const SearchBooksPage = () => {
    const [books, setBooks] = useState<bookDTO[]>([]);
    const [searchString, setSearchString] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    let username = auth.getUser() || "";
    const navigate = useNavigate();

    useEffect( () => {
        console.log(searchString)
        if(!auth.isAuthenticated()){
            navigate("/login");
        }
        fetchBooks();
    }, [])

    useEffect( () => {
        fetchBooks();
    }, [searchString])

    const fetchBooks = () => {
        fetch('/book/search?s='+searchString)
            .then(result => result.json())
            .then(books => setBooks(books));
    }

    const handleReserve = (bkId: number, ver: number) =>{
        const bookAct: bookActionDTO = {
            bookId: bkId,
            username: username,
            version: ver
        }
        fetch("/book/reserve",
            {method: "PUT", body: JSON.stringify(bookAct), headers: {'Content-Type': 'application/json'}})
            .then(
                response => {
                    if(response.ok){
                        setMessage("Książka zarezerwowana!");
                    }else if(response.status == 409){
                        setError("Książka niedostępna!");
                    }
                }
            )
    }

    return(
        <>

            <AppBar />
            <h1>Library - search books</h1>

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

            <div>

                <div className="input-group">
                    <input type="text" name="searchString" id="searchString" className="form-control" placeholder="Search"
                           aria-label="Search"
                           onInput={event => setSearchString(event.currentTarget.value)}/>
                </div>


                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Book Title</th>
                        <th scope="col">Book Author</th>
                        <th scope="col">Publisher</th>
                        <th scope="col">Publish date</th>
                        {!auth.isLibrarian() &&
                        <th scope="col">Reserve</th>
                        }
                    </tr>
                    </thead>

                    <tbody>

                    {books.map((item, index) =>
                        <tr>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.publisher}</td>
                            <td>{item.date}</td>
                            {!auth.isLibrarian() &&
                            <td>
                                <button className="primary"
                                        onClick={() => handleReserve(item.bookId, item.version)}>Reserve</button>
                            </td>
                            }
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default SearchBooksPage