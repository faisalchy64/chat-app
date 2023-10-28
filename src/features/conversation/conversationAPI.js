import socket from "socket.io-client";
import apiSlice from "../api/apiSlice";
import { getPerson } from "../../utilities/common";

const conversationAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: ({ _id, page }) => `/conversations?id=${_id}&page=${page}`,
            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, updateCachedData }
            ) {
                const io = socket("http://localhost:5000", {
                    reconnection: true,
                    reconnectionDelay: 1000,
                    reconnectionAttempts: 10,
                    transports: ["websocket"],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });

                try {
                    await cacheDataLoaded;

                    io.on("conversation", (data) => {
                        updateCachedData((draft) => {
                            const draftConversation = draft.find(
                                (conversation) =>
                                    conversation._id === data.conversation._id
                            );

                            if (draftConversation) {
                                draftConversation.message =
                                    data.conversation.message;
                                draftConversation.updatedAt =
                                    data.conversation.updatedAt;
                            } else {
                                draft.push(data.conversation);
                            }
                        });
                    });
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        postConversation: builder.mutation({
            query: (conversation) => ({
                url: "/conversations",
                method: "POST",
                body: conversation,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                // Optimistic update cache data
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getConversations",
                        { _id: arg.sender._id },
                        (draft) => {
                            const { email } = getState().auth.user;
                            const person = getPerson(email, [
                                arg.sender,
                                arg.receiver,
                            ]);

                            const draftConversation = draft.find(
                                (conversation) =>
                                    conversation.sender._id === person._id ||
                                    conversation.receiver._id === person._id
                            );

                            if (draftConversation) {
                                draftConversation.message = arg.message;
                                draftConversation.updatedAt =
                                    new Date().toISOString();
                            }
                        }
                    )
                );
                // Optimistic update cache data

                try {
                    const { data } = await queryFulfilled;

                    // Pessimistic update cache data
                    if (data) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getConversations",
                                { _id: data.sender._id },
                                (draft) => {
                                    const draftConversation = draft.find(
                                        (conversation) =>
                                            conversation._id === data._id
                                    );

                                    if (draftConversation) {
                                        draftConversation.message =
                                            data.message;
                                        draftConversation.updatedAt =
                                            data.updatedAt;
                                    } else {
                                        draft.push(data);
                                    }
                                }
                            )
                        );
                    }
                    // Pessimistic update cache data
                } catch (err) {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export default conversationAPI;
export const { useGetConversationsQuery, usePostConversationMutation } =
    conversationAPI;
