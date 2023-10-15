import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import { useState } from "react";

export default function Inbox() {
    const [show, setShow] = useState(false);

    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-68px)] flex">
                <Sidebar setShow={setShow} />
                <Outlet />
            </main>
            {show && <Modal setShow={setShow} />}
        </>
    );
}
