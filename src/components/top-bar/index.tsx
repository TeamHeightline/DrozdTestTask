import React, {useState} from 'react';
import Logo from "@/src/components/logo";
import {useAuth} from "@/src/context/auth-context";
import Link from "next/link";

const pages = [
    {
        url: "/quiz",
        title: "Квизы",
    },
    {
        url: "/all-statistic",
        title: "Таблица лидеров"
    },
    {
        url: "/my-statistic",
        title: "Мои результаты",
    },
    {
        url: "/login",
        title: "Войти",
    },
    {
        url: "/logout",
        title: "Выйти",
    },
];

export default function TopBar() {
    const {isAuthenticated} = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const availablePages = pages.filter((item) =>
        item.url !== (isAuthenticated ? "/login" : "/logout"));

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-800 dark:border-b dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo/>
                <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d={`M4 6h16M4 12h16m-7 6h7${isOpen ? "M4 18h.01" : ""}`}></path>
                    </svg>
                </button>
                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700">
                        {availablePages.map((route) => (
                            <li key={route.url}>
                                <Link href={route.url}
                                      className="block py-2 px-3 rounded md:p-0 md:border-0 text-gray-900 dark:text-white dark:hover:text-primary-500">
                                    {route.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
