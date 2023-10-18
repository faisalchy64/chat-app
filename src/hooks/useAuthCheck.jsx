import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userSignin } from "../features/auth/authSlice";

export default function useAuthCheck() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));

        if (auth) {
            dispatch(userSignin(auth));
        }

        setLoading(false);
    }, [dispatch]);

    return loading;
}
