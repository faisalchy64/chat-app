import { usePostConversationMutation } from "../features/conversation/conversationAPI";

export default function Textbox({ user, person }) {
    const [addMessage, { isLoading }] = usePostConversationMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.message.value) {
            addMessage({
                message: e.target.message.value,
                sender: user,
                receiver: person,
            });
        }

        e.target.reset();
    };

    return (
        <form
            className="flex items-center gap-1.5 text-gray-700 px-3.5 py-5"
            onSubmit={handleSubmit}
        >
            <textarea
                name="message"
                rows="1"
                placeholder="Write message..."
                className="w-full px-2.5 py-2 border border-gray-500 outline-none resize-none rounded-xl"
            ></textarea>
            <button type="submit" disabled={isLoading}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                </svg>
            </button>
        </form>
    );
}
