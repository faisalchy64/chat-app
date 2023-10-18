import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute() {
    const auth = useAuth();

    if (auth) {
        return <Navigate to="/inbox" />;
    }

    return <Outlet />;
}
