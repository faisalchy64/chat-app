import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userSignout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: async (headers, { getState }) => {
        const auth = getState().auth;

        if (auth && auth.user) {
            headers.set("Authorization", `Bearer ${auth.user.accessToken}`);
        }

        return headers;
    },
});

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        const res = await baseQuery(args, api, extraOptions);

        if (
            res &&
            res.error &&
            (res.error.status === 401 || res.error.status === 403)
        ) {
            api.dispatch(userSignout());
            localStorage.removeItem("auth");
        }

        return res;
    },
    tagTypes: [],
    endpoints: () => ({}),
});

export default apiSlice;
