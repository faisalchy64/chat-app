import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import conversationAPI, {
    useGetConversationsQuery,
} from "../features/conversation/conversationAPI";
import useAuth from "../hooks/useAuth";
import Conversation from "./Conversation";
import ConversationLoader from "../uis/ConversationLoader";

export default function Sidebar({ toggle, setToggle, setShow }) {
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(false);
    const dispatch = useDispatch();
    const { _id } = useAuth();
    const { isLoading, data, error } = useGetConversationsQuery({ _id });
    const { conversations, total } = data || {};

    const getMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        if (total && parseInt(total) > 0) {
            setMore(Math.ceil(parseInt(total) / 10) > page);
        }

        if (page > 1) {
            dispatch(
                conversationAPI.endpoints.getMoreConversations.initiate({
                    _id,
                    page,
                })
            );
        }
    }, [total, page, _id, dispatch]);

    return (
        <aside
            className={`${
                toggle ? "w-full" : "w-0"
            } block md:hidden bg-white absolute top-0 bottom-0 transition-all duration-300 border-r-2 overflow-hidden z-[1000]`}
        >
            <ul className={toggle ? "block" : "hidden"}>
                <li className="flex justify-between items-center text-gray-600 px-3.5 py-2.5 border-b-2">
                    <span className="text-sm">Add Friend</span>
                    <button onClick={() => setShow(true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>
                    </button>
                </li>

                {isLoading && (
                    <>
                        <ConversationLoader />
                        <ConversationLoader />
                        <ConversationLoader />
                        <ConversationLoader />
                        <ConversationLoader />
                    </>
                )}

                {error && (
                    <li className="text-xs text-red-500 bg-red-50 px-2.5 py-1.5">
                        There was an error.
                    </li>
                )}

                {conversations && conversations.length > 0 && (
                    <InfiniteScroll
                        dataLength={conversations ? conversations.length : 0}
                        hasMore={more}
                        next={getMore}
                        height="calc(100vh - 113.6px)"
                    >
                        {conversations &&
                            conversations
                                .slice()
                                .sort(
                                    (a, b) =>
                                        new Date(b.updatedAt).getTime() -
                                        new Date(a.updatedAt).getTime()
                                )
                                .map((conversation) => (
                                    <Conversation
                                        key={conversation._id}
                                        conversation={conversation}
                                        setToggle={setToggle}
                                    />
                                ))}
                    </InfiniteScroll>
                )}

                {conversations && conversations.length === 0 && (
                    <li className="text-xs text-gray-700 bg-gray-100 px-2.5 py-1.5">
                        No conversation is available
                    </li>
                )}
            </ul>
        </aside>
    );
}
