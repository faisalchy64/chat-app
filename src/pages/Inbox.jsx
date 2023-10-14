// import Empty from "../components/Empty";
import Messages from "../components/Messages";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Inbox() {
    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-68px)] flex">
                <Sidebar />
                {/* <Empty /> */}
                <Messages />
            </main>
        </>
    );
}
