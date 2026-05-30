import { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { jsx } from 'react/jsx-runtime';

function Dashboard()
{
    const token = localStorage.getItem("token");

    if(!token)
    {
        return (<Navigate to="/" />)
    }

    const parsed = JSON.parse(atob(token.split(".")[1]));

    return(
        <div>
            <h1>Dashboard</h1>
            <p>You are logged in as {parsed.username}</p>
        </div>
    )
}

export default Dashboard;