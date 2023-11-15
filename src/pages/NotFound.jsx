import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col justify-center items-center gap-3.5 bg-white">
            <h3 className="text-2xl font-semibold text-gray-700">
                404, Page Not Found!
            </h3>
            <Link to="/" className="text-blue-500 animate-pulse">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </Link>
        </main>
    );
}
