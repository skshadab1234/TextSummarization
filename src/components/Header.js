import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className="w-full relative">
            <div className="justify-between px-8 md:items-center md:flex">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to="/">
                                <h2 className="text-2xl text-white font-bold">TEXT SUMMARIZARTION</h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-white hover:text-blue-600">
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="text-white hover:text-blue-600">
                                <Link to="/ImageAnalysis">
                                    Image Sentiment
                                </Link>
                            </li>
                            <li className="text-white hover:text-blue-600">
                                <Link to="/Text">
                                    PDF Sentiment
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            <div className="absolute bg-cover w-full top-0 -z-[1] bg-[url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')] h-[600px] bg-no-repeat"></div>
        </nav>
    );
}