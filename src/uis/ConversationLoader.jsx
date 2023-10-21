export default function ConversationLoader() {
    return (
        <li className="flex items-center gap-2.5 text-gray-600 px-3.5 py-2.5 border-b-2">
            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="grow flex justify-between">
                <div className="flex flex-col gap-1.5">
                    <h5 className="w-28 md:w-32 h-5 bg-gray-300 animate-pulse rounded"></h5>
                    <h6 className="w-32 md:w-40 h-4 bg-gray-300 animate-pulse rounded"></h6>
                </div>
                <span className="w-14 md:w-16 h-3 bg-gray-200 animate-pulse rounded"></span>
            </div>
        </li>
    );
}
