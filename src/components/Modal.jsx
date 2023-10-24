import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useGetUserQuery } from "../features/user/userAPI";
import { usePostConversationMutation } from "../features/conversation/conversationAPI";
import useAuth from "../hooks/useAuth";
import { verifyEmail } from "../utilities/common";

export default function Modal({ setShow }) {
    const [input, setInput] = useState("");
    const [inputRequest, setInputRequest] = useState(true);
    const { data, error } = useGetUserQuery(input, { skip: inputRequest });
    const [addConversation] = usePostConversationMutation();
    const user = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (conversation) => {
        if (data) {
            addConversation({
                message: conversation.message,
                sender: user,
                receiver: data,
            });
            reset();
            setShow(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (verifyEmail(input) && input !== user.email) {
                setInputRequest(false);
            }
        }, 2000);

        return () => {
            clearTimeout(timeout);
            setInputRequest(true);
        };
    }, [input, user]);

    return (
        <div className="flex justify-center items-center bg-gray-500 bg-clip-padding backdrop-blur bg-opacity-25 absolute inset-0 m-auto">
            <button className="text-white" onClick={() => setShow(false)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 absolute top-5 right-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <form
                className="w-4/5 md:w-2/5 flex flex-col gap-2.5 bg-gray-100 px-2.5 py-5 md:px-4 md:py-5 border rounded-xl shadow"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography
                    variant="lead"
                    className="text-center text-gray-600"
                >
                    Send Message
                </Typography>

                {error && error.data && (
                    <p className="w-fit text-[10px] text-red-500 bg-red-100 px-1.5 py-0.5 mx-auto rounded">
                        {error.data.message}
                    </p>
                )}

                {input === user.email && (
                    <p className="w-fit text-[10px] text-red-500 bg-red-100 px-1.5 py-0.5 mx-auto rounded">
                        You can not send message to yourself.
                    </p>
                )}

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
                    onChange={(e) => setInput(e.target.value)}
                />
                {errors && errors.email && (
                    <p className="text-[10px] text-red-500 bg-red-100 px-1.5 py-0.5 rounded">
                        {errors.email.message}
                    </p>
                )}

                <Textarea
                    label="Message"
                    {...register("message", {
                        required: {
                            value: true,
                            message: "Message is required",
                        },
                    })}
                />
                {errors && errors.message && (
                    <p className="text-[10px] text-red-500 bg-red-100 px-1.5 py-0.5 rounded">
                        {errors.message.message}
                    </p>
                )}

                <Button
                    color="deep-purple"
                    type="submit"
                    disabled={
                        Object.keys(errors).length > 0 || input === user.email
                    }
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}
