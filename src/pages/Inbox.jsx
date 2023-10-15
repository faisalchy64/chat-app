import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import Responsive from "../components/Responsive";

export default function Inbox() {
    const [show, setShow] = useState(false);
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-68px)] flex relative">
                <Sidebar setShow={setShow} />
                <Responsive toggle={toggle} setShow={setShow} />
                <Outlet />

                <button
                    className="block md:hidden text-white bg-teal-500 absolute bottom-5 left-5 px-2.5 py-2.5 rounded-[100%] shadow-xl"
                    onClick={() => setToggle(!toggle)}
                >
                    {toggle ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                            />
                        </svg>
                    )}
                </button>
            </main>
            {show && <Modal setShow={setShow} />}
        </>
    );
}
