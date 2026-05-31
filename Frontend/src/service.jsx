import { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { jsx } from 'react/jsx-runtime';

function Service()
{
    const token = localStorage.getItem("token");
    const [bikes, setBikes] = useState([]);
    const [bike, setBike] = useState([]);

    if(!token)
    {
        return (<Navigate to="/" />)
    }

    function logout()
    {
        localStorage.removeItem("token");
        Navigate("/");
    }

    const parsed = JSON.parse(atob(token.split(".")[1]));

    async function GetBikes() {
        const result = await fetch ('/api/bikes/getall', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await result.json();

        console.log(data);

        setBikes(data);
    }

    async function GetBike() {
        const bikeid = 0;
        const result = await fetch(`/api/bike/get/${bikeid}`, {
            headers: {
                method: 'GET',
                Authorization: `Bearer ${token}`
            }
        });

        const data = await result.json();
        console.log(data);
        setBike(data);
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <p>You are logged in as {parsed.username}</p>
            <button onClick={GetBikes}>GetBikes</button>
            <button onClick={GetBike}>GetBike</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Service;