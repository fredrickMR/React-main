import { use, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { jsx } from 'react/jsx-runtime';

function Service()
{
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [bikes, setBikes] = useState([]);
    const [bike, setBike] = useState([]);
    const [id, setId] = useState(0);
    const [bikename, setBikename] = useState("");
    const [bikeownerId, setBikeOwner] = useState(0);

    if(!token)
    {
        return (<Navigate to="/" />)
    }

    function logout()
    {
        localStorage.removeItem("token");
        navigate("/");
    }

    const parsed = JSON.parse(atob(token.split(".")[1]));

    async function GetBikes() {
        const result = await fetch ('/api/bike/getall', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await result.json();

        console.log(data);

        setBikes(data);
    }

    async function GetBike(_id) {
        const result = await fetch(`/api/bike/get/${_id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await result.json();
        console.log(data);
        setBike(data);
    }

    async function CreateBike(){
        const res = await fetch('/api/bike/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({bikeownerId, bikename})
        });

        const data = await result.json();
        console.log(data);
    }

    return(
        <main>
            <div>
                <h1>Dashboard</h1>
                <p>You are logged in as {parsed.username}</p>
                <button onClick={logout}>Logout</button>
            </div>
            <div>
                <h1>GetALL</h1>
                <button onClick={GetBikes}>GetBikes</button>
            </div>
            <div>
                <h1>GetBike</h1>
                <input type="number" placeholder='Id' value={id} onChange={e => setId(e.target.value)}></input>
                <button onClick={() => GetBike(id)}>GetBikes</button>
            </div>
            <div>
                <input
                    type="number"
                    placeholder="bikeownerId"
                    value={bikeownerId}
                    onChange={(e) => setBikeOwner(e.target.value)}/>
                <input
                    type="text"
                    placeholder="bikename"
                    value={bikename}
                    onChange={(e) => setBikename(e.target.value)}/>
                <br />
                <button onClick={CreateBike}>CreateBike</button>
            </div>
        </main>
    )
}

export default Service;