import { use, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { jsx } from 'react/jsx-runtime';
import "./service.css"

function Service()
{
    const token = localStorage.getItem("token");
    const roles = localStorage.getItem("roles");
    const navigate = useNavigate();
    const [kunder, setKunder] = useState([]);
    const [kunde, setKunde] = useState([]);

    const [id, setId] = useState(0);
    const [kundenNavn, setNavn] = useState("");

    const [result, setResult] = useState([]);

    if(!token && roles != "ServiceAdministratorer")
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


    

    async function GetKunder() {
        try{
            const result = await fetch ('/api/kunde/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await result.json();
            setResult(data);

            console.log(data);
            setKunder(data);

            setId(null);
            setNavn("");
        } catch (error)
        {
            console.error("Frontend GetBikes Failed", error)
        }
    }

    async function GetKunde(_id) {
        try{
            const result = await fetch(`/api/kunde/get/${_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await result.json();
            setResult(data);

            console.log(data);
            setKunde(data);

            setId(null);
            setNavn("");
        } catch(error)
        {
            console.error("Frontend Get bike failed", error);
        }
    }

    async function CreateKunde(){
        try{
            const result = await fetch('/api/kunde/post', {
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
            setNavn("");
        } catch(error)
        {
            console.error("Frontend Create Failed", error);
        }
    }

    async function DeleteKunde(_id)
    {
        try{
            const result = await fetch(`/api/kunde/delete/${_id}`, {
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
            setNavn("");
        } catch(error)
        {
            console.error("Frontend Delete Failed", error);
        }
    }

    async function PutKunde(_id)
    {
        try{
            const result = await fetch(`/api/kunde/put/${_id}`, {
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
            setNavn("");
        } catch (error)
        {
            console.error("Frontend Put Failed", error);
        }
    }

    return(
        <main>
            <div className='servicepage'>
                <div>
                    <h1>Dashboard</h1>
                    <p>You are logged in as {parsed.username}</p>
                    <button onClick={logout}>Logout</button>
                </div>
                <div className='inputs'>
                    <input type="number" placeholder='id' value={id} onChange={(e) => setId(e.target.value)}/>
                    <input type="text" placeholder='Bike name' value={bikename} onChange={(e) => setNavn(e.target.value)}/>
                </div>

                <div className='buttons'>
                    <button onClick={() => GetKunde(id)}>Get</button> 
                    <button onClick={GetBikes}>GetAll</button> 
                    <button onClick={CreateBike}>Post</button> 
                    <button onClick={() => PutKunde(id)}>Put</button> 
                    <button onClick={() => DeleteKunde(id)}>Delete</button> 
                </div>

                <div className='results'>
                    {Array.isArray(result) ? result.map(kunde => 
                        <div key={kunde.kunde_id} className='bike-card'>
                            <p>Id: {kunde.kunde_id}</p> 
                            <p>Name: {kunde.navn}</p>
                            <button onClick={() => DeleteKunde(kunde.kunde_id)}>Delete</button>
                        </div>
                    ) : result ? (
                        <div className='bike-card'>
                            <p>Id: {result.kunde_id}</p> 
                            <p>Name: {result.navn}</p>
                            <button onClick={() => DeleteKunde(kunde.kunde_id)}>Delete</button>
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    ) 
}

export default Service;