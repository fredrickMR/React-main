import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedrole }) {
    const token = localStorage.getItem("token");
    const roles = JSON.parse(localStorage.getItem("roles"));

    if(!token)
    {
        return (<Navigate to="/" />)
    }

    if(roles.includes("Admin"))
    {
        return children;
    }

    if(!roles.includes(allowedrole))
    {
        return (<Navigate to="/" />)
    }

  return children
}

export default ProtectedRoute;