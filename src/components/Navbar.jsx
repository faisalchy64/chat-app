import { useDispatch } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { userSignout } from "../features/auth/authSlice";
import logo from "../assets/chat.png";

export default function Navbar({ toggle, setToggle }) {
    const dispatch = useDispatch();

    const signout = () => {
        dispatch(userSignout());
        localStorage.removeItem("auth");
    };

    return (
        <nav className="bg-teal-500 py-3.5">
            <div className="w-4/5 flex justify-between items-center mx-auto">
                <div className="hidden md:flex items-center gap-1.5">
                    <img src={logo} alt="logo" className="w-10 h-10" />
                    <Typography variant="h5" className="text-white">
                        Chat App
                    </Typography>
                </div>
                <button
                    className="flex md:hidden items-center gap-1.5 text-white"
                    onClick={() => setToggle(!toggle)}
                >
                    {toggle ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                            />
                        </svg>
                    )}
                </button>
                <button className="text-sm text-white" onClick={signout}>
                    Signout
                </button>
            </div>
        </nav>
    );
}
