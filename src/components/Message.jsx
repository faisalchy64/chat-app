import moment from "moment";
import useAuth from "../hooks/useAuth";

export default function Message({ message }) {
    const { email } = useAuth();

    return (
        <div
            className={`flex ${
                message.sender.email === email ? "justify-end" : "justify-start"
            } relative`}
        >
            <span
                className={`text-sm ${
                    message.sender.email === email
                        ? "text-white bg-teal-500"
                        : "text-gray-700 bg-gray-200"
                } peer px-2.5 py-2 rounded-lg shadow-sm`}
            >
                {message.message}
            </span>
            <span className="text-xs text-gray-700 bg-gray-200 absolute -top-6 opacity-0 peer-hover:opacity-100 px-1.5 py-0.5 rounded-md shadow-md">
                {moment(message.updatedAt).format("dddd DD MMM YYYY LT")}
            </span>
        </div>
    );
}
