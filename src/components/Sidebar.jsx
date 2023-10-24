import { useGetConversationsQuery } from "../features/conversation/conversationAPI";
import useAuth from "../hooks/useAuth";
import Conversation from "./Conversation";
import ConversationLoader from "../uis/ConversationLoader";

export default function Sidebar({ setShow }) {
    const { _id } = useAuth();
    const { isLoading, data, error } = useGetConversationsQuery({ _id });

    return (
        <aside className="w-full md:w-80 min-h-[calc(100vh-68px)] hidden md:block bg-white border-r-2">
            <ul>
                <li className="flex justify-between items-center text-gray-600 px-3.5 py-2.5 border-b-2">
                    <span className="text-sm">Add Friend</span>
                    <button
                        title="Create new conversation"
                        onClick={() => setShow(true)}
                    >
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
                        Fetch conversation failed.
                    </li>
                )}

                {data &&
                    data.map((conversation) => (
                        <Conversation
                            key={conversation._id}
                            conversation={conversation}
                        />
                    ))}

                {data && data.length === 0 && (
                    <li className="text-xs text-gray-700 bg-gray-100 px-2.5 py-1.5">
                        No conversation is available
                    </li>
                )}
            </ul>
        </aside>
    );
}
