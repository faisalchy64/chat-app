import { Avatar, Typography } from "@material-tailwind/react";

export default function Conversation() {
    return (
        <li className="flex gap-2.5 text-gray-600 px-3.5 py-2.5 border-b-2">
            <Avatar
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                alt="avatar"
            />
            <div className="grow flex justify-between">
                <div>
                    <Typography variant="h6">Shams Karim</Typography>
                    <Typography variant="small">Hello Shams!</Typography>
                </div>
                <span className="text-xs">1 hour ago</span>
            </div>
        </li>
    );
}
