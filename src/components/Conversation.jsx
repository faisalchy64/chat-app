import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-tailwind/react";
import moment from "moment";
import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";
import useAuth from "../hooks/useAuth";
import { getPerson } from "../utilities/common";

export default function Conversation({ conversation }) {
    const { email } = useAuth();
    const { _id, message, sender, receiver, updatedAt } = conversation;
    const person = getPerson(email, [sender, receiver]);

    const avatar = useMemo(() => {
        return createAvatar(micah, {
            size: 48,
            seed: person.name,
        }).toDataUriSync();
    }, [person.name]);

    return (
        <Link to={`/inbox/${_id}`}>
            <li className="flex gap-2.5 text-gray-600 px-3.5 py-2.5 border-b-2">
                <Avatar src={avatar} alt="avatar" className="bg-gray-200" />
                <div className="grow flex justify-between">
                    <div>
                        <Typography variant="h6" className="capitalize">
                            {person.name}
                        </Typography>
                        <Typography variant="small">
                            {}
                            {message.length > 20
                                ? `${message.slice(0, 20)}...`
                                : message}
                        </Typography>
                    </div>
                    <span className="text-xs">
                        {moment(updatedAt).fromNow()}
                    </span>
                </div>
            </li>
        </Link>
    );
}
