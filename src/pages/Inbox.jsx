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
            <Navbar toggle={toggle} setToggle={setToggle} />
            <main className="min-h-[calc(100vh-68px)] flex relative">
                <Sidebar setShow={setShow} />
                <Responsive
                    toggle={toggle}
                    setToggle={setToggle}
                    setShow={setShow}
                />
                <Outlet />
            </main>
            {show && <Modal setShow={setShow} />}
        </>
    );
}
