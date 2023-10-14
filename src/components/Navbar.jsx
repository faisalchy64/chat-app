import { Typography } from "@material-tailwind/react";
import logo from "../assets/chat.png";

export default function Navbar() {
    return (
        <nav className="bg-teal-500 py-3.5">
            <div className="w-4/5 flex justify-between items-center mx-auto">
                <div className="flex items-center gap-1.5">
                    <img src={logo} alt="logo" className="w-10 h-10" />
                    <Typography variant="h5" className="text-white">
                        Chat App
                    </Typography>
                </div>
                <button className="text-sm text-white">Signout</button>
            </div>
        </nav>
    );
}
