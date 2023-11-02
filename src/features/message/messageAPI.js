import socket from "socket.io-client";
import apiSlice from "../api/apiSlice";

const messageAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (conversationId) => `/messages?id=${conversationId}`,
            transformResponse(res, meta) {
                const total = meta.response.headers.get("Total");

                return { messages: res, total };
            },
            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
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
                            draft.messages.unshift(data.message);
                        });
                    });

                    await cacheEntryRemoved;
                    io.close();
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        getMoreMessages: builder.query({
            query: ({ conversationId, page }) =>
                `/messages?id=${conversationId}&page=${page}`,
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getMessages",
                                arg.conversationId,
                                (draft) => {
                                    return {
                                        ...draft,
                                        messages: [...draft.messages, ...data],
                                    };
                                }
                            )
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export default messageAPI;
export const { useGetMessagesQuery } = messageAPI;
