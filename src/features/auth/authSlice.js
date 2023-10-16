import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userSignin: (state, action) => {
            state.user = action.payload;
        },
        userSignout: (state) => {
            state.user = undefined;
        },
    },
});

export default authSlice.reducer;
export const { userSignin, userSignout } = authSlice.actions;
