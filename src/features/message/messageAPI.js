import socket from "socket.io-client";
import apiSlice from "../api/apiSlice";

const messageAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (conversationId) => `/messages?id=${conversationId}`,
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
                            draft.push(data.message);
                        });
                    });
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export default messageAPI;
export const { useGetMessagesQuery } = messageAPI;
