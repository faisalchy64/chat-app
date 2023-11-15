import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";
import { Avatar, Typography } from "@material-tailwind/react";
import messageAPI, {
    useGetMessagesQuery,
} from "../features/message/messageAPI";
import useAuth from "../hooks/useAuth";
import { getPerson } from "../utilities/common";
import Message from "./Message";
import Textbox from "./Textbox";
import PersonLoader from "../uis/PersonLoader";
import MessageLoader from "../uis/MessageLoader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Messages() {
    const [partner, setPartner] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isLoading, data, error } = useGetMessagesQuery(id);
    const { messages, total } = data || {};
    const user = useAuth();
    const person = getPerson(user.email, partner);

    const getMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const avatar = useMemo(() => {
        return createAvatar(micah, {
            size: 48,
            seed: person && person.name,
        }).toDataUriSync();
    }, [person]);

    useEffect(() => {
        if (messages && messages.length > 0) {
            const { sender, receiver } = messages[0];
            setPartner([{ ...sender }, { ...receiver }]);
        }

        if (total && parseInt(total) > 0) {
            setMore(Math.ceil(parseInt(total) / 10) > page);
        }

        if (page > 1) {
            dispatch(
                messageAPI.endpoints.getMoreMessages.initiate({
                    conversationId: id,
                    page,
                })
            );
        }
    }, [messages, total, page, id, dispatch]);

    return (
        <div className="grow">
            {person ? (
                <div className="flex items-center gap-2.5 text-gray-600 px-3.5 py-2.5 border-b-2">
                    <Avatar src={avatar} alt="avatar" className="bg-gray-200" />
                    <Typography variant="h6" className="capitalize">
                        {person.name}
                    </Typography>
                </div>
            ) : (
                <PersonLoader />
            )}

            <div className="h-[calc(100vh-221.2px)] flex flex-col justify-end md:px-3.5 py-5 border-b-2">
                {isLoading && <MessageLoader />}

                {messages && (
                    <InfiniteScroll
                        dataLength={messages ? messages.length : 0}
                        hasMore={more}
                        next={getMore}
                        height="calc(100vh - 259.2px)"
                        className="flex flex-col-reverse"
                    >
                        <div className="flex flex-col justify-end gap-3.5 px-3.5 py-2.5">
                            {messages &&
                                messages
                                    .slice()
                                    .sort(
                                        (a, b) =>
                                            new Date(a.updatedAt).getTime() -
                                            new Date(b.updatedAt).getTime()
                                    )
                                    .map((message) => (
                                        <Message
                                            key={message._id}
                                            message={message}
                                        />
                                    ))}
                        </div>
                    </InfiniteScroll>
                )}

                {messages && messages.length === 0 && (
                    <p className="w-fit text-xs text-gray-700 bg-gray-100 px-2.5 py-1.5 mx-auto rounded">
                        No message available
                    </p>
                )}

                {error && (
                    <p className="w-fit text-xs text-red-500 bg-red-100 px-2.5 py-1.5 mx-auto rounded">
                        Fetch message failed.
                    </p>
                )}
            </div>
            <Textbox user={user} person={person} />
        </div>
    );
}
