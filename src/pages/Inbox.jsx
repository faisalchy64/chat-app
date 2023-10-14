import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Inbox() {
    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-68px)]">
                <Sidebar />
            </main>
        </>
    );
}
