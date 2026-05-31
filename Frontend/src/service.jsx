import { use, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { jsx } from 'react/jsx-runtime';

function Service()
{
    const token = localStorage.getItem("token");
    const roles = localStorage.getItem("roles");
    const navigate = useNavigate();
    const [bikes, setBikes] = useState([]);
    const [bike, setBike] = useState([]);

    const [id, setId] = useState(0);
    const [bikename, setBikename] = useState("");
    const [bikeownerId, setBikeOwner] = useState(0);

    const [result, setResult] = useState([]);

    if(!token && roles != "Service")
    {
        return (<Navigate to="/" />)
    }

    function logout()
    {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("roles"));
        navigate("/");
    }

    const parsed = JSON.parse(atob(token.split(".")[1]));


    

    async function GetBikes() {
        try{
            const result = await fetch ('/api/bike/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await result.json();
            setResult(data);

            console.log(data);
            setBikes(data);

            setId(null);
            setBikename("");
            setBikeOwner(null);
        } catch (error)
        {
            console.error("Frontend GetBikes Failed", error)
        }
    }

    async function GetBike(_id) {
        try{
            const result = await fetch(`/api/bike/get/${_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await result.json();
            setResult(data);

            console.log(data);
            setBike(data);

            setId(null);
            setBikename("");
            setBikeOwner(null);
        } catch(error)
        {
            console.error("Frontend Get bike failed", error);
        }
    }

    async function CreateBike(){
        try{
            const result = await fetch('/api/bike/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({bikename, bikeownerId})
            });

            const data = await result.json();
            setResult(data);

            console.log(data);

            setId(null);
            setBikename("");
            setBikeOwner(null);
        } catch(error)
        {
            console.error("Frontend Create Failed", error);
        }
    }

    async function DeleteBike(_id)
    {
        try{
            const result = await fetch(`/api/bike/delete/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await result.json();
            setResult(data);

            console.log(data);

            setId(null);
            setBikename("");
            setBikeOwner(null);
        } catch(error)
        {
            console.error("Frontend Delete Failed", error);
        }
    }

    async function PutBike(_id)
    {
        try{
            const result = await fetch(`/api/bike/put/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({bikename, bikeownerId})
            });

            const data = await result.json();
            setResult(data);

            console.log(data);
            setId(null);
            setBikename("");
            setBikeOwner(null);
        } catch (error)
        {
            console.error("Frontend Put Failed", error);
        }
    }

    return(
        <main>
            <div>
                <h1>Dashboard</h1>
                <p>You are logged in as {parsed.username}</p>
                <button onClick={logout}>Logout</button>
            </div>
            <div>
                <input type="number" placeholder='id' value={id} onChange={(e) => setId(e.target.value)}/>
                <input type="text" placeholder='Bike name' value={bikename} onChange={(e) => setBikename(e.target.value)}/>
                <input type="number" placeholder='Bike owner' value={bikeownerId} onChange={(e) => setBikeOwner(e.target.value)}/>
                <button onClick={() => GetBike(id)}>GetBike</button> 
                <button onClick={GetBikes}>GetBikes</button> 
                <button onClick={CreateBike}>AddBike</button> 
                <button onClick={() => PutBike(id)}>UpdateBike</button> 
                <button onClick={() => DeleteBike(id)}>DeleteBike</button> 
            </div>

            {result.length > 0 && result.map(bike => 
                 <div key={bike.id}>
                    <p>Id: {bike.id}</p>
                    <p>Name: {bike.model_sykkelnavn}</p>
                    <p>Owner: {bike.kunde_id}</p>
                </div>
            )}
        </main>
    )
}

export default Service;