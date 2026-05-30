import { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { jsx } from 'react/jsx-runtime';

function Service()
{
    const token = localStorage.getItem("token");
    const [bikes, setBikes] = useState([]);

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

    async function GetBikes(e) {
        const result = await fetch ('/api/bike/get', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await result.json();

        console.log(data);

        setBikes(data);
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <p>You are logged in as {parsed.username}</p>
            <button onClick={GetBikes}>GETBIKESGRRRR</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Service;