import apiSlice from "../api/apiSlice";

const conversationAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: ({ _id, page }) => `/conversations?id=${_id}&page=${page}`,
        }),
        postConversation: builder.mutation({
            query: (conversation) => ({
                url: "/conversations",
                method: "POST",
                body: conversation,
            }),
        }),
    }),
});

export default conversationAPI;
export const { useGetConversationsQuery, usePostConversationMutation } =
    conversationAPI;
