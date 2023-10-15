import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Inbox from "../pages/Inbox";
import Empty from "../components/Empty";
import Messages from "../components/Messages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Signin />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/inbox",
        element: <Inbox />,
        children: [
            {
                path: "",
                element: <Empty />,
            },
            {
                path: ":id",
                element: <Messages />,
            },
        ],
    },
]);

export default router;
