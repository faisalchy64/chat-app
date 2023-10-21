import apiSlice from "../api/apiSlice";

const conversationAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: ({ _id, page }) => `/conversations?id=${_id}&page=${page}`,
        }),
    }),
});

export default conversationAPI;
export const { useGetConversationsQuery } = conversationAPI;
