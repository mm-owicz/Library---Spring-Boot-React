import React, {Component} from 'react';

class Auth {

    userLogin = (username: string) => {
        localStorage.setItem('username', username);
    }

    userLogout = () => {
        localStorage.setItem('username', "");
    }

    isAuthenticated = () => {
        return localStorage.getItem('username') != "" &&
            localStorage.getItem('username') != null;
    }

    isLibrarian = () => {
        return localStorage.getItem('username') == "librarian";
    }

    getUser = () => {
        return localStorage.getItem('username');
    }

}

const auth = new Auth()
export default auth;