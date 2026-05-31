import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedrole }) {
    const token = localStorage.getItem("token");
    const roles = localStorage.getItem("roles");

    if(!token)
    {
        return (<Navigate to="/" />)
    }

    if(roles == "Admin")
    {
        return children;
    }

    if(roles != allowedrole)
    {
        return (<Navigate to="/" />)
    }

  return children
}

export default ProtectedRoute;