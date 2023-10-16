import apiSlice from "../api/apiSlice";
import { userSignin } from "./authSlice";

const authAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (data) => ({
                url: "/signin",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data) {
                        localStorage.setItem("auth", JSON.stringify(data));
                        dispatch(userSignin(data));
                    }
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: "/signup",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data) {
                        localStorage.setItem("auth", JSON.stringify(data));
                        dispatch(userSignin(data));
                    }
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export const { useSigninMutation, useSignupMutation } = authAPI;
