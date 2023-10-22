import apiSlice from "../api/apiSlice";

const messageAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (conversationId) => `/messages?id=${conversationId}`,
        }),
    }),
});

export default messageAPI;
export const { useGetMessagesQuery } = messageAPI;
