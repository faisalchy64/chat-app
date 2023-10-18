import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        prepareHeaders: async (headers, { getState }) => {
            const auth = getState().auth;

            if (auth) {
                headers.set("Authorization", `Bearer ${auth.accessToken}`);
            }

            return headers;
        },
    }),
    tagTypes: [],
    endpoints: () => ({}),
});

export default apiSlice;
