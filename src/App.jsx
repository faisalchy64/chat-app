import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import useAuthCheck from "./hooks/useAuthCheck";

export default function App() {
    const loading = useAuthCheck();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white">
                <span className="text-gray-500">Loading...</span>
            </div>
        );
    }

    return <RouterProvider router={router} />;
}
