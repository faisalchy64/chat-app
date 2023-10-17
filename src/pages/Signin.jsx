import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSigninMutation } from "../features/auth/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import logo from "../assets/chat.png";

export default function Signin() {
    const [show, setShow] = useState(false);
    const [signin, { isSuccess, error }] = useSigninMutation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        signin(data);
        reset();
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/inbox");
        }
    }, [isSuccess, navigate]);

    return (
        <main className="w-4/5 min-h-screen flex flex-col justify-center items-center mx-auto">
            <div className="flex items-center gap-1.5 mb-5">
                <img src={logo} alt="logo" className="w-10 h-10" />
                <Typography variant="h3" className="text-gray-800">
                    Chat App
                </Typography>
            </div>

            {error && error.data && (
                <p className="w-full md:w-80 text-xs text-red-500 bg-red-100 px-2.5 py-1 mb-1.5 rounded-md">
                    {error.data.message}
                </p>
            )}

            {error && error.error && (
                <p className="w-full md:w-80 text-[10px] text-red-500 bg-red-100 px-2.5 py-1 mb-1.5 rounded-md">
                    There was an error
                </p>
            )}

            <Card color="white" className="w-full md:w-80 px-3.5 py-2.5 border">
                <Typography variant="h4">Signin</Typography>
                <form
                    className="flex flex-col gap-2.5 my-3.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="Email"
                        type="email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email.",
                            },
                        })}
                    />
                    {errors && errors.email && (
                        <p className="text-[10px] text-red-500 bg-red-100 px-1.5 py-0.5 rounded">
                            {errors.email.message}
                        </p>
                    )}

                    <div className="relative">
                        <Input
                            label="Password"
                            type={show ? "text" : "password"}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    message:
                                        "Minimum 8 characters neeeded (at least one letter, one digit and one special character).",
                                },
                            })}
                        />
                        {show ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
                                onClick={() => setShow(false)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
                                onClick={() => setShow(true)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        )}
                    </div>
                    {errors && errors.password && (
                        <p className="text-[10px] leading-4 text-red-500 bg-red-100 px-1.5 py-0.5 rounded">
                            {errors.password.message}
                        </p>
                    )}

                    <Link
                        to="/signup"
                        className="w-fit text-sm text-deep-purple-500"
                    >
                        Create an account?
                    </Link>
                    <Button color="deep-purple" type="submit">
                        Signin
                    </Button>
                </form>
            </Card>
        </main>
    );
}
