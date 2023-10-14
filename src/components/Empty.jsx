import message from "../assets/chat.png";

export default function Empty() {
    return (
        <div className="grow flex flex-col justify-center items-center gap-1.5">
            <img src={message} alt="message" className="w-20 h-20" />
            <p className="text-sm text-gray-600">No message selected</p>
        </div>
    );
}
