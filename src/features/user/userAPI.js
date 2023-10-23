import apiSlice from "../api/apiSlice";

const userAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (email) => `/user?email=${email}`,
        }),
    }),
});

export default userAPI;
export const { useGetUserQuery } = userAPI;
