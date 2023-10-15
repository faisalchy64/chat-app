import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

export default function Modal({ setShow }) {
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

            <form className="w-4/5 md:w-1/2 flex flex-col gap-3.5 bg-gray-100 px-2.5 py-5 md:px-4 md:py-5 border rounded-xl shadow">
                <Typography
                    variant="lead"
                    className="text-center text-gray-600"
                >
                    Send Message
                </Typography>
                <Input label="Email" type="email" />
                <Textarea label="Message" />
                <Button color="deep-purple">Submit</Button>
            </form>
        </div>
    );
}
