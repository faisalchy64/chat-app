import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";
import { Avatar, Typography } from "@material-tailwind/react";
import { useGetMessagesQuery } from "../features/message/messageAPI";
import useAuth from "../hooks/useAuth";
import { getPerson } from "../utilities/common";
import Message from "./Message";
import Textbox from "./Textbox";
import PersonLoader from "../uis/PersonLoader";
import MessageLoader from "../uis/MessageLoader";

export default function Messages() {
    const [partner, setPartner] = useState([]);
    const { id } = useParams();
    const { isLoading, data, error } = useGetMessagesQuery(id);
    const { email } = useAuth();
    const person = getPerson(email, partner);

    const avatar = useMemo(() => {
        return createAvatar(micah, {
            size: 48,
            seed: person && person.name,
        }).toDataUriSync();
    }, [person]);

    useEffect(() => {
        if (data && data.length > 0) {
            const { sender, receiver } = data[0];
            setPartner([{ ...sender }, { ...receiver }]);
        }
    }, [data]);

    return (
        <div className="grow">
            {person ? (
                <div className="flex items-center gap-2.5 text-gray-600 px-3.5 py-2.5 border-b-2">
                    <Avatar src={avatar} alt="avatar" />
                    <Typography variant="h6" className="capitalize">
                        {person?.name}
                    </Typography>
                </div>
            ) : (
                <PersonLoader />
            )}

            <div className="min-h-[calc(100vh-219.2px)] flex flex-col justify-end gap-3.5 px-3.5 py-5 border-b-2">
                {isLoading && <MessageLoader />}

                {data &&
                    data.map((message) => (
                        <Message key={message._id} message={message} />
                    ))}

                {data && data.length === 0 && (
                    <p className="w-fit text-xs text-gray-700 bg-gray-100 px-2.5 py-1.5 mx-auto rounded">
                        No message available
                    </p>
                )}

                {error && (
                    <p className="w-fit text-xs text-red-500 bg-red-100 px-2.5 py-1.5 mx-auto rounded">
                        There was an error.
                    </p>
                )}
            </div>
            <Textbox />
        </div>
    );
}
