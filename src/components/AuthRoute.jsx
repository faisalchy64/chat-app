import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthRoute() {
    const auth = useAuth();

    if (auth) {
        return <Outlet />;
    }

    return <Navigate to="/" />;
}
