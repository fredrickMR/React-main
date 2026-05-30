import { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { jsx } from 'react/jsx-runtime';

function Service()
{
    const token = localStorage.getItem("token");

    if(!token)
    {
        return (<Navigate to="/" />)
    }

    function logout()
    {
        localStorage.removeItem("token");
        return (<Navigate to="/" />)
    }

    const parsed = JSON.parse(atob(token.split(".")[1]));

    return(
        <div>
            <h1>Dashboard</h1>
            <p>You are logged in as {parsed.username}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Service;