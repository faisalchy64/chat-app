import { Avatar, Typography } from "@material-tailwind/react";
import Message from "./Message";
import Textbox from "./Textbox";

export default function Messages() {
    return (
        <div className="grow">
            <div className="flex items-center gap-2.5 text-gray-600 px-3.5 py-2.5 border-b-2">
                <Avatar
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                    alt="avatar"
                />
                <Typography variant="h6">Shams Karim</Typography>
            </div>
            <div className="min-h-[calc(100vh-219.2px)] flex flex-col-reverse gap-3.5 px-3.5 py-5 border-b-2">
                <Message />
            </div>
            <Textbox />
        </div>
    );
}
